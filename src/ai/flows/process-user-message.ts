'use server';
/**
 * @fileOverview A primary Genkit flow that routes user messages to the appropriate tool or generates a conversational response.
 *
 * - processUserMessage - The main function that handles user input.
 * - ProcessUserMessageInput - The input type for the processUserMessage function.
 * - ProcessUserMessageOutput - The return type for the processUserMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {generateAnswerFromContext} from './generate-answer-from-context';
import type {Message, Settings} from '@/lib/types';
import {solveQuiz} from './solve-quizzes';
import {summarizeInformation} from './summarize-information';
import {searchTheWeb} from './web-search';

const ProcessUserMessageInputSchema = z.object({
  message: z.string().describe('The latest message from the user.'),
  history: z
    .array(
      z.object({
        id: z.string(),
        role: z.enum(['user', 'assistant']),
        content: z.string(),
        createdAt: z.string(),
      })
    )
    .describe('The conversation history.'),
  settings: z.object({
    model: z.enum([
      'auto',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-pro',
      'gemini-pro-vision',
    ]),
    tone: z.enum(['helpful', 'formal', 'casual']),
    technicalLevel: z.enum(['beginner', 'intermediate', 'expert']),
    enableSpeech: z.boolean(),
    voice: z.enum(['Algenib', 'Enceladus', 'Achernar', 'Heka']),
  }),
});

export type ProcessUserMessageInput = z.infer<
  typeof ProcessUserMessageInputSchema
>;

const ProcessUserMessageOutputSchema = z.object({
  answer: z.string().describe('The generated response to the user message.'),
});

export type ProcessUserMessageOutput = z.infer<
  typeof ProcessUserMessageOutputSchema
>;

export async function processUserMessage(
  input: ProcessUserMessageInput
): Promise<ProcessUserMessageOutput> {
  return processUserMessageFlow(input);
}

const processUserMessageFlow = ai.defineFlow(
  {
    name: 'processUserMessageFlow',
    inputSchema: ProcessUserMessageInputSchema,
    outputSchema: ProcessUserMessageOutputSchema,
  },
  async ({message, history, settings}) => {
    const model =
      settings.model === 'auto' ? undefined : settings.model;

    if (message.startsWith('/solve ')) {
      const question = message.substring(7);
      const {solution} = await solveQuiz({quiz: question, model});
      return {answer: solution};
    }
    
    if (message.startsWith('/summarize ')) {
      const text = message.substring(11);
      const {summary} = await summarizeInformation({text, model});
      return {answer: summary};
    }

    if (message.startsWith('/search ')) {
      const query = message.substring(8);
      const {answer} = await searchTheWeb({query});
      return {answer};
    }

    // Default conversational response
    // The `history` object from the client already contains the latest user message.
    // We pass it directly to the next flow, which will handle mapping it to the format
    // expected by the AI provider.
    const {answer} = await generateAnswerFromContext({
      messages: history,
      ...settings,
    });

    return {answer};
  }
);
