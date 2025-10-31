import { useKV } from '@github/spark/hooks';
import { ChatHistory, Message } from
import { ChatHistory, Message } from '@/lib/types';

  const [currentChatId, setCurrent
  const [chatHistories, setChatHistories] = useKV<ChatHistory[]>('chat-histories', []);
  const [currentChatId, setCurrentChatId] = useKV<string | null>('current-chat-id', null);


    setCurrentChatId(newChat.id);
  }, [setChatHistories, setCurr
  const updateChatMessag
      setChatHistor
          if (chat.id === ch
              messages.lengt
      

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












    const link = document.createElement('a');












































