'use client';

import {useForm, type SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {Send, Mic} from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {useEffect, useRef, useState} from 'react';
import {cn} from '@/lib/utils';

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty.'),
});

type ChatFormValues = z.infer<typeof chatSchema>;

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({onSendMessage, isLoading}: ChatInputProps) {
  const form = useForm<ChatFormValues>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: '',
    },
  });

  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playSound = () => {
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    if (!audioContextRef.current) return;

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5 note
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      audioContext.currentTime + 0.2
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const SpeechRecognition =
      window.webkitSpeechRecognition || (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Web Speech API is not supported by this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      playSound();
      setIsListening(true);
    };

    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        onSendMessage(transcript);
      }
    };

    recognition.onerror = event => {
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        console.error('Speech recognition error:', event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognitionRef.current?.abort();
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
    };
  }, [onSendMessage]);

  useEffect(() => {
    if (isVoiceChatActive && !isLoading && !isListening) {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.warn('Speech recognition already active.', e);
      }
    } else if (!isVoiceChatActive || isLoading) {
      recognitionRef.current?.abort();
    }
  }, [isVoiceChatActive, isLoading, isListening]);

  const handleVoiceButtonClick = () => {
    setIsVoiceChatActive(prev => !prev);
  };

  const onSubmit: SubmitHandler<ChatFormValues> = data => {
    onSendMessage(data.message);
    form.reset();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex w-full items-start gap-2"
      >
        <FormField
          control={form.control}
          name="message"
          render={({field}) => (
            <FormItem className="flex-1">
              <FormControl>
                <Textarea
                  placeholder={
                    isVoiceChatActive
                      ? 'Voice chat is active...'
                      : 'Ask me anything...'
                  }
                  rows={1}
                  className="max-h-36 resize-none pr-24"
                  onKeyDown={handleKeyDown}
                  disabled={isLoading || isVoiceChatActive}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="button"
          size="icon"
          variant={isVoiceChatActive ? 'destructive' : 'default'}
          className={cn(
            'absolute right-12 top-1 h-8 w-8',
            isListening && 'animate-pulse'
          )}
          disabled={!recognitionRef.current}
          onClick={handleVoiceButtonClick}
        >
          <Mic size={16} />
          <span className="sr-only">
            {isVoiceChatActive ? 'Stop voice chat' : 'Start voice chat'}
          </span>
        </Button>
        <Button
          type="submit"
          size="icon"
          className="absolute right-1 top-1 h-8 w-8"
          disabled={isLoading || !form.formState.isValid || isVoiceChatActive}
        >
          <Send size={16} />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </Form>
  );
}