'use server';

import {generateAnswerFromContext} from '@/ai/flows/generate-answer-from-context';
import {solveQuiz} from '@/ai/flows/solve-quizzes';
import {type Message, type Settings, type Model} from '@/lib/types';

export async function generateResponse(
  messages: Message[],
  settings: Settings
): Promise<{role: 'assistant'; content: string} | {error: string}> {
  const {model, tone, technicalLevel} = settings;
  let chosenModel: Model;

  const isSolveRequest = messages[messages.length - 1].content
    .toLowerCase()
    .startsWith('/solve');

  if (model === 'auto') {
    // For complex tasks like solving quizzes, use the more powerful model.
    // For general chat, use the faster, more cost-effective model.
    chosenModel = isSolveRequest ? 'gemini-1.5-pro' : 'gemini-1.5-flash';
  } else {
    chosenModel = model;
  }

  const modelIdentifier = `googleai/${chosenModel}`;

  try {
    if (isSolveRequest) {
      const quiz = messages[messages.length - 1].content.substring(6).trim();
      const response = await solveQuiz({
        quiz,
        model: modelIdentifier,
        tone,
        technicalLevel,
      });
      return {role: 'assistant', content: response.solution};
    } else {
      const response = await generateAnswerFromContext({
        messages: messages.map(m => ({role: m.role, content: m.content})),
        model: modelIdentifier,
        tone,
        technicalLevel,
      });
      return {role: 'assistant', content: response.answer};
    }
  } catch (error) {
    console.error('Error generating response:', error);
    return {error: 'Sorry, I encountered an error. Please try again.'};
  }
}
