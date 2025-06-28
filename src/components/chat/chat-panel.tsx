'use client';

import {useCallback, useRef, useState} from 'react';
import {type Chat, type Settings} from '@/lib/types';
import {ChatMessages} from './chat-messages';
import {ChatInput} from './chat-input';
import {generateResponse} from '@/app/actions';
import {useToast} from '@/hooks/use-toast';
import {ExamplePrompts} from './example-prompts';

interface ChatPanelProps {
  chat: Chat;
  updateChat: (chatId: string, messages: Chat['messages']) => void;
  settings: Settings;
}

export function ChatPanel({chat, updateChat, settings}: ChatPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();
  const chatRef = useRef(chat);
  chatRef.current = chat;

  const isNewChat = chat.messages.length <= 1;

  const handleSendMessage = useCallback(
    async (content: string) => {
      const currentChat = chatRef.current;
      const newMessage = {
        id: crypto.randomUUID(),
        role: 'user' as const,
        content,
      };
      const updatedMessages = [...currentChat.messages, newMessage];
      updateChat(currentChat.id, updatedMessages);
      setIsLoading(true);

      const result = await generateResponse(updatedMessages, settings);

      if ('error' in result) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
        const updatedMessagesWithError = updatedMessages.slice(0, -1);
        updateChat(currentChat.id, updatedMessagesWithError);
      } else {
        const assistantMessage = {id: crypto.randomUUID(), ...result};
        updateChat(currentChat.id, [...updatedMessages, assistantMessage]);
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(
            assistantMessage.content
          );
          window.speechSynthesis.speak(utterance);
        }
      }

      setIsLoading(false);
    },
    [settings, toast, updateChat]
  );

  return (
    <div className="flex h-[calc(100svh-3.5rem)] flex-col">
      <ChatMessages
        messages={chat.messages}
        isLoading={isLoading}
        className="flex-1"
      />

      {isNewChat && <ExamplePrompts onSendMessage={handleSendMessage} />}

      <div className="border-t bg-background px-4 py-2 md:py-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        <p className="px-2 pt-2 text-center text-xs text-muted-foreground">
          For quizzes or calculations, start your message with{' '}
          <code className="rounded bg-muted px-1 py-0.5 font-semibold">
            /solve
          </code>
          .
        </p>
      </div>
    </div>
  );
}
