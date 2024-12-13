/**
 * Application-wide constants
 */
export const APP_CONSTANTS = {
  GAME: {
    QUESTIONS_PER_GAME: 5,
    ANSWER_TIME_LIMIT: 30, // seconds
    POINTS_PER_CORRECT_ANSWER: 100,
    POINTS_TIME_BONUS: 10, // points per second remaining
  },
  STATES: {
    LOBBY: 'lobby',
    IN_PROGRESS: 'in_progress',
    ENDED: 'ended',
  } as const,
} as const;