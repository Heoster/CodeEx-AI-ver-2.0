import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const plugins = [googleAI()];

export const ai = genkit({
  plugins,
});
