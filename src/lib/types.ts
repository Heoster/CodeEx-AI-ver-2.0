export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
};

export type Chat = {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
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

// Types for Genkit flows
export interface ProcessUserMessageInput {
  message: string;
  // Use a simpler history type that only includes what the AI needs.
  // This prevents schema validation errors from extra fields like id or createdAt.
  history: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  settings: Settings;
}

export interface TextToSpeechInput {
  text: string;
  voice: Voice;
}

export interface TextToSpeechOutput {
  audio: string;
}

export interface SolveImageEquationInput {
  photoDataUri: string;
}

export interface SolveImageEquationOutput {
  recognizedEquation: string;
  solutionSteps: string;
  isSolvable: boolean;
}

export interface AnalyzePdfInput {
  pdfDataUri: string;
  question: string;
}

export interface AnalyzePdfOutput {
  answer: string;
}
