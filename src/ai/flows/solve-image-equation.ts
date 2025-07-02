'use server';
/**
 * @fileOverview An AI agent that solves math equations from images.
 *
 * - solveImageEquation - A function that handles the equation solving process from an image.
 * - SolveImageEquationInput - The input type for the solveImageEquation function.
 * - SolveImageEquationOutput - The return type for the solveImageEquation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SolveImageEquationInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a handwritten math equation, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SolveImageEquationInput = z.infer<typeof SolveImageEquationInputSchema>;

const SolveImageEquationOutputSchema = z.object({
  recognizedEquation: z
    .string()
    .describe(
      'The equation recognized from the image, formatted as a LaTeX string.'
    ),
  solutionSteps: z
    .string()
    .describe(
      'The step-by-step solution to the equation, formatted as a LaTeX string. Use double backslashes (\\\\) for new lines between steps.'
    ),
  isSolvable: z.boolean().describe('Whether the recognized equation is solvable or not.'),
});
export type SolveImageEquationOutput = z.infer<typeof SolveImageEquationOutputSchema>;

export async function solveImageEquation(
  input: SolveImageEquationInput
): Promise<SolveImageEquationOutput> {
  return solveImageEquationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'solveImageEquationPrompt',
  input: {schema: SolveImageEquationInputSchema},
  output: {schema: SolveImageEquationOutputSchema},
  // Using gemini-1.5-pro for better vision and reasoning capabilities
  model: 'googleai/gemini-1.5-pro',
  prompt: `You are a world-class mathematics expert with advanced optical character recognition (OCR) capabilities. Your task is to analyze the provided image, identify any handwritten mathematical equations, and provide a detailed, step-by-step solution.

  1.  **Analyze the Image**: Carefully examine the image provided.
      - Photo: {{media url=photoDataUri}}

  2.  **Recognize the Equation**: Identify the mathematical equation. If you cannot find a clear, solvable equation, set 'isSolvable' to false and explain why in the 'solutionSteps' field.
  
  3.  **Format the Recognized Equation**: Present the recognized equation in a clean LaTeX format. For example, 'x^2 + 5x - 4 = 0'. Put this in the 'recognizedEquation' field.

  4.  **Solve the Equation**: If the equation is solvable, provide a clear, step-by-step solution.
      - Show each major step of the solution process clearly.
      - Format the entire solution as a single LaTeX string. Use '\\\\' to create new lines between steps. For example: 'Step 1: x^2 + 5x = 4 \\\\ Step 2: ...'
      - Put the full solution in the 'solutionSteps' field.

  5.  **Set Solvability**: Set the 'isSolvable' field to 'true' if you could solve it, and 'false' otherwise.`,
});

const solveImageEquationFlow = ai.defineFlow(
  {
    name: 'solveImageEquationFlow',
    inputSchema: SolveImageEquationInputSchema,
    outputSchema: SolveImageEquationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
