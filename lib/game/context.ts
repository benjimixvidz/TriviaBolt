'use client';

import { createContext, useContext, useState } from 'react';
import type { GameState, GameContextType } from './types';

const initialGameState: GameState = {
  currentQuestionIndex: 0,
  score: 0,
  timeLeft: 30,
  selectedAnswer: null,
};

export const GameContext = createContext<GameContextType | null>(null);

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}

export function GameProvider({ children, gameId }: { children: React.ReactNode; gameId: string }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const updateGameState = (newState: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...newState }));
  };

  return (
    <GameContext.Provider value={{ gameId, gameState, updateGameState }}>
      {children}
    </GameContext.Provider>
  );
}