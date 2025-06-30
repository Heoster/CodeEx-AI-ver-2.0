export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'context';
  content: string;
  createdAt: string;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
};

export type Model =
  | 'gemini-1.5-pro'
  | 'gemini-1.5-flash'
  | 'gemini-pro'
  | 'gemini-pro-vision';

export type Voice = 'Algenib' | 'Enceladus' | 'Achernar' | 'Heka';

export type Settings = {
  model: 'auto' | Model;
  tone: 'helpful' | 'formal' | 'casual';
  technicalLevel: 'beginner' | 'intermediate' | 'expert';
  enableSpeech: boolean;
  voice: Voice;
};
