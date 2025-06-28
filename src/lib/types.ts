export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'context';
  content: string;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
};

export type Model =
  | 'gemini-1.5-flash'
  | 'gemini-1.5-pro'
  | 'gpt-4o'
  | 'gpt-4'
  | 'gpt-4-turbo'
  | 'gpt-3.5-turbo';

export type Settings = {
  model: Model;
  tone: 'helpful' | 'formal' | 'casual';
  technicalLevel: 'beginner' | 'intermediate' | 'expert';
};
