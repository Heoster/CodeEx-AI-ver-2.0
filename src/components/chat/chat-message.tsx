'use client';

import {useState, useEffect} from 'react';
import {Bot, User} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {type Message} from '@/lib/types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({message}: ChatMessageProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isAssistant = message.role === 'assistant';

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        'group flex items-start gap-4',
        !isAssistant && 'flex-row-reverse'
      )}
    >
      <Avatar
        className={cn(
          'h-8 w-8 shrink-0',
          isAssistant ? 'bg-primary' : 'bg-accent'
        )}
      >
        <AvatarFallback
          className={cn(
            'text-primary-foreground',
            isAssistant ? 'bg-primary' : 'bg-accent'
          )}
        >
          {isAssistant ? <Bot size={20} /> : <User size={20} />}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'relative max-w-[80%] space-y-2 rounded-lg px-4 py-3',
          isAssistant
            ? 'bg-muted'
            : 'bg-primary text-primary-foreground'
        )}
      >
        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
      </div>
    </div>
  );
}
