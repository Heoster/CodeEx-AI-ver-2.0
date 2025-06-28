import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import openai from 'genkitx-openai';

const plugins = [googleAI(), openai()];

export const ai = genkit({
  plugins,
});
