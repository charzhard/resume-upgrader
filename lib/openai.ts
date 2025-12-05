import OpenAI from 'openai';
import { AIConfig } from '@/lib/config';

export const openai = new OpenAI({
  apiKey: AIConfig.apiKey,
  baseURL: AIConfig.baseURL,
});
