import { useState, useCallback, useEffect } from 'react';
import { useLLM } from '@/hooks/use-llm';
import { useChatHistory } from '@/hooks/use-chat-history';
import { Message, Attachment } from '@/lib/types';
import { ChatHeader } from '@/components/ChatHeader';
import { ChatMessages } from '@/components/ChatMessages';
import { ChatInput } from '@/components/ChatInput';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ModelLoading } from '@/components/ModelLoading';
import { ErrorState } from '@/components/ErrorState';
import { Toaster, toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

function App() {
  const { status, loadProgress, error, generate, resetEngine, initializeEngine } = useLLM();
  const {
    chatHistories,
    currentChatId,
    setCurrentChatId,
    createNewChat,
    updateChatMessages,
    deleteChat,
    getCurrentChat,
    exportToJSON,
    importFromJSON,
  } = useChatHistory();

  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingMessageId, setStreamingMessageId] = useState<string | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!currentChatId || !chatHistories) {
      setMessages([]);
      return;
    }
    const currentChat = chatHistories.find((chat) => chat.id === currentChatId);
    if (currentChat) {
      setMessages(currentChat.messages);
    } else {
      setMessages([]);
    }
  }, [currentChatId, chatHistories]);

  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);



  const handleSend = useCallback(
    async (content: string, attachments?: Attachment[]) => {
      let chatId = currentChatId;
      if (!chatId) {
        chatId = createNewChat();
      }

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content,
        timestamp: Date.now(),
        attachments,
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

        setMessages((finalMessages) => {
          updateChatMessages(chatId!, finalMessages);
          return finalMessages;
        });
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to generate response';
        toast.error(errorMsg);
        setMessages((prev) => {
          const updatedMessages = prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: `Error: ${errorMsg}` }
              : msg
          );
          updateChatMessages(chatId!, updatedMessages);
          return updatedMessages;
        });
      } finally {
        setStreamingMessageId(undefined);
      }
    },
    [messages, generate, currentChatId, createNewChat, updateChatMessages]
  );

  const handleClear = useCallback(async () => {
    if (currentChatId) {
      updateChatMessages(currentChatId, []);
    }
    setMessages([]);
    setStreamingMessageId(undefined);
    setCurrentChatId(null);
    await resetEngine();
    toast.success('Conversation cleared');
  }, [resetEngine, setCurrentChatId, currentChatId, updateChatMessages]);

  const handleRetry = useCallback(() => {
    initializeEngine();
  }, [initializeEngine]);

  const handleNewChat = useCallback(() => {
    const newChatId = createNewChat();
    setMessages([]);
    setStreamingMessageId(undefined);
    resetEngine();
  }, [createNewChat, resetEngine]);

  const handleSelectChat = useCallback(
    (chatId: string) => {
      setCurrentChatId(chatId);
      setStreamingMessageId(undefined);
      resetEngine();
    },
    [setCurrentChatId, resetEngine]
  );

  const handleDeleteChat = useCallback(
    (chatId: string) => {
      deleteChat(chatId);
      toast.success('Chat deleted');
    },
    [deleteChat]
  );

  const handleExport = useCallback(() => {
    exportToJSON();
    toast.success('Chat history exported');
  }, [exportToJSON]);

  const handleImport = useCallback(
    async (file: File) => {
      try {
        await importFromJSON(file);
        toast.success('Chat history imported successfully');
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to import';
        toast.error(errorMsg);
      }
    },
    [importFromJSON]
  );

  return (
    <div className="h-screen flex bg-background">
      <Toaster position="top-center" />
      
      <div
        className={`${
          isSidebarOpen ? 'w-80' : 'w-0'
        } transition-all duration-300 overflow-hidden border-r border-border hidden md:block`}
      >
        <ChatSidebar
          chatHistories={chatHistories || []}
          currentChatId={currentChatId || null}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
          onExport={handleExport}
          onImport={handleImport}
        />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-background"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div className="w-80 h-full" onClick={(e) => e.stopPropagation()}>
            <ChatSidebar
              chatHistories={chatHistories || []}
              currentChatId={currentChatId || null}
              onSelectChat={(chatId) => {
                handleSelectChat(chatId);
                setIsSidebarOpen(false);
              }}
              onNewChat={() => {
                handleNewChat();
                setIsSidebarOpen(false);
              }}
              onDeleteChat={handleDeleteChat}
              onExport={handleExport}
              onImport={handleImport}
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <ChatHeader
          status={status}
          onClear={handleClear}
          messageCount={messages.length}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
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
    </div>
  );
}

export default App;