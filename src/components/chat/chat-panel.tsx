'use client';

import {type Chat, type Settings, type Message} from '@/lib/types';
import {ChatInput} from './chat-input';
import {ChatMessages} from './chat-messages';
import {ExamplePrompts} from './example-prompts';
import {useState, useRef, useEffect, useCallback} from 'react';
import {generateResponse, getSpeechAudio} from '@/app/actions';
import {useAuth} from '@/hooks/use-auth';

interface ChatPanelProps {
  chat: Chat;
  settings: Settings;
  messages: Message[];
  addMessage: (
    chatId: string,
    message: Omit<Message, 'id' | 'createdAt'>,
    newTitle?: string
  ) => void;
}

export function ChatPanel({
  chat,
  settings,
  messages,
  addMessage,
}: ChatPanelProps) {
  const [isLoadingFromAI, setIsLoadingFromAI] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const {user} = useAuth();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const isLoading = isLoadingFromAI || isSpeaking;

  const handleSendMessage = useCallback(
    async (messageContent: string) => {
      if (isLoading || !user) return;
      setIsLoadingFromAI(true);
      setAudioUrl(null);

      const isNewChat = messages.length <= 1;
      const newTitle = isNewChat
        ? messageContent.substring(0, 30) +
          (messageContent.length > 30 ? '...' : '')
        : undefined;

      addMessage(
        chat.id,
        {role: 'user', content: messageContent},
        newTitle
      );

      const updatedHistory = [
        ...messages,
        {
          id: 'temp',
          role: 'user' as const,
          content: messageContent,
          createdAt: new Date().toISOString(),
        },
      ];

      const response = await generateResponse({
        message: messageContent,
        history: updatedHistory,
        settings: settingsRef.current,
      });

      let assistantContent = '';
      if ('error' in response) {
        assistantContent = response.error;
      } else {
        assistantContent = response.content;
      }

      addMessage(chat.id, {role: 'assistant', content: assistantContent});
      setIsLoadingFromAI(false);

      if (settingsRef.current.enableSpeech && assistantContent) {
        try {
          setIsSpeaking(true);
          const speechResponse = await getSpeechAudio(
            assistantContent,
            settingsRef.current.voice
          );
          if ('audio' in speechResponse) {
            setAudioUrl(speechResponse.audio);
          } else {
            console.error(
              'Failed to generate speech:',
              speechResponse.error
            );
            setIsSpeaking(false);
          }
        } catch (e) {
          console.error('Exception during speech generation:', e);
          setIsSpeaking(false);
        }
      }
    },
    [isLoading, user, messages, addMessage, chat.id]
  );

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      const audioElement = audioRef.current;
      audioElement.play().catch(error => {
        console.error('Error playing audio:', error);
        setIsSpeaking(false);
      });

      const handleAudioEnd = () => {
        setIsSpeaking(false);
      };

      audioElement.addEventListener('ended', handleAudioEnd);
      return () => {
        audioElement.removeEventListener('ended', handleAudioEnd);
      };
    }
  }, [audioUrl]);

  const isNewChat = messages.length <= 1;

  const greetingHeader =
    isNewChat && user ? (
      <div className="mb-8 flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-3xl font-bold">Hello, {user.displayName}!</h1>
      </div>
    ) : null;

  return (
    <div className="flex h-[calc(100svh-3.5rem)] flex-col">
      <ChatMessages
        messages={messages}
        isLoading={isLoadingFromAI}
        className="flex-1"
        header={greetingHeader}
      />

      {isNewChat && (
        <ExamplePrompts onSendMessage={handleSendMessage} />
      )}

      <div className="border-t bg-background px-4 py-2 md:py-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        <div className="px-2 pt-2 text-center text-xs text-muted-foreground">
          <p>
            Try commands like{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-semibold">
              /solve
            </code>{' '}
            or{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-semibold">
              /summarize
            </code>
            .
          </p>
          <p>CodeEx powered by Heoster.</p>
        </div>
      </div>
      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} style={{display: 'none'}} />
      )}
    </div>
  );
}
