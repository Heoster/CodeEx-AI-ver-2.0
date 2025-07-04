'use server';

import {config} from 'dotenv';
config();

import '@/ai/flows/solve-quizzes.ts';
import '@/ai/flows/summarize-information.ts';
import '@/ai/flows/generate-answer-from-context.ts';
import '@/ai/flows/send-welcome-email.ts';
import '@/ai/flows/text-to-speech.ts';
import '@/ai/flows/solve-image-equation.ts';
import '@/ai/flows/web-search.ts';
import '@/ai/flows/analyze-pdf.ts';
import '@/ai/flows/process-user-message.ts';
