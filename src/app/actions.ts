'use server';

import {generateAnswerFromContext} from '@/ai/flows/generate-answer-from-context';
import {solveQuiz} from '@/ai/flows/solve-quizzes';
import {summarizeInformation} from '@/ai/flows/summarize-information';
import {textToSpeech} from '@/ai/flows/text-to-speech';
import {type Message, type Settings, type Model, type Voice} from '@/lib/types';

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
    // For complex tasks like solving quizzes or summarizing, use the more powerful model.
    // For general chat, use the faster, more cost-effective model.
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
    console.error('Error generating response:', error);
    return {error: 'Sorry, I encountered an error. Please try again.'};
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
    console.error('Error generating speech audio:', error);
    return {error: 'Sorry, I could not generate audio for this message.'};
  }
}
