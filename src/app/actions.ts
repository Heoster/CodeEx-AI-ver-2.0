'use server';

import {generateAnswerFromContext} from '@/ai/flows/generate-answer-from-context';
import {solveQuiz} from '@/ai/flows/solve-quizzes';
import {summarizeInformation} from '@/ai/flows/summarize-information';
import {textToSpeech} from '@/ai/flows/text-to-speech';
import {type Message, type Settings, type Model, type Voice} from '@/lib/types';
import {sendWelcomeEmail, type WelcomeEmailInput} from '@/ai/flows/send-welcome-email';
import {solveImageEquation, type SolveImageEquationInput, type SolveImageEquationOutput} from '@/ai/flows/solve-image-equation';

async function handleGenkitError(error: any): Promise<{ error: string }> {
  console.error('Genkit Action Error:', error);
  const errorMessage = error.message || String(error);

  if (errorMessage.includes('API key')) {
    return {
      error: 'API Authentication Error: The GOOGLE_API_KEY is missing or invalid. Please ensure it is correctly set in your .env file and that the Google AI services are enabled in your Google Cloud project.',
    };
  }
  
  return {error: `An unexpected API error occurred: ${errorMessage}`};
}


export async function triggerWelcomeEmail(input: WelcomeEmailInput): Promise<void> {
  try {
    await sendWelcomeEmail(input);
  } catch (error) {
    console.error('Error triggering welcome email:', error);
  }
}

export async function generateResponse(
  messages: Message[],
  settings: Settings
): Promise<{role: 'assistant'; content: string} | {error: string}> {
  const {model, tone, technicalLevel} = settings;
  let chosenModel: Model;

  const lastUserMessage = messages[messages.length - 1].content.toLowerCase();
  const isSolveRequest = lastUserMessage.startsWith('/solve');
  const isSummarizeRequest = lastUserMessage.startsWith('/summarize');

  if (model === 'auto') {
    chosenModel =
      isSolveRequest || isSummarizeRequest
        ? 'gemini-1.5-pro'
        : 'gemini-1.5-flash';
  } else {
    chosenModel = model;
  }

  const modelIdentifier = `googleai/${chosenModel}`;

  try {
    if (isSolveRequest) {
      const quiz = messages[messages.length - 1].content.substring(6).trim();
      const response = await solveQuiz({
        quiz,
        model: modelIdentifier,
        tone,
        technicalLevel,
      });
      return {role: 'assistant', content: response.solution};
    } else if (isSummarizeRequest) {
      const text = messages[messages.length - 1].content.substring(10).trim();
      if (!text) {
        return {
          role: 'assistant',
          content:
            'Please provide some text to summarize after the `/summarize` command.',
        };
      }
      const response = await summarizeInformation({
        text,
        model: modelIdentifier,
      });
      return {role: 'assistant', content: response.summary};
    } else {
      const response = await generateAnswerFromContext({
        messages: messages.map(m => ({role: m.role, content: m.content})),
        model: modelIdentifier,
        tone,
        technicalLevel,
      });
      return {role: 'assistant', content: response.answer};
    }
  } catch (error) {
    return handleGenkitError(error);
  }
}

export async function getSpeechAudio(
  text: string,
  voice: Voice
): Promise<{audio: string} | {error: string}> {
  try {
    const response = await textToSpeech({text, voice});
    return {audio: response.audio};
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
