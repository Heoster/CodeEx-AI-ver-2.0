import {Button} from '@/components/ui/button';
import {Code, Calculator, Lightbulb, FileText} from 'lucide-react';

interface ExamplePromptsProps {
  onSendMessage: (message: string) => void;
}

const prompts = [
  {
    icon: <Lightbulb size={18} />,
    text: 'Suggest some names for a new coffee shop',
  },
  {
    icon: <Code size={18} />,
    text: 'Write a python script to sort a list of numbers',
  },
  {
    icon: <Calculator size={18} />,
    text: '/solve 15 * (4 + 2)',
  },
  {
    icon: <FileText size={18} />,
    text: '/summarize The history of the internet began with the development...',
  },
];

export function ExamplePrompts({onSendMessage}: ExamplePromptsProps) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {prompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto justify-start gap-3 whitespace-normal py-3 text-left"
            onClick={() => onSendMessage(prompt.text)}
          >
            <div className="flex-shrink-0">{prompt.icon}</div>
            <div className="flex-1">{prompt.text}</div>
          </Button>
        ))}
      </div>
    </div>
  );
}
