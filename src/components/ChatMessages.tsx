import { useEffect, useRef } from 'react';
import { Message } from '@/lib/types';
import { ChatMessage } from './ChatMessage';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatMessagesProps {
  messages: Message[];
  streamingMessageId?: string;
}

export function ChatMessages({ messages, streamingMessageId }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center space-y-4 max-w-md px-4">
          <div className="space-y-2">
            <p className="text-lg font-medium text-foreground">Welcome to GemmaChat</p>
            <p className="text-sm">Ask me anything - your conversation is completely private</p>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-1">
              <span>🔒</span>
              <span>100% Private</span>
            </div>
            <div className="flex items-center gap-1">
              <span>⚡</span>
              <span>Client-side</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🆓</span>
              <span>Free Forever</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea ref={scrollRef} className="flex-1 px-4 py-6">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          isStreaming={message.id === streamingMessageId}
        />
      ))}
    </ScrollArea>
  );
}
