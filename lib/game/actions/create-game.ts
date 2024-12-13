import { createGameSession as createSession } from '@/lib/game/data';
import type { GameActionResult } from '@/lib/types';

export async function createGameSession(): Promise<GameActionResult> {
  try {
    const { data, error } = await createSession();
    
    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to create game session',
    };
  }
}