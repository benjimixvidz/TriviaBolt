'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { GameSession, Question, PlayerScore } from '@/lib/types';

/**
 * Hook to subscribe to real-time game session updates
 */
export function useGameSession(gameId: string) {
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from('game_sessions')
          .select('*')
          .eq('id', gameId)
          .single();

        if (supabaseError) throw supabaseError;
        setGameSession(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch game'));
      } finally {
        setLoading(false);
      }
    };

    fetchGame();

    // Subscribe to real-time changes
    const channel = supabase
      .channel(`game_${gameId}`)
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'game_sessions',
          filter: `id=eq.${gameId}` 
        },
        (payload) => {
          setGameSession(payload.new as GameSession);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId]);

  return { gameSession, loading, error };
}

/**
 * Hook to subscribe to real-time player score updates
 */
export function usePlayerScores(gameId: string) {
  const [scores, setScores] = useState<PlayerScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      const { data } = await supabase
        .from('player_scores')
        .select(`
          *,
          profiles:player_id (username)
        `)
        .eq('game_session_id', gameId)
        .order('score', { ascending: false });
      setScores(data || []);
      setLoading(false);
    };

    fetchScores();

    const channel = supabase
      .channel(`game_${gameId}_scores`)
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'player_scores',
          filter: `game_session_id=eq.${gameId}` 
        },
        fetchScores
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId]);

  return { scores, loading };
}

/**
 * Hook to subscribe to real-time question updates
 */
export function useGameQuestions(gameId: string) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await supabase
        .from('questions')
        .select('*')
        .eq('game_session_id', gameId);
      setQuestions(data || []);
      setLoading(false);
    };

    fetchQuestions();

    const channel = supabase
      .channel(`game_${gameId}_questions`)
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'questions',
          filter: `game_session_id=eq.${gameId}` 
        },
        fetchQuestions
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId]);

  return { questions, loading };
}