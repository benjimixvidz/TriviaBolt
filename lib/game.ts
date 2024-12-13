import { supabase } from './supabase';

export async function createGameSession() {
  const { data, error } = await supabase
    .from('game_sessions')
    .insert([{ status: 'lobby' }])
    .select()
    .single();
  return { data, error };
}

export async function getGameSessions() {
  const { data, error } = await supabase
    .from('game_sessions')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function updateGameStatus(gameId: string, status: 'lobby' | 'in_progress' | 'ended') {
  const { data, error } = await supabase
    .from('game_sessions')
    .update({ status })
    .eq('id', gameId);
  return { data, error };
}

export async function getGameQuestions(gameId: string) {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('game_session_id', gameId);
  return { data, error };
}

export async function getPlayerScores(gameId: string) {
  const { data, error } = await supabase
    .from('player_scores')
    .select(`
      *,
      profiles:player_id (username)
    `)
    .eq('game_session_id', gameId)
    .order('score', { ascending: false });
  return { data, error };
}

export async function updatePlayerScore(gameId: string, playerId: string, score: number) {
  const { data, error } = await supabase
    .from('player_scores')
    .upsert([
      {
        game_session_id: gameId,
        player_id: playerId,
        score,
      },
    ]);
  return { data, error };
}