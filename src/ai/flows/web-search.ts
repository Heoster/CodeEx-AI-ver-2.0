'use server';

/**
 * @fileOverview This file defines a Genkit flow that uses Google Search to answer questions with up-to-date information.
 *
 * - searchTheWeb - A function that takes a query and returns a grounded answer with citations.
 * - WebSearchInput - The input type for the searchTheWeb function.
 * - WebSearchOutput - The return type for the searchTheWeb function.
 */

import {ai} from '@/ai/genkit';
import {googleSearch} from '@genkit-ai/googleai';
import {z} from 'genkit';

const WebSearchInputSchema = z.object({
  query: z.string().describe('The user question to search the web for.'),
});
export type WebSearchInput = z.infer<typeof WebSearchInputSchema>;

// Define a schema that captures the structure of groundingMetadata
const GroundingMetadataSchema = z.object({
  webSearchQueries: z.array(z.string()).optional(),
  groundingChunks: z
    .array(
      z.object({
        web: z.object({
          uri: z.string().optional(),
          title: z.string().optional(),
        }),
      })
    )
    .optional(),
  groundingSupports: z
    .array(
      z.object({
        segment: z.object({
          startIndex: z.number().optional(),
          endIndex: z.number().optional(),
        }),
        groundingChunkIndices: z.array(z.number()).optional(),
      })
    )
    .optional(),
});

const WebSearchOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question, based on web search results.'),
  metadata: GroundingMetadataSchema.optional().describe('Citation and search query metadata.'),
});
export type WebSearchOutput = z.infer<typeof WebSearchOutputSchema>;

export async function searchTheWeb(input: WebSearchInput): Promise<WebSearchOutput> {
  return webSearchFlow(input);
}

const webSearchFlow = ai.defineFlow(
  {
    name: 'webSearchFlow',
    inputSchema: WebSearchInputSchema,
    outputSchema: WebSearchOutputSchema,
  },
  async ({query}) => {
    const llmResponse = await ai.generate({
      prompt: query,
      model: 'googleai/gemini-1.5-flash',
      tools: [googleSearch],
    });

    const output = {
      answer: llmResponse.text,
      metadata: llmResponse.output?.custom?.groundingMetadata,
    };
    
    // Validate the output against the Zod schema before returning
    return WebSearchOutputSchema.parse(output);
  }
);
