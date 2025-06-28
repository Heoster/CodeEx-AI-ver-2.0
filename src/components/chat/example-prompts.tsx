import {Button} from '@/components/ui/button';
import {Code, BrainCircuit, Calculator, Lightbulb} from 'lucide-react';

interface ExamplePromptsProps {
  onSendMessage: (message: string) => void;
}

const prompts = [
  {
    icon: <BrainCircuit size={18} />,
    text: 'Explain recursion in simple terms',
  },
  {
    icon: <Code size={18} />,
    text: 'Write a Python function to find prime numbers',
  },
  {
    icon: <Calculator size={18} />,
    text: '/solve 15 * (4 + 2)',
  },
  {
    icon: <Lightbulb size={18} />,
    text: 'What is the difference between let, const, and var in JavaScript?',
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
