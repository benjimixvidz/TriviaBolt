import { supabase } from '@/lib/supabase/client';
import type { GameSession } from '@/lib/types';

export async function createGameSession() {
  return await supabase
    .from('game_sessions')
    .insert([{ status: 'lobby' }])
    .select()
    .single();
}

export async function getGameSessions() {
  return await supabase
    .from('game_sessions')
    .select('*')
    .order('created_at', { ascending: false });
}

export async function deleteGameSession(gameId: string) {
  // First delete all related data
  const { error: questionsError } = await supabase
    .from('questions')
    .delete()
    .eq('game_session_id', gameId);

  if (questionsError) {
    console.error('Failed to delete questions:', questionsError);
  }

  const { error: scoresError } = await supabase
    .from('player_scores')
    .delete()
    .eq('game_session_id', gameId);

  if (scoresError) {
    console.error('Failed to delete player scores:', scoresError);
  }

  return await supabase
    .from('game_sessions')
    .delete()
    .eq('id', gameId);
}

export async function updateGameStatus(gameId: string, status: 'lobby' | 'in_progress' | 'ended') {
  return await supabase
    .from('game_sessions')
    .update({ status })
    .eq('id', gameId)
    .select()
    .single();
}