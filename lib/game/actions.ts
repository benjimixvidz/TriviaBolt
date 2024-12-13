'use server';

import { generateQuestion } from '@/lib/openai/questions';
import { supabase } from '@/lib/supabase/server';
import type { GameSession } from '@/lib/types';

/**
 * Generates and stores a new question for a game
 */
export async function generateGameQuestion(gameId: string, category: string) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI integration is not configured');
  }

  try {
    const question = await generateQuestion(category);
    
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
  } catch (error) {
    console.error('Failed to generate question:', error);
    throw error;
  }
}

/**
 * Updates the status of a game
 */
export async function updateGameStatus(
  gameId: string,
  status: GameSession['status']
) {
  try {
    const { error } = await supabase
      .from('game_sessions')
      .update({ status })
      .eq('id', gameId);

    if (error) throw error;
  } catch (error) {
    console.error('Failed to update game status:', error);
    throw error;
  }
}