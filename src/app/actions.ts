'use server';

import {generateAnswerFromContext} from '@/ai/flows/generate-answer-from-context';
import {solveQuiz} from '@/ai/flows/solve-quizzes';
import {type Message, type Settings} from '@/lib/types';

export async function generateResponse(
  messages: Message[],
  settings: Settings
): Promise<{role: 'assistant'; content: string} | {error: string}> {
  const {model, tone, technicalLevel} = settings;

  const modelIdentifier = `googleai/${model}`;

  try {
    const questionMessage = messages[messages.length - 1];
    if (questionMessage.content.toLowerCase().startsWith('/solve')) {
      const quiz = questionMessage.content.substring(6).trim();
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
