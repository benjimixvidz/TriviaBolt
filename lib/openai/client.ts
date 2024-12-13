// Client-side OpenAI utilities
import OpenAI from 'openai';
import { env } from '@/lib/config';

export const openai = new OpenAI({
  apiKey: env.openai.apiKey,
});

export async function generateQuestion(category: string) {
  const response = await fetch('/api/questions/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate question');
  }

  return response.json();
}