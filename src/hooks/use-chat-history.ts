import { useKV } from '@github/spark/hooks';
import { ChatHistory, Message } from '@/lib/types';
import { useCallback } from 'react';

export function useChatHistory() {
  const [chatHistories, setChatHistories] = useKV<ChatHistory[]>('chat-histories', []);
  const [currentChatId, setCurrentChatId] = useKV<string | null>('current-chat-id', null);

  const createNewChat = useCallback(() => {
    const newChat: ChatHistory = {
      id: `chat-${Date.now()}`,
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setChatHistories((prev) => [newChat, ...(prev || [])]);
    setCurrentChatId(newChat.id);
    return newChat.id;
  }, [setChatHistories, setCurrentChatId]);

  const updateChatMessages = useCallback(
    (chatId: string, messages: Message[]) => {
      setChatHistories((prev) =>
        (prev || []).map((chat) => {
          if (chat.id === chatId) {
            const title =
              messages.length > 0 && messages[0].role === 'user'
                ? messages[0].content.slice(0, 50) + (messages[0].content.length > 50 ? '...' : '')
                : 'New Chat';

            return {
              ...chat,
              title,
              messages,
              updatedAt: Date.now(),
            };
          }
          return chat;
        })
      );
    },
    [setChatHistories]
  );

  const deleteChat = useCallback(
    (chatId: string) => {
      setChatHistories((prev) => (prev || []).filter((chat) => chat.id !== chatId));
      if (currentChatId === chatId) {
        setCurrentChatId(null);
      }
    },
    [setChatHistories, currentChatId, setCurrentChatId]
  );

  const getCurrentChat = useCallback(() => {
    if (!currentChatId || !chatHistories) return null;
    return chatHistories.find((chat) => chat.id === currentChatId) || null;
  }, [currentChatId, chatHistories]);

  const clearAllChats = useCallback(() => {
    setChatHistories([]);
    setCurrentChatId(null);
  }, [setChatHistories, setCurrentChatId]);

  const exportToJSON = useCallback(() => {
    const dataStr = JSON.stringify(chatHistories || [], null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-history-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [chatHistories]);

  const importFromJSON = useCallback(
    (file: File) => {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            const importedData = JSON.parse(content) as ChatHistory[];
            
            if (!Array.isArray(importedData)) {
              throw new Error('Invalid chat history format');
            }
            
            setChatHistories(importedData);
            setCurrentChatId(null);
            resolve();
          } catch (err) {
            reject(err instanceof Error ? err : new Error('Failed to parse JSON'));
          }
        };
        
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
      });
    },
    [setChatHistories, setCurrentChatId]
  );

  return {
    chatHistories,
    currentChatId,
    setCurrentChatId,
    createNewChat,
    updateChatMessages,
    deleteChat,
    getCurrentChat,
    clearAllChats,
    exportToJSON,
    importFromJSON,
  };
}
