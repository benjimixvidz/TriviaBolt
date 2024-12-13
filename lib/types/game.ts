export interface GameSession {
  id: string;
  status: 'lobby' | 'in_progress' | 'ended';
  created_at: string;
}

export interface GameActionResult<T = any> {
  success: boolean;
  error?: string;
  data?: T;
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