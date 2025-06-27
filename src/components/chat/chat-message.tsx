'use client';

import {useState, useEffect} from 'react';
import {Bot, User, Volume2} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {type Message} from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({message}: ChatMessageProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSpeak = () => {
    if ('speechSynthesis' in window && message.role === 'assistant') {
      const utterance = new SpeechSynthesisUtterance(message.content);
      window.speechSynthesis.speak(utterance);
    }
  };

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
        {isAssistant && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute -right-10 top-0 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={handleSpeak}
              >
                <Volume2 size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Speak</TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
