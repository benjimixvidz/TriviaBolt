'use client';

import { Button } from '@/components/ui/button';
import { Brain, BookOpen } from 'lucide-react';

interface HeaderProps {
  onCreate: () => Promise<void>;
  onPractice: () => Promise<void>;
}

export function Header({ onCreate, onPractice }: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <Brain className="w-10 h-10" />
          TriviaBolt
        </h1>
        <p className="text-muted-foreground mt-2">
          Challenge your friends in real-time trivia battles!
        </p>
      </div>
      <div className="space-x-4">
        <Button variant="outline" onClick={onPractice}>
          <BookOpen className="w-4 h-4 mr-2" />
          Practice Mode
        </Button>
        <Button onClick={onCreate}>Create New Game</Button>
      </div>
    </div>
  );
}