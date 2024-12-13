import OpenAI from 'openai';
import { serverEnv } from '@/lib/config/server-env';
import { validateServerEnv } from '@/lib/config/server-env';

// Validate environment variables before creating client
validateServerEnv();

// Create OpenAI client for server-side only
export const openai = new OpenAI({
  apiKey: serverEnv.openai.apiKey,
});