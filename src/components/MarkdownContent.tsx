import { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import { toast } from 'sonner';

interface MarkdownContentProps {
  content: string;
  isStreaming?: boolean;
}

export function MarkdownContent({ content, isStreaming }: MarkdownContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const renderMarkdown = async () => {
      const html = await marked.parse(content, {
        breaks: true,
        gfm: true,
      });
      
      if (contentRef.current) {
        contentRef.current.innerHTML = html;
        
        const codeBlocks = contentRef.current.querySelectorAll('pre');
        codeBlocks.forEach((pre, index) => {
          pre.style.position = 'relative';
          
          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn absolute top-2 right-2 px-3 py-1.5 rounded-md bg-muted hover:bg-muted-foreground/20 text-muted-foreground text-xs font-medium flex items-center gap-1.5 transition-colors';
          copyBtn.dataset.index = index.toString();
          copyBtn.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 256 256"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path></svg><span>Copy</span>';
          
          pre.appendChild(copyBtn);
        });
      }
    };

    renderMarkdown();

    const handleCopy = async (e: Event) => {
      const target = e.target as HTMLElement;
      const btn = target.closest('.copy-btn') as HTMLButtonElement;
      
      if (btn && contentRef.current) {
        const index = parseInt(btn.dataset.index || '0');
        const code = contentRef.current.querySelectorAll('pre code')[index];
        
        if (code) {
          try {
            await navigator.clipboard.writeText(code.textContent || '');
            setCopiedIndex(index);
            toast.success('Code copied to clipboard');
            setTimeout(() => setCopiedIndex(null), 2000);
          } catch (err) {
            toast.error('Failed to copy code');
          }
        }
      }
    };

    contentRef.current.addEventListener('click', handleCopy);

    return () => {
      contentRef.current?.removeEventListener('click', handleCopy);
    };
  }, [content]);

  useEffect(() => {
    if (!contentRef.current) return;

    const copyButtons = contentRef.current.querySelectorAll('.copy-btn');
    copyButtons.forEach((btn, index) => {
      const isCopied = copiedIndex === index;
      btn.innerHTML = isCopied
        ? '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg><span>Copied</span>'
        : '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 256 256"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path></svg><span>Copy</span>';
    });
  }, [copiedIndex]);

  return (
    <div className="markdown-content text-[15px] leading-relaxed">
      <div ref={contentRef} className="prose prose-sm max-w-none" />
      {isStreaming && (
        <span className="inline-block w-2 h-4 ml-1 bg-accent animate-pulse" />
      )}
    </div>
  );
}
