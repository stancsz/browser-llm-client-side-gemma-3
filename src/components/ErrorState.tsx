import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Warning } from '@phosphor-icons/react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const isWebGPUError = error.toLowerCase().includes('webgpu');

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <Alert variant="destructive" className="max-w-md">
        <Warning className="h-5 w-5" />
        <AlertTitle className="text-lg">Failed to Load Model</AlertTitle>
        <AlertDescription className="mt-3 space-y-3">
          <p className="text-sm">{error}</p>
          {isWebGPUError && (
            <div className="bg-destructive/10 rounded p-3 space-y-2">
              <p className="text-xs font-medium">WebGPU Support Required</p>
              <p className="text-xs">
                This application requires WebGPU support. Please use a compatible browser:
              </p>
              <ul className="text-xs list-disc list-inside space-y-1">
                <li>Chrome/Edge 113+ (enable chrome://flags/#enable-unsafe-webgpu)</li>
                <li>Safari 18+ on macOS</li>
                <li>Firefox Nightly (with WebGPU enabled)</li>
              </ul>
            </div>
          )}
          <Button onClick={onRetry} variant="outline" className="w-full">
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
