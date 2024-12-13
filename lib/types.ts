export interface Profile {
  id: string;
  username: string;
  created_at: string;
}

export interface GameSession {
  id: string;
  status: 'lobby' | 'in_progress' | 'ended';
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

export interface GameActionResult {
  success: boolean;
  data?: any;
  error?: string;
}