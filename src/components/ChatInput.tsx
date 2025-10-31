import { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PaperPlaneRight, Paperclip, X } from '@phosphor-icons/react';
import { Attachment } from '@/lib/types';
import { toast } from 'sonner';

interface ChatInputProps {
  onSend: (message: string, attachments?: Attachment[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled = false, placeholder = 'Type your message...' }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const textFiles = Array.from(files).filter(file => 
      file.type.startsWith('text/') || 
      file.name.endsWith('.txt') ||
      file.name.endsWith('.md') ||
      file.name.endsWith('.json') ||
      file.name.endsWith('.csv') ||
      file.name.endsWith('.xml') ||
      file.name.endsWith('.html') ||
      file.name.endsWith('.css') ||
      file.name.endsWith('.js') ||
      file.name.endsWith('.ts') ||
      file.name.endsWith('.tsx') ||
      file.name.endsWith('.jsx')
    );

    if (textFiles.length === 0) {
      toast.error('Only text files are supported');
      return;
    }

    const maxSize = 1024 * 1024;
    const oversizedFiles = textFiles.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      toast.error('Files must be smaller than 1MB');
      return;
    }

    try {
      const newAttachments = await Promise.all(
        textFiles.map(async (file) => {
          const content = await file.text();
          return {
            name: file.name,
            content,
            type: file.type || 'text/plain',
            size: file.size,
          };
        })
      );

      setAttachments((prev) => [...prev, ...newAttachments]);
      toast.success(`${newAttachments.length} file(s) attached`);
    } catch (error) {
      toast.error('Failed to read file(s)');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if ((trimmedInput || attachments.length > 0) && !disabled) {
      onSend(trimmedInput, attachments.length > 0 ? attachments : undefined);
      setInput('');
      setAttachments([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const trimmedInput = input.trim();
      if ((trimmedInput || attachments.length > 0) && !disabled) {
        onSend(trimmedInput, attachments.length > 0 ? attachments : undefined);
        setInput('');
        setAttachments([]);
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="border-t border-border bg-background">
      {attachments.length > 0 && (
        <div className="px-4 pt-3 pb-2 flex flex-wrap gap-2">
          {attachments.map((attachment, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md text-sm"
            >
              <Paperclip className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{attachment.name}</span>
              <span className="text-muted-foreground text-xs">
                ({(attachment.size / 1024).toFixed(1)}KB)
              </span>
              <button
                onClick={() => removeAttachment(index)}
                className="ml-1 text-muted-foreground hover:text-foreground"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2 p-4">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          multiple
          accept=".txt,.md,.json,.csv,.xml,.html,.css,.js,.ts,.tsx,.jsx,text/*"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="self-end"
        >
          <Paperclip className="w-5 h-5" />
        </Button>
        <Textarea
          ref={textareaRef}
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 text-[15px] resize-none min-h-[44px] max-h-[200px]"
          autoComplete="off"
          rows={1}
        />
        <Button
          type="submit"
          disabled={disabled || (!input.trim() && attachments.length === 0)}
          className="bg-accent text-accent-foreground hover:bg-accent/90 self-end"
        >
          <PaperPlaneRight className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
}
