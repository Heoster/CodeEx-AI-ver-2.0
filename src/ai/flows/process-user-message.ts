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
import type {ProcessUserMessageInput} from '@/lib/types';
import {solveQuiz} from './solve-quizzes';
import {summarizeInformation} from './summarize-information';
import {searchTheWeb} from './web-search';

// This Zod schema now matches the simplified history structure defined in lib/types.ts.
// It only validates `role` and `content`, making the data contract stricter and more reliable.
const ProcessUserMessageInputSchema = z.object({
  message: z.string().describe('The latest message from the user.'),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
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
    // The AI service requires an explicit, prefixed model name.
    // This logic ensures the 'auto' setting defaults to a capable model
    // and all other models are correctly prefixed for the Genkit/Google AI provider.
    const model =
      settings.model === 'auto'
        ? 'googleai/gemini-1.5-flash'
        : `googleai/${settings.model}`;

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
      // The web search flow uses its own model with specific tools, so we don't pass one here.
      const {answer} = await searchTheWeb({query});
      return {answer};
    }

    // Default conversational response.
    // The history is now sent from the client in the correct format, so no mapping is needed here.
    const {answer} = await generateAnswerFromContext({
      messages: history,
      tone: settings.tone,
      technicalLevel: settings.technicalLevel,
      model: model,
    });

    return {answer};
  }
);
