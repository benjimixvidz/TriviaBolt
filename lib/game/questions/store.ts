import { supabase } from '@/lib/supabase/client';
import type { Question } from '@/lib/types';
import type { GeneratedQuestion } from './types';

export async function storeQuestion(
  gameId: string,
  category: string,
  question: GeneratedQuestion
): Promise<Question> {
  const { data, error } = await supabase
    .from('questions')
    .insert([{
      game_session_id: gameId,
      category,
      question_text: question.question,
      correct_answer: question.correct_answer,
      incorrect_answers: question.incorrect_answers,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}