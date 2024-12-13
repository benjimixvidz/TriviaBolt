import { useEffect, useState } from 'react';
import { supabase } from './client';
import type { User } from '@supabase/supabase-js';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}

export function useGameSession(gameId: string) {
  const [gameSession, setGameSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      const { data } = await supabase
        .from('game_sessions')
        .select('*')
        .eq('id', gameId)
        .single();
      setGameSession(data);
      setLoading(false);
    };

    fetchGame();

    const channel = supabase
      .channel(`game_${gameId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'game_sessions', filter: `id=eq.${gameId}` },
        fetchGame
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId]);

  return { gameSession, loading };
}