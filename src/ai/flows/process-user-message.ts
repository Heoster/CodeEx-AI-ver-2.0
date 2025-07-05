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
    // If the model is set to 'auto', provide a sensible default.
    // 'gemini-1.5-flash' is a good balance of speed and capability for general chat.
    // Passing `undefined` will cause an error.
    const model =
      settings.model === 'auto' ? 'gemini-1.5-flash' : settings.model;

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
      // The web search flow uses its own model, so we don't pass one here.
      const {answer} = await searchTheWeb({query});
      return {answer};
    }

    // Default conversational response.
    // We explicitly map the history to ensure it only contains `role` and `content`,
    // which is what the `generateAnswerFromContext` flow expects. This prevents
    // schema validation errors caused by extra fields like `id` and `createdAt`.
    const conversationHistory = history.map(({role, content}) => ({
      role,
      content,
    }));

    const {answer} = await generateAnswerFromContext({
      messages: conversationHistory,
      tone: settings.tone,
      technicalLevel: settings.technicalLevel,
      model: model,
    });

    return {answer};
  }
);
