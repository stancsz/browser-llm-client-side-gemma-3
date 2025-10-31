import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { MarkdownContent } from './MarkdownContent';
import { Paperclip } from '@phosphor-icons/react';

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming = false }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex w-full mb-4', isUser ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-3 shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-card text-card-foreground border border-border'
        )}
      >
        {message.attachments && message.attachments.length > 0 && (
          <div className="mb-3 space-y-2">
            {message.attachments.map((attachment, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm border',
                  isUser
                    ? 'bg-primary-foreground/10 border-primary-foreground/20'
                    : 'bg-muted border-border'
                )}
              >
                <Paperclip className="w-4 h-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{attachment.name}</div>
                  <div className={cn('text-xs', isUser ? 'opacity-70' : 'text-muted-foreground')}>
                    {(attachment.size / 1024).toFixed(1)}KB
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {isUser ? (
          <div className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </div>
        ) : (
          <MarkdownContent content={message.content} isStreaming={isStreaming} />
        )}
      </div>
    </motion.div>
  );
}
