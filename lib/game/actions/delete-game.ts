import { deleteGameSession as deleteSession } from '@/lib/game/data';
import type { GameActionResult } from '@/lib/types';

export async function deleteGameSession(gameId: string): Promise<GameActionResult> {
  try {
    const { error } = await deleteSession(gameId);
    
    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to delete game session',
    };
  }
}