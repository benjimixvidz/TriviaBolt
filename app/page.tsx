'use client';

import { useGameSessions } from '@/hooks/use-game-sessions';
import { useGameActions } from '@/hooks/use-game-actions';
import { Header } from '@/components/home/header';
import { GameGrid } from '@/components/home/game-grid';

export default function Home() {
  const { sessions, loading, updateSessions } = useGameSessions();
  const { handleCreateGame, handleDeleteGame, handleJoinGame, handlePracticeGame } = useGameActions(updateSessions);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading games...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Header 
        onCreate={handleCreateGame}
        onPractice={handlePracticeGame}
      />
      <GameGrid
        sessions={sessions}
        onDelete={handleDeleteGame}
        onJoin={handleJoinGame}
        onCreate={handleCreateGame}
      />
    </div>
  );
}