'use server';

import {config} from 'dotenv';
config();

import '@/ai/flows/solve-quizzes.ts';
import '@/ai/flows/summarize-information.ts';
import '@/ai/flows/generate-answer-from-context.ts';
import '@/ai/flows/send-welcome-email.ts';
