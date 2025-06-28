'use server';

/**
 * @fileOverview This file defines a Genkit flow that takes a user's question and generates a helpful answer.
 *
 * - generateAnswerFromContext - A function that takes a user question and returns an answer generated from the gathered context.
 * - GenerateAnswerFromContextInput - The input type for the generateAnswerFromContext function.
 * - GenerateAnswerFromContextOutput - The return type for the generateAnswerFromContext function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAnswerFromContextInputSchema = z.object({
  question: z.string().describe('The user question to answer.'),
  model: z.string().optional(),
  tone: z.enum(['helpful', 'formal', 'casual']).optional(),
  technicalLevel: z.enum(['beginner', 'intermediate', 'expert']).optional(),
});
export type GenerateAnswerFromContextInput = z.infer<
  typeof GenerateAnswerFromContextInputSchema
>;

const GenerateAnswerFromContextOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question.'),
});
export type GenerateAnswerFromContextOutput = z.infer<
  typeof GenerateAnswerFromContextOutputSchema
>;

export async function generateAnswerFromContext(
  input: GenerateAnswerFromContextInput
): Promise<GenerateAnswerFromContextOutput> {
  return generateAnswerFromContextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAnswerFromContextPrompt',
  input: {schema: GenerateAnswerFromContextInputSchema},
  output: {schema: GenerateAnswerFromContextOutputSchema},
  prompt: `You are an AI assistant that answers questions.

  Your response should have a {{#if tone}}{{tone}}{{else}}helpful{{/if}} tone.
  Your response should be at a {{#if technicalLevel}}{{technicalLevel}}{{else}}intermediate{{/if}} technical level.

  Please answer the following question concisely and helpfully.

  Question: {{{question}}}
  `,
});

const generateAnswerFromContextFlow = ai.defineFlow(
  {
    name: 'generateAnswerFromContextFlow',
    inputSchema: GenerateAnswerFromContextInputSchema,
    outputSchema: GenerateAnswerFromContextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input, {
      model: input.model,
    });
    return output!;
  }
);
