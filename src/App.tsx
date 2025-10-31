import { useState, useCallback } from 'react';
import { useLLM } from '@/hooks/use-llm';
import { Message } from '@/lib/types';
import { ChatHeader } from '@/components/ChatHeader';
import { ChatMessages } from '@/components/ChatMessages';
import { ChatInput } from '@/components/ChatInput';
import { ModelLoading } from '@/components/ModelLoading';
import { ErrorState } from '@/components/ErrorState';
import { Toaster, toast } from 'sonner';

function App() {
  const { status, loadProgress, error, generate, resetEngine, initializeEngine } = useLLM();
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingMessageId, setStreamingMessageId] = useState<string | undefined>();

  const handleSend = useCallback(
    async (content: string) => {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content,
        timestamp: Date.now(),
      };

      const assistantMessageId = `assistant-${Date.now()}`;
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setStreamingMessageId(assistantMessageId);

      try {
        const allMessages = [...messages, userMessage];

        await generate(allMessages, (streamedText) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId ? { ...msg, content: streamedText } : msg
            )
          );
        });
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to generate response';
        toast.error(errorMsg);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: `Error: ${errorMsg}` }
              : msg
          )
        );
      } finally {
        setStreamingMessageId(undefined);
      }
    },
    [messages, generate]
  );

  const handleClear = useCallback(async () => {
    setMessages([]);
    setStreamingMessageId(undefined);
    await resetEngine();
    toast.success('Conversation cleared');
  }, [resetEngine]);

  const handleRetry = useCallback(() => {
    initializeEngine();
  }, [initializeEngine]);

  return (
    <div className="h-screen flex flex-col bg-background">
      <Toaster position="top-center" />
      
      <ChatHeader 
        status={status} 
        onClear={handleClear} 
        messageCount={messages.length} 
      />

      {status === 'loading' && <ModelLoading progress={loadProgress} />}
      
      {status === 'error' && error && (
        <ErrorState error={error} onRetry={handleRetry} />
      )}

      {(status === 'ready' || status === 'generating') && (
        <>
          <ChatMessages messages={messages} streamingMessageId={streamingMessageId} />
          <ChatInput
            onSend={handleSend}
            disabled={status === 'generating'}
            placeholder={
              status === 'generating'
                ? 'AI is thinking...'
                : 'Type your message...'
            }
          />
        </>
      )}
    </div>
  );
}

export default App;