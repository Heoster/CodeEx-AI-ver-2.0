'use server';

/**
 * @fileOverview This file defines a Genkit flow that takes a conversation history and generates a helpful answer.
 *
 * - generateAnswerFromContext - A function that takes a conversation history and returns an answer.
 * - GenerateAnswerFromContextInput - The input type for the generateAnswerFromContext function.
 * - GenerateAnswerFromContextOutput - The return type for the generateAnswerFromContext function.
 */

import {ai} from '@/ai/genkit';
import {Message as GenkitMessage} from '@genkit-ai/ai';
import {z} from 'genkit';

const GenerateAnswerFromContextInputSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      })
    )
    .describe('The conversation history.'),
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

const generateAnswerFromContextFlow = ai.defineFlow(
  {
    name: 'generateAnswerFromContextFlow',
    inputSchema: GenerateAnswerFromContextInputSchema,
    outputSchema: GenerateAnswerFromContextOutputSchema,
  },
  async input => {
    // Destructure for clarity and to ensure we only use what the schema defines.
    const {messages, tone, technicalLevel, model} = input;

    // The Gemini API prefers the 'user' and 'model' roles.
    const systemInstruction = `You are an AI assistant. Your response should have a ${
      tone || 'helpful'
    } tone and be at a ${
      technicalLevel || 'intermediate'
    } technical level. Please answer concisely and helpfully.`;

    // Map roles: 'assistant' -> 'model'
    const history: GenkitMessage[] = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      content: [{text: msg.content}],
    }));

    const lastMessage = history.pop();
    if (!lastMessage || lastMessage.role !== 'user') {
      // This should not happen in a valid conversation flow.
      throw new Error('The last message must be from the user.');
    }

    const {output} = await ai.generate({
      model: model, // Use the destructured, schema-validated model
      prompt: lastMessage.content,
      history: history,
      system: systemInstruction,
      output: {
        format: 'json',
        schema: GenerateAnswerFromContextOutputSchema,
      },
    });

    return output!;
  }
);
