import type { Question } from './types';

/**
 * Shuffles an array of answers using Fisher-Yates algorithm
 */
export function shuffleAnswers(question: Question): string[] {
  const allAnswers = [question.correct_answer, ...question.incorrect_answers];
  
  for (let i = allAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
  }
  
  return allAnswers;
}

/**
 * Calculates score based on time remaining and correctness
 */
export function calculateScore(timeLeft: number, isCorrect: boolean): number {
  if (!isCorrect) return 0;
  
  const BASE_SCORE = 100;
  const TIME_BONUS = Math.floor(timeLeft * 10);
  
  return BASE_SCORE + TIME_BONUS;
}

/**
 * Validates if a game can be started
 */
export function canStartGame(playerCount: number): boolean {
  const MIN_PLAYERS = 1;
  return playerCount >= MIN_PLAYERS;
}