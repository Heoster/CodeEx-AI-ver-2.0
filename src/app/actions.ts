'use server';

import {generateAnswerFromContext} from '@/ai/flows/generate-answer-from-context';
import {solveQuiz} from '@/ai/flows/solve-quizzes';
import {Message} from '@/lib/types';

export async function generateResponse(
  messages: Message[],
  model: string
): Promise<{role: 'assistant'; content: string} | {error: string}> {
  const latestMessage = messages[messages.length - 1];
  const question = latestMessage.content;

  try {
    let response;
    if (question.toLowerCase().startsWith('/solve')) {
      const quiz = question.substring(6).trim();
      response = await solveQuiz({quiz, model});
      return {role: 'assistant', content: response.solution};
    } else {
      response = await generateAnswerFromContext({question, model});
      return {role: 'assistant', content: response.answer};
    }
  } catch (error) {
    console.error('Error generating response:', error);
    return {error: 'Sorry, I encountered an error. Please try again.'};
  }
}
