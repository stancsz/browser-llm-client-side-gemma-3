import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { MarkdownContent } from './MarkdownContent';

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
