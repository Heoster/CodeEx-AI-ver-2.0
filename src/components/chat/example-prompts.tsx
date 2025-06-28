import {Card, CardContent} from '@/components/ui/card';
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
          <Card
            key={index}
            className="cursor-pointer transition-colors hover:bg-accent"
            onClick={() => onSendMessage(prompt.text)}
          >
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex-shrink-0">{prompt.icon}</div>
              <div className="flex-1 text-sm">{prompt.text}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
