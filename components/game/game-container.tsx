'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameLobby } from './game-lobby';
import { GameInProgress } from './game-in-progress';
import { GameEnded } from './game-ended';
import { GameLoading } from './game-loading';
import { useGameSession } from '@/hooks/use-game-session';
import { GAME_STATES } from '@/lib/constants';
import type { GameSession } from '@/lib/types';

interface GameContainerProps {
  gameId: string;
}

export function GameContainer({ gameId }: GameContainerProps) {
  const router = useRouter();
  const { gameSession, loading, error } = useGameSession(gameId);

  // Handle loading state
  if (loading) {
    return <GameLoading />;
  }

  // Handle error state
  if (error) {
    router.push('/404');
    return null;
  }

  // Handle non-existent game
  if (!gameSession) {
    router.push('/404');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {gameSession.status === GAME_STATES.LOBBY && (
        <GameLobby gameId={gameSession.id} />
      )}
      {gameSession.status === GAME_STATES.IN_PROGRESS && (
        <GameInProgress gameId={gameSession.id} />
      )}
      {gameSession.status === GAME_STATES.ENDED && (
        <GameEnded gameId={gameSession.id} />
      )}
    </div>
  );
}