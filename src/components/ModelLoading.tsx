import { ModelLoadProgress } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface ModelLoadingProps {
  progress: ModelLoadProgress;
}

export function ModelLoading({ progress }: ModelLoadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex items-center justify-center p-8"
    >
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
            />
          </div>
          <h2 className="text-xl font-semibold">Loading Gemma 3 Model</h2>
          <p className="text-sm text-muted-foreground">
            Downloading model files to your browser...
          </p>
        </div>

        <div className="space-y-3">
          <Progress value={progress.progress} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{progress.text}</span>
            <span className="text-muted-foreground">{Math.round(progress.progress)}%</span>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            Time elapsed: {progress.timeElapsed}s
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4 space-y-2">
          <p className="text-xs font-medium">First-time setup</p>
          <p className="text-xs text-muted-foreground">
            The model is being cached in your browser. Subsequent loads will be much faster.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
