import { useState, useEffect, useCallback, useRef } from 'react';
import { CreateMLCEngine, MLCEngine, ChatCompletionMessageParam } from '@mlc-ai/web-llm';
import { Message, ModelStatus, ModelLoadProgress } from '@/lib/types';

export function useLLM() {
  const [engine, setEngine] = useState<MLCEngine | null>(null);
  const [status, setStatus] = useState<ModelStatus>('idle');
  const [loadProgress, setLoadProgress] = useState<ModelLoadProgress>({
    progress: 0,
    text: 'Initializing...',
    timeElapsed: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const engineRef = useRef<MLCEngine | null>(null);
  const isInitializing = useRef(false);

  const initializeEngine = useCallback(async () => {
    if (isInitializing.current || engineRef.current) {
      return;
    }

    isInitializing.current = true;
    setStatus('loading');
    setError(null);

    const startTime = Date.now();

    try {
      const selectedModel = 'gemma-2-2b-it-q4f16_1-MLC';

      const newEngine = await CreateMLCEngine(selectedModel, {
        initProgressCallback: (progress) => {
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          setLoadProgress({
            progress: progress.progress,
            text: progress.text,
            timeElapsed: elapsed,
          });
        },
      });

      engineRef.current = newEngine;
      setEngine(newEngine);
      setStatus('ready');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load model';
      setError(errorMessage);
      setStatus('error');
      isInitializing.current = false;
    }
  }, []);

  const generate = useCallback(
    async (messages: Message[], onChunk: (text: string) => void) => {
      if (!engineRef.current || status !== 'ready') {
        throw new Error('Model not ready');
      }

      setStatus('generating');

      try {
        const chatMessages: ChatCompletionMessageParam[] = messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        const completion = await engineRef.current.chat.completions.create({
          messages: chatMessages,
          temperature: 0.7,
          max_tokens: 1024,
          stream: true,
        });

        let fullText = '';
        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content || '';
          fullText += delta;
          onChunk(fullText);
        }

        setStatus('ready');
        return fullText;
      } catch (err) {
        setStatus('ready');
        throw err;
      }
    },
    [status]
  );

  const resetEngine = useCallback(async () => {
    if (engineRef.current) {
      await engineRef.current.resetChat();
    }
  }, []);

  useEffect(() => {
    initializeEngine();

    return () => {
      if (engineRef.current) {
        engineRef.current.unload();
        engineRef.current = null;
      }
    };
  }, [initializeEngine]);

  return {
    engine,
    status,
    loadProgress,
    error,
    generate,
    resetEngine,
    initializeEngine,
  };
}
