import { generateQuestion } from './generate';
import { storeQuestion } from './store';
import type { Question } from '@/lib/types';

export async function generateQuestions(
  gameId: string,
  category: string,
  count: number = 1
): Promise<Question[]> {
  try {
    const questions: Question[] = [];
    const errors: Error[] = [];
    
    // Generate questions in parallel
    const promises = Array(count).fill(0).map(async () => {
      try {
        const generated = await generateQuestion(gameId, category);
        questions.push(generated);
      } catch (error) {
        errors.push(error as Error);
      }
    });

    await Promise.all(promises);

    // If no questions were generated successfully, throw error
    if (questions.length === 0) {
      throw new Error(
        errors[0]?.message || 'Failed to generate any questions'
      );
    }

    return questions;
  } catch (error) {
    console.error('Failed to generate questions:', error);
    throw error;
  }
}