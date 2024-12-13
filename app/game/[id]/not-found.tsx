import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function GameNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Game Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The game you're looking for doesn't exist or has ended.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}