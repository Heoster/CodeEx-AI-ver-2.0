'use server';

import {generateAnswerFromContext} from '@/ai/flows/generate-answer-from-context';
import {solveQuiz} from '@/ai/flows/solve-quizzes';
import {summarizeInformation} from '@/ai/flows/summarize-information';
import {textToSpeech} from '@/ai/flows/text-to-speech';
import {type Message, type Settings, type Model, type Voice} from '@/lib/types';
import {sendWelcomeEmail, type WelcomeEmailInput} from '@/ai/flows/send-welcome-email';
import {solveImageEquation, type SolveImageEquationInput, type SolveImageEquationOutput} from '@/ai/flows/solve-image-equation';
import {searchTheWeb, type WebSearchOutput} from '@/ai/flows/web-search';

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

function addCitations(response: WebSearchOutput): string {
    let text = response.answer;
    const supports = response.metadata?.groundingSupports;
    const chunks = response.metadata?.groundingChunks;

    if (!text || !supports || !chunks) {
        return text || 'I couldn\'t find a definitive answer for that.';
    }

    const sortedSupports = [...supports].sort(
        (a, b) => (b.segment?.endIndex ?? 0) - (a.segment?.endIndex ?? 0),
    );

    for (const support of sortedSupports) {
        const endIndex = support.segment?.endIndex;
        if (endIndex === undefined || !support.groundingChunkIndices?.length) {
            continue;
        }
        
        const uniqueChunkIndices = [...new Set(support.groundingChunkIndices)];

        const citationLinks = uniqueChunkIndices
        .map(i => {
            const uri = chunks[i]?.web?.uri;
            if (uri) {
              return `[${i + 1}](${uri})`;
            }
            return null;
        })
        .filter((link): link is string => link !== null);

        if (citationLinks.length > 0) {
            const citationString = ' ' + citationLinks.join(' ');
            text = text.slice(0, endIndex) + citationString + text.slice(endIndex);
        }
    }

    const sourceList = chunks.map((chunk, i) => {
        if (chunk.web?.uri && chunk.web?.title) {
            return `${i + 1}. [${chunk.web.title}](${chunk.web.uri})`;
        }
        return null;
    }).filter(Boolean);

    if (sourceList.length > 0) {
        text += '\n\n**Sources:**\n' + sourceList.join('\n');
    }

    return text;
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
  const isSearchRequest = lastUserMessage.startsWith('/search');

  if (model === 'auto') {
    chosenModel =
      isSolveRequest || isSummarizeRequest || isSearchRequest
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
    } else if (isSearchRequest) {
      const query = messages[messages.length - 1].content.substring(8).trim();
       if (!query) {
          return {
          role: 'assistant',
          content:
              'Please provide a query to search for after the `/search` command.',
          };
      }
      const response = await searchTheWeb({query});
      const contentWithCitations = addCitations(response);
      return {role: 'assistant', content: contentWithCitations};
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
