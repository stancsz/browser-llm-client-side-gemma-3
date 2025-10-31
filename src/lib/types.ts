export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ModelLoadProgress {
  progress: number;
  text: string;
  timeElapsed: number;
}

export type ModelStatus = 'idle' | 'loading' | 'ready' | 'error' | 'generating';
