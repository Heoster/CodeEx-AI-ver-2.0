'use server';

/**
 * @fileOverview This file defines a Genkit flow that takes a user's question, gathers information from the internet,
 * and generates a helpful answer.
 *
 * - generateAnswerFromContext - A function that takes a user question and returns an answer generated from the gathered context.
 * - GenerateAnswerFromContextInput - The input type for the generateAnswerFromContext function.
 * - GenerateAnswerFromContextOutput - The return type for the generateAnswerFromContext function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WebSearchToolInputSchema = z.object({
  query: z.string().describe('The search query to use.'),
});

const WebSearchToolOutputSchema = z.string().describe('The search results.');

const webSearch = ai.defineTool(
  {
    name: 'webSearch',
    description: 'Searches the web for relevant information.',
    inputSchema: WebSearchToolInputSchema,
    outputSchema: WebSearchToolOutputSchema,
  },
  async input => {
    // Placeholder for web search implementation.
    // In a real application, this would use a web search API.
    // For now, just return a canned response.
    console.log(`Searching the web for: ${input.query}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `Web search results for "${input.query}": This is a summary of relevant information found on the web.  It should be used to answer the question.`;
  }
);

const GenerateAnswerFromContextInputSchema = z.object({
  question: z.string().describe('The user question to answer.'),
});
export type GenerateAnswerFromContextInput = z.infer<typeof GenerateAnswerFromContextInputSchema>;

const GenerateAnswerFromContextOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question.'),
});
export type GenerateAnswerFromContextOutput = z.infer<typeof GenerateAnswerFromContextOutputSchema>;

export async function generateAnswerFromContext(
  input: GenerateAnswerFromContextInput
): Promise<GenerateAnswerFromContextOutput> {
  return generateAnswerFromContextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAnswerFromContextPrompt',
  input: {schema: GenerateAnswerFromContextInputSchema},
  output: {schema: GenerateAnswerFromContextOutputSchema},
  tools: [webSearch],
  prompt: `You are an AI assistant that answers questions based on information found on the internet.

  The user will ask a question, and you will use the webSearch tool to find relevant information.
  Then, you will use the information to answer the question in a concise and helpful manner.

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
    const {output} = await prompt(input);
    return output!;
  }
);
