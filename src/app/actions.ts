'use server';

import {analyzePdf} from '@/ai/flows/analyze-pdf';
import {generateAnswerFromContext} from '@/ai/flows/generate-answer-from-context';
import {processUserMessage} from '@/ai/flows/process-user-message';
import {sendWelcomeEmail} from '@/ai/flows/send-welcome-email';
import {solveImageEquation} from '@/ai/flows/solve-image-equation';
import {textToSpeech} from '@/ai/flows/text-to-speech';
import type {
  AnalyzePdfInput,
  AnalyzePdfOutput,
  Message,
  ProcessUserMessageInput,
  Settings,
  SolveImageEquationInput,
  SolveImageEquationOutput,
  TextToSpeechInput,
  TextToSpeechOutput,
} from '@/lib/types';

async function handleGenkitError(error: unknown): Promise<{error: string}> {
  const message = error instanceof Error ? error.message : String(error);
  console.error('Genkit flow failed:', error);
  return {error: `AI processing failed: ${message}`};
}

export async function generateResponse(
  input: ProcessUserMessageInput
): Promise<{content: string} | {error: string}> {
  try {
    const response = await processUserMessage(input);
    return {content: response.answer};
  } catch (error) {
    return handleGenkitError(error);
  }
}

export async function getSpeechAudio(
  text: string,
  voice: TextToSpeechInput['voice']
): Promise<TextToSpeechOutput | {error: string}> {
  try {
    const response = await textToSpeech({text, voice});
    return response;
  } catch (error) {
    return handleGenkitError(error);
  }
}

export async function solveEquationFromImage(
  input: SolveImageEquationInput
): Promise<SolveImageEquationOutput | {error: string}> {
  try {
    const response = await solveImageEquation(input);
    return response;
  } catch (error) {
    return handleGenkitError(error);
  }
}

export async function analyzeDocumentFromPdf(
  input: AnalyzePdfInput
): Promise<AnalyzePdfOutput | {error: string}> {
  try {
    const response = await analyzePdf(input);
    return response;
  } catch (error) {
    return handleGenkitError(error);
  }
}

export async function triggerWelcomeEmail(input: {
  email: string;
  displayName: string;
}): Promise<void | {error: string}> {
  try {
    await sendWelcomeEmail(input);
  } catch (error) {
    return handleGenkitError(error);
  }
}
