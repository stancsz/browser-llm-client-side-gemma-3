import { ModelStatus } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash, Warning, CircleNotch } from '@phosphor-icons/react';
import { Separator } from '@/components/ui/separator';

interface ChatHeaderProps {
  status: ModelStatus;
  onClear: () => void;
  messageCount: number;
}

export function ChatHeader({ status, onClear, messageCount }: ChatHeaderProps) {
  const getStatusBadge = () => {
    switch (status) {
      case 'ready':
        return (
          <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30">
            ● Ready
          </Badge>
        );
      case 'loading':
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            <CircleNotch className="w-3 h-3 mr-1 animate-spin" />
            Loading
          </Badge>
        );
      case 'generating':
        return (
          <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/30">
            <CircleNotch className="w-3 h-3 mr-1 animate-spin" />
            Generating
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
            <Warning className="w-3 h-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-muted text-muted-foreground">
            Idle
          </Badge>
        );
    }
  };

  return (
    <div className="border-b border-border bg-card">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Gemma 3 Browser AI</h1>
          <p className="text-sm text-muted-foreground">Client-side AI powered by WebGPU</p>
        </div>
        <div className="flex items-center gap-3">
          {getStatusBadge()}
          {messageCount > 0 && status === 'ready' && (
            <>
              <Separator orientation="vertical" className="h-6" />
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
