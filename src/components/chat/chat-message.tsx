'use client';

import {useState, useEffect} from 'react';
import {User} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {type Message} from '@/lib/types';
import {useAuth} from '@/hooks/use-auth';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {formatDistanceToNow} from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
                  : 'bg-primary text-primary-foreground',
                isAssistant ? 'text-foreground' : 'text-primary-foreground'
              )}
            >
              <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-0 prose-a:text-primary hover:prose-a:underline">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                  a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />,
                }}>
                  {message.content}
                </ReactMarkdown>
              </div>
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
