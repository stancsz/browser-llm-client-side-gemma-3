export interface Attachment {
  name: string;
  content: string;
  type: string;
  size: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  attachments?: Attachment[];
}

export interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface ModelLoadProgress {
  progress: number;
  text: string;
  timeElapsed: number;
}

export type ModelStatus = 'idle' | 'loading' | 'ready' | 'error' | 'generating';
