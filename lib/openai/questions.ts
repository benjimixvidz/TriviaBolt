import { openai } from './client';
import type { Question } from '@/lib/types';

interface GeneratedQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

/**
 * Generates a trivia question using OpenAI
 */
export async function generateQuestion(category: string): Promise<GeneratedQuestion> {
  const prompt = `Generate a trivia question about ${category} with one correct answer and three incorrect answers. Format as JSON: { "question": "...", "correct_answer": "...", "incorrect_answers": ["...", "...", "..."] }`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
  });

  return JSON.parse(completion.choices[0].message.content!) as GeneratedQuestion;
}