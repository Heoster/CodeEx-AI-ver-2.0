'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing information gathered from the internet.
 *
 * - summarizeInformation - A function that takes a text and summarizes it.
 * - SummarizeInformationInput - The input type for the summarizeInformation function.
 * - SummarizeInformationOutput - The return type for the summarizeInformation function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const SummarizeInformationInputSchema = z.object({
  text: z.string().describe('The text to summarize.'),
  model: z.string().optional(),
});
export type SummarizeInformationInput = z.infer<
  typeof SummarizeInformationInputSchema
>;

const SummarizeInformationOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the input text.'),
});
export type SummarizeInformationOutput = z.infer<
  typeof SummarizeInformationOutputSchema
>;

export async function summarizeInformation(
  input: SummarizeInformationInput
): Promise<SummarizeInformationOutput> {
  return summarizeInformationFlow(input);
}

const summarizeInformationPrompt = ai.definePrompt({
  name: 'summarizeInformationPrompt',
  input: {schema: SummarizeInformationInputSchema},
  output: {schema: SummarizeInformationOutputSchema},
  prompt: `Summarize the following text into a concise and easy-to-understand answer:\n\n{{{text}}}`,
});

const summarizeInformationFlow = ai.defineFlow(
  {
    name: 'summarizeInformationFlow',
    inputSchema: SummarizeInformationInputSchema,
    outputSchema: SummarizeInformationOutputSchema,
  },
  async input => {
    const {output} = await summarizeInformationPrompt(input, {
      model: input.model,
    });
    return output!;
  }
);
