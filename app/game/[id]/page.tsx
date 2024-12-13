import { Suspense } from 'react';
import { GameContainer } from '@/components/game/game-container';
import { GameLoading } from '@/components/game/game-loading';
import { getGameSessions } from '@/lib/game/data';
import { notFound } from 'next/navigation';

interface GamePageProps {
  params: { id: string };
}

export default function GamePage({ params }: GamePageProps) {
  return (
    <Suspense fallback={<GameLoading />}>
      <GameContainer gameId={params.id} />
    </Suspense>
  );
}

// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  try {
    const { data: sessions } = await getGameSessions();
    
    // Return all existing game IDs for static generation
    return sessions?.map((session) => ({
      id: session.id,
    })) || [];
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

// Allow dynamic paths not returned by generateStaticParams
export const dynamicParams = true;