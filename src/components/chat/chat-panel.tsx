'use client';

import {type Chat, type Settings, type Message} from '@/lib/types';
import {ChatInput} from './chat-input';
import {ChatMessages} from './chat-messages';
import {ExamplePrompts} from './example-prompts';
import {useState} from 'react';
import {generateResponse} from '@/app/actions';
import {useAuth} from '@/hooks/use-auth';

interface ChatPanelProps {
  chat: Chat;
  settings: Settings;
  updateChat: (chatId: string, messages: Message[]) => void;
}

export function ChatPanel({chat, settings, updateChat}: ChatPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useAuth();

  const handleSendMessage = async (messageContent: string) => {
    if (isLoading) return;
    setIsLoading(true);

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: messageContent,
      createdAt: new Date().toISOString(),
    };

    const newMessages = [...chat.messages, newUserMessage];
    updateChat(chat.id, newMessages);

    const response = await generateResponse(newMessages, settings);

    if ('error' in response) {
      const assistantErrorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.error,
        createdAt: new Date().toISOString(),
      };
      updateChat(chat.id, [...newMessages, assistantErrorMessage]);
    } else {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.content,
        createdAt: new Date().toISOString(),
      };
      updateChat(chat.id, [...newMessages, assistantMessage]);
    }
    setIsLoading(false);
  };

  const isNewChat = chat.messages.length <= 1;

  const greetingHeader =
    isNewChat && user ? (
      <div className="mb-8 flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-3xl font-bold">Hello, {user.displayName}!</h1>
      </div>
    ) : null;

  return (
    <div className="flex h-[calc(100svh-3.5rem)] flex-col">
      <ChatMessages
        messages={chat.messages}
        isLoading={isLoading}
        className="flex-1"
        header={greetingHeader}
      />

      {isNewChat && <ExamplePrompts onSendMessage={handleSendMessage} />}

      <div className="border-t bg-background px-4 py-2 md:py-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        <p className="px-2 pt-2 text-center text-xs text-muted-foreground">
          CodeEx powered by Heoster. Try commands like{' '}
          <code className="rounded bg-muted px-1 py-0.5 font-semibold">
            /solve
          </code>{' '}
          or{' '}
          <code className="rounded bg-muted px-1 py-0.5 font-semibold">
            /summarize
          </code>
          .
        </p>
      </div>
    </div>
  );
}
