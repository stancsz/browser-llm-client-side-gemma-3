import { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PaperPlaneRight } from '@phosphor-icons/react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled = false, placeholder = 'Type your message...' }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput && !disabled) {
      onSend(trimmedInput);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const trimmedInput = input.trim();
      if (trimmedInput && !disabled) {
        onSend(trimmedInput);
        setInput('');
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
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-border bg-background">
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
        disabled={disabled || !input.trim()}
        className="bg-accent text-accent-foreground hover:bg-accent/90 self-end"
      >
        <PaperPlaneRight className="w-5 h-5" />
      </Button>
    </form>
  );
}
