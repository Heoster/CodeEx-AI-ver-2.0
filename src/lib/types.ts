export type Message = {
  id: string;
  role: 'user' | 'assistant';
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
  | 'gemini-pro'
  | 'gemini-1.0-pro'
  | 'gemini-1.5-flash-latest'
  | 'gemini-1.5-pro-latest'
  | 'gemini-pro-vision';

export type Settings = {
  model: Model;
  tone: 'helpful' | 'formal' | 'casual';
  technicalLevel: 'beginner' | 'intermediate' | 'expert';
};
