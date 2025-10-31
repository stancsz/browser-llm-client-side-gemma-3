import { useKV } from '@github/spark/hooks';
import { useCallback } from 'react';
export function useChatHistory() {

export function useChatHistory() {
  const [chatHistories, setChatHistories] = useKV<ChatHistory[]>('chat-histories', []);
  const [currentChatId, setCurrentChatId] = useKV<string | null>('current-chat-id', null);

  const createNewChat = useCallback(() => {
    const newChat: ChatHistory = {
    };
      title: 'New Chat',
    setCurrentChatI
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setChatHistories((prev) => [newChat, ...prev]);
            const title =
    return newChat.id;
  }, [setChatHistories, setCurrentChatId]);

  const updateChatMessages = useCallback(
    (chatId: string, messages: Message[]) => {
      setChatHistories((prev) =>
        prev.map((chat) => {
          if (chat.id === chatId) {
            const title =
              messages.length > 0 && messages[0].role === 'user'
                ? messages[0].content.slice(0, 50) + (messages[0].content.length > 50 ? '...' : '')
                : 'New Chat';

            return {
              ...chat,

    link.href = url;
    document.body.appendChild(link);
    document.b
  }, [chatH
  const importFromJSON
      retu
        
      
            if (import
    

          }
        reader.onerror = 
      });
    [setChatHistories, setCurrentChatId]

    chatHistories,
    

    clearAllChats,
    exportToJSON,
  };













    link.href = url;

    document.body.appendChild(link);



















          }



      });

    [setChatHistories, setCurrentChatId]



    chatHistories,





    clearAllChats,

    exportToJSON,

  };

