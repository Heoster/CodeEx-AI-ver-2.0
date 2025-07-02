'use server';
/**
 * @fileOverview An AI agent that analyzes PDF documents.
 *
 * - analyzePdf - A function that handles the PDF analysis process.
 * - AnalyzePdfInput - The input type for the analyzePdf function.
 * - AnalyzePdfOutput - The return type for the analyzePdf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePdfInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
  question: z.string().describe('The question to ask about the document.'),
});
export type AnalyzePdfInput = z.infer<typeof AnalyzePdfInputSchema>;

const AnalyzePdfOutputSchema = z.object({
  answer: z
    .string()
    .describe('The answer to the question based on the document content.'),
});
export type AnalyzePdfOutput = z.infer<typeof AnalyzePdfOutputSchema>;

export async function analyzePdf(
  input: AnalyzePdfInput
): Promise<AnalyzePdfOutput> {
  return analyzePdfFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePdfPrompt',
  input: {schema: AnalyzePdfInputSchema},
  output: {schema: AnalyzePdfOutputSchema},
  // Using gemini-1.5-pro for its large context window and strong document understanding
  model: 'googleai/gemini-1.5-pro',
  prompt: `You are an expert document analyst. Your task is to carefully analyze the provided PDF document and answer the user's question about it. Provide a clear, concise, and helpful answer based *only* on the information contained within the document.

  1.  **Analyze the Document**: Carefully examine the document provided.
      - Document: {{media url=pdfDataUri}}

  2.  **Answer the Question**: Based on your analysis, answer the following question.
      - Question: {{{question}}}`,
});

const analyzePdfFlow = ai.defineFlow(
  {
    name: 'analyzePdfFlow',
    inputSchema: AnalyzePdfInputSchema,
    outputSchema: AnalyzePdfOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
