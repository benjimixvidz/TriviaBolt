'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { getPlayerScores } from '@/lib/game';
import { supabase } from '@/lib/supabase';
import type { PlayerScore } from '@/lib/types';

interface GameEndedProps {
  gameId: string;
}

export function GameEnded({ gameId }: GameEndedProps) {
  const [scores, setScores] = useState<PlayerScore[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchScores = async () => {
      const { data } = await getPlayerScores(gameId);
      setScores(data || []);
    };

    fetchScores();

    const channel = supabase
      .channel(`game_${gameId}_scores`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'player_scores', filter: `game_session_id=eq.${gameId}` },
        fetchScores
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId]);

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Game Over!</h1>
        <p className="text-muted-foreground">Final Scores</p>
      </div>

      <div className="space-y-4 mb-8">
        {scores.map((score, index) => (
          <div
            key={score.id}
            className="p-4 bg-secondary rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold">{index + 1}</span>
              <span>{score.profiles?.username}</span>
            </div>
            <span className="text-xl font-semibold">{score.score} pts</span>
          </div>
        ))}
      </div>

      <Button className="w-full" onClick={() => router.push('/')}>
        Back to Lobby
      </Button>
    </Card>
  );
}