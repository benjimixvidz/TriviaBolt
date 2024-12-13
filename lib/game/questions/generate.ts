import type { Question } from '@/lib/types';

export async function generateQuestion(gameId: string, category: string): Promise<Question> {
  const response = await fetch('/api/questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ gameId, category }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate question');
  }

  return response.json();
}