import { useKV } from '@github/spark/hooks';
import { useCallback } from 'react';
import { useCallback } from 'react';

  const [currentChatId, setCurrent
  const [chatHistories, setChatHistories] = useKV<ChatHistory[]>('chat-histories', []);
  const [currentChatId, setCurrentChatId] = useKV<string | null>('current-chat-id', null);


    setCurrentChatId(newChat.id);
  }, [setChatHistories, setCurr
  const updateChatMessag
      setChatHistor
          if (chat.id === ch
              messages.lengt
      

    setChatHistories((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
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
    [setChatHistories, 
              title,
              updatedAt: Date.now(),
            };
  }, [setCh
          return chat;
    if (!c
      );
    },
    [setChatHistories]
    

    link.href = url;
    (chatId: string) => {
      setChatHistories((prev) => prev.filter((chat) => chat.id !== chatId));
      setCurrentChatId((currentId) => (currentId === chatId ? null : currentId));
  }, [
    [setChatHistories, setCurrentChatId]
    

  const clearAllChats = useCallback(() => {
    setChatHistories([]);
            const importedC
  }, [setChatHistories, setCurrentChatId]);

  const getCurrentChat = useCallback(() => {
    if (!currentChatId) return null;
    return chatHistories.find((chat) => chat.id === currentChatId) || null;
  }, [currentChatId, chatHistories]);

  const exportToJSON = useCallback(() => {
    const dataStr = JSON.stringify(chatHistories, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
















































