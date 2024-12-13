export const GAME_STATES = {
  LOBBY: 'lobby',
  IN_PROGRESS: 'in_progress',
  ENDED: 'ended',
} as const;

export const QUESTIONS_PER_GAME = 5;
export const ANSWER_TIME_LIMIT = 30; // seconds
export const POINTS_PER_CORRECT_ANSWER = 100;
export const POINTS_TIME_BONUS = 10; // points per second remaining