import { ChatHistory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash, DownloadSimple, UploadSimple, ChatCircle } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

interface ChatSidebarProps {
  chatHistories: ChatHistory[];
  currentChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

export function ChatSidebar({
  chatHistories,
  currentChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onExport,
  onImport,
}: ChatSidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-4 border-b border-border">
        <Button onClick={onNewChat} className="w-full justify-start gap-2" size="lg">
          <ChatCircle size={20} weight="duotone" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {chatHistories.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                'group relative flex items-center gap-2 p-3 rounded-md cursor-pointer transition-colors hover:bg-muted',
                currentChatId === chat.id && 'bg-muted'
              )}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{chat.title}</p>
                <p className="text-xs text-muted-foreground">{formatDate(chat.updatedAt)}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
              >
                <Trash size={16} />
              </Button>
            </div>
          ))}
          {chatHistories.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-8">
              No chat history yet
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={onExport}
          disabled={chatHistories.length === 0}
        >
          <DownloadSimple size={18} />
          Export History
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={handleImportClick}
        >
          <UploadSimple size={18} />
          Import History
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
