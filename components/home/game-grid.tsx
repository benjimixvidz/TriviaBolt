'use client';

import { GameCard } from './game-card';
import { Button } from '@/components/ui/button';
import type { GameSession } from '@/lib/types';

interface GameGridProps {
  sessions: GameSession[];
  onDelete: (id: string) => Promise<void>;
  onJoin: (id: string) => void;
  onCreate: () => Promise<void>;
}

export function GameGrid({ sessions, onDelete, onJoin, onCreate }: GameGridProps) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No active game sessions.</p>
        <Button onClick={onCreate} className="mt-4">
          Create Your First Game
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sessions.map((session) => (
        <GameCard
          key={session.id}
          session={session}
          onDelete={onDelete}
          onJoin={onJoin}
        />
      ))}
    </div>
  );
}