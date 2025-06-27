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

export type Model = 'gemini-2.0-flash' | 'gemini-1.5-flash' | 'gemini-1.5-pro';

export type Settings = {
  model: Model;
};
