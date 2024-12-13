'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { createGameSession } from '@/lib/game/actions/create-game';
import { deleteGameSession } from '@/lib/game/actions/delete-game';
import { startPracticeGame } from '@/lib/game/actions/start-practice';
import { getGameSessions } from '@/lib/game/data';
import type { GameSession } from '@/lib/types';

export function useGameActions(updateSessions?: (sessions: GameSession[]) => void) {
  const router = useRouter();
  const { toast } = useToast();

  const handleCreateGame = async () => {
    const result = await createGameSession();
    
    if (!result.success) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
      return;
    }

    router.push(`/game/${result.data.id}`);
    toast({
      title: "Success",
      description: "Game session created successfully",
    });
  };

  const handlePracticeGame = async () => {
    const result = await startPracticeGame();
    
    if (!result.success) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
      return;
    }

    router.push(`/game/${result.data.id}`);
    toast({
      title: "Practice Mode",
      description: "Starting practice game...",
    });
  };

  const handleDeleteGame = async (gameId: string) => {
    const result = await deleteGameSession(gameId);
    
    if (!result.success) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
      return;
    }

    if (updateSessions) {
      const { data } = await getGameSessions();
      updateSessions(data || []);
    }

    toast({
      title: "Success",
      description: "Game session deleted successfully",
    });
  };

  const handleJoinGame = (gameId: string) => {
    router.push(`/game/${gameId}`);
  };

  return {
    handleCreateGame,
    handleDeleteGame,
    handleJoinGame,
    handlePracticeGame,
  };
}