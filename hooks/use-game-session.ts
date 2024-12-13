'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { GameSession } from '@/lib/types';

interface UseGameSessionReturn {
  gameSession: GameSession | null;
  loading: boolean;
  error: Error | null;
}

export function useGameSession(gameId: string): UseGameSessionReturn {
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

    // Initial fetch
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

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId]);

  return { gameSession, loading, error };
}