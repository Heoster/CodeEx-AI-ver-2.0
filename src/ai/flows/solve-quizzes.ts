'use server';

/**
 * @fileOverview An AI agent that solves quizzes and calculations from intermediate to advanced levels.
 *
 * - solveQuiz - A function that handles the quiz solving process.
 * - SolveQuizInput - The input type for the solveQuiz function.
 * - SolveQuizOutput - The return type for the solveQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SolveQuizInputSchema = z.object({
  quiz: z.string().describe('The quiz question or calculation to solve.'),
  model: z.string().optional(),
  tone: z.enum(['helpful', 'formal', 'casual']).optional(),
  technicalLevel: z.enum(['beginner', 'intermediate', 'expert']).optional(),
});
export type SolveQuizInput = z.infer<typeof SolveQuizInputSchema>;

const SolveQuizOutputSchema = z.object({
  solution: z
    .string()
    .describe('The solution to the quiz question or calculation.'),
});
export type SolveQuizOutput = z.infer<typeof SolveQuizOutputSchema>;

export async function solveQuiz(
  input: SolveQuizInput
): Promise<SolveQuizOutput> {
  return solveQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'solveQuizPrompt',
  input: {schema: SolveQuizInputSchema},
  output: {schema: SolveQuizOutputSchema},
  prompt: `You are an expert in solving quizzes and calculations from intermediate to advanced levels.

  Your response should have a {{#if tone}}{{tone}}{{else}}helpful{{/if}} tone.
  Your response should be at a {{#if technicalLevel}}{{technicalLevel}}{{else}}intermediate{{/if}} technical level.

  Solve the following quiz question or calculation and provide the solution.

  Quiz: {{{quiz}}}`,
});

const solveQuizFlow = ai.defineFlow(
  {
    name: 'solveQuizFlow',
    inputSchema: SolveQuizInputSchema,
    outputSchema: SolveQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input, {
      model: input.model,
    });
    return output!;
  }
);
