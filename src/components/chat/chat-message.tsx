'use client';

import {useState, useEffect} from 'react';
import {User} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {type Message} from '@/lib/types';
import {useAuth} from '@/hooks/use-auth';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {formatDistanceToNow} from 'date-fns';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({message}: ChatMessageProps) {
  const {user} = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isAssistant = message.role === 'assistant';

  if (!isMounted) {
    return null;
  }
  
  const displayTimestamp = message.createdAt
  ? formatDistanceToNow(new Date(message.createdAt), {addSuffix: true})
  : '';

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
           <div
            className={cn(
              'group flex items-start gap-4',
              !isAssistant && 'flex-row-reverse'
            )}
          >
            <Avatar
              className={cn(
                'h-8 w-8 shrink-0',
                isAssistant ? 'bg-primary' : 'bg-transparent'
              )}
            >
              {isAssistant ? (
                <>
                  <AvatarImage src="/favicon.ico" alt="CODEEX AI" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    C
                  </AvatarFallback>
                </>
              ) : (
                <>
                  <AvatarImage
                    src={user?.photoURL ?? ''}
                    alt={user?.displayName ?? 'User'}
                  />
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    {user?.displayName ? (
                      user.displayName.charAt(0).toUpperCase()
                    ) : (
                      <User size={20} />
                    )}
                  </AvatarFallback>
                </>
              )}
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
        </TooltipTrigger>
        {displayTimestamp && (
          <TooltipContent>
            <p>{displayTimestamp}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
