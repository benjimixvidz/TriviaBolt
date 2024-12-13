'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { GameSession } from '@/lib/types';

interface GameCardProps {
  session: GameSession;
  onDelete: (id: string) => Promise<void>;
  onJoin: (id: string) => void;
}

export function GameCard({ session, onDelete, onJoin }: GameCardProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">Game #{session.id.slice(0, 8)}</h2>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Game Session</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this game session? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(session.id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Status: <span className="capitalize">{session.status}</span>
      </p>
      <Button
        className="w-full"
        onClick={() => onJoin(session.id)}
      >
        Join Game
      </Button>
    </Card>
  );
}