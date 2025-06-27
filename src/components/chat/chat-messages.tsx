'use client';

import {useEffect, useRef} from 'react';
import {ScrollArea} from '@/components/ui/scroll-area';
import {cn} from '@/lib/utils';
import {type Message} from '@/lib/types';
import {ChatMessage} from './chat-message';
import {Skeleton} from '../ui/skeleton';
import {Avatar, AvatarFallback} from '../ui/avatar';
import {Bot} from 'lucide-react';

interface ChatMessagesProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: Message[];
  isLoading?: boolean;
}

export function ChatMessages({
  messages,
  isLoading,
  className,
}: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <ScrollArea className={cn('w-full', className)} ref={scrollAreaRef}>
      <div className="p-4 md:p-6" ref={viewportRef}>
        <div className="space-y-6">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-4">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback>
                  <Bot size={20} />
                </AvatarFallback>
              </Avatar>
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
