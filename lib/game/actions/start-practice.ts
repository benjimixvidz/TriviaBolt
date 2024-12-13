import { createGameSession, deleteGameSession } from '../data';
import { generateQuestions } from '../questions';
import { updateGameStatus } from '../data';
import { GAME_STATES } from '@/lib/constants';
import type { GameActionResult } from '@/lib/types';

export async function startPracticeGame(): Promise<GameActionResult> {
  try {
    // Create a new game session
    const { data, error } = await createGameSession();
    if (error) {
      return {
        success: false,
        error: error.message
      };
    }

    const gameId = data.id;

    try {
      // Generate practice questions
      const categories = ['Science', 'History', 'Geography', 'Entertainment', 'Sports'];
      await Promise.all(
        categories.map(category => generateQuestions(gameId, category, 1))
      );

      // Start the game
      await updateGameStatus(gameId, GAME_STATES.IN_PROGRESS);

      return {
        success: true,
        data
      };
    } catch (error: any) {
      // If question generation fails, clean up the game session
      await deleteGameSession(gameId);
      throw error;
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to start practice game'
    };
  }
}