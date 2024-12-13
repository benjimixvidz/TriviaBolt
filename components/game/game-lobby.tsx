'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { updateGameStatus, getPlayerScores } from '@/lib/game';
import { supabase } from '@/lib/supabase';
import type { PlayerScore } from '@/lib/types';
import { GAME_STATES } from '@/lib/constants';

interface GameLobbyProps {
  gameId: string;
}

export function GameLobby({ gameId }: GameLobbyProps) {
  const [players, setPlayers] = useState<PlayerScore[]>([]);
  const [isHost, setIsHost] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await getPlayerScores(gameId);
      setPlayers(data || []);
    };

    fetchPlayers();

    const channel = supabase
      .channel(`game_${gameId}_players`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'player_scores', filter: `game_session_id=eq.${gameId}` },
        fetchPlayers
      )
      .subscribe();

    // Check if current user is host (first player)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && players.length > 0) {
        setIsHost(players[0].player_id === session.user.id);
      }
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId, players.length]);

  const startGame = async () => {
    await updateGameStatus(gameId, GAME_STATES.IN_PROGRESS);
  };

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Game Lobby</h1>
        <p className="text-muted-foreground">Waiting for players to join...</p>
      </div>

      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold">Players ({players.length})</h2>
        <div className="space-y-2">
          {players.map((player) => (
            <div
              key={player.id}
              className="p-4 bg-secondary rounded-lg flex items-center justify-between"
            >
              <span>{player.profiles?.username}</span>
              {player.player_id === players[0]?.player_id && (
                <span className="text-sm text-muted-foreground">Host</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {isHost && (
        <Button
          className="w-full"
          onClick={startGame}
          disabled={players.length < 1}
        >
          Start Game
        </Button>
      )}
    </Card>
  );
}