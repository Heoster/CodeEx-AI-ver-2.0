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

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('webkitSpeechRecognition' in window)) {
      console.warn('Web Speech API is not supported by this browser.');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      onSendMessage(transcript);
      setIsListening(false);
    };

    recognition.onerror = event => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;

    return () => {
      recognitionRef.current?.stop();
    };
  }, [onSendMessage]);

  const handleVoiceButtonClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
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
                  placeholder="Ask me anything..."
                  rows={1}
                  className="max-h-36 resize-none pr-24"
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
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
          variant={isListening ? 'destructive' : 'default'}
          className="absolute right-12 top-1 h-8 w-8"
          disabled={isLoading || !recognitionRef.current}
          onClick={handleVoiceButtonClick}
        >
          <Mic size={16} />
          <span className="sr-only">
            {isListening ? 'Stop listening' : 'Start voice input'}
          </span>
        </Button>
        <Button
          type="submit"
          size="icon"
          className="absolute right-1 top-1 h-8 w-8"
          disabled={isLoading || !form.formState.isValid}
        >
          <Send size={16} />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </Form>
  );
}
