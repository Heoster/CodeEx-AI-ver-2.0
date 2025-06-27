'use client';

import {useState} from 'react';
import {type Chat} from '@/lib/types';
import {ChatMessages} from './chat-messages';
import {ChatInput} from './chat-input';
import {generateResponse} from '@/app/actions';
import {useToast} from '@/hooks/use-toast';

interface ChatPanelProps {
  chat: Chat;
  updateChat: (chatId: string, messages: Chat['messages']) => void;
}

export function ChatPanel({chat, updateChat}: ChatPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();

  const handleSendMessage = async (content: string) => {
    const newMessage = {id: crypto.randomUUID(), role: 'user', content};
    const updatedMessages = [...chat.messages, newMessage];
    updateChat(chat.id, updatedMessages);
    setIsLoading(true);

    const result = await generateResponse(updatedMessages);

    if ('error' in result) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
      const updatedMessagesWithError = updatedMessages.slice(0, -1);
      updateChat(chat.id, updatedMessagesWithError);
    } else {
      const assistantMessage = {id: crypto.randomUUID(), ...result};
      updateChat(chat.id, [...updatedMessages, assistantMessage]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex h-[calc(100svh-3.5rem)] flex-col">
      <ChatMessages
        messages={chat.messages}
        isLoading={isLoading}
        className="flex-1"
      />
      <div className="border-t bg-background px-4 py-2 md:py-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        <p className="px-2 pt-2 text-center text-xs text-muted-foreground">
          For quiz/calculation, start your message with{' '}
          <code className="font-mono">/solve</code>.
        </p>
      </div>
    </div>
  );
}
