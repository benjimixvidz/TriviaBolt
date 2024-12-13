import type { Database } from '../supabase/types';

// Game states
export type GameStatus = 'lobby' | 'in_progress' | 'ended';

// Core game types
export interface GameSession {
  id: string;
  status: GameStatus;
  created_at: string;
}

export interface Question {
  id: string;
  game_session_id: string;
  category: string;
  question_text: string;
  correct_answer: string;
  incorrect_answers: string[];
  created_at: string;
}

export interface PlayerScore {
  id: string;
  game_session_id: string;
  player_id: string;
  score: number;
  profiles?: {
    username: string;
  };
}

// Game state management
export interface GameState {
  currentQuestionIndex: number;
  score: number;
  timeLeft: number;
  selectedAnswer: string | null;
}

export interface GameContextType {
  gameId: string;
  gameState: GameState;
  updateGameState: (state: Partial<GameState>) => void;
}