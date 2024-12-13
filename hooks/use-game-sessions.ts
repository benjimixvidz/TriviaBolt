'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { getGameSessions } from '@/lib/game/data';
import type { GameSession } from '@/lib/types';

export function useGameSessions() {
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      const { data } = await getGameSessions();
      setSessions(data || []);
      setLoading(false);
    };

    fetchSessions();

    const channel = supabase
      .channel('game_sessions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'game_sessions' },
        fetchSessions
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateSessions = (newSessions: GameSession[]) => {
    setSessions(newSessions);
  };

  return {
    sessions,
    loading,
    updateSessions,
  };
}