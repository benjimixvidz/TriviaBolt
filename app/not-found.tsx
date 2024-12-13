import { Link } from '@/components/ui/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Game Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The game you're looking for doesn't exist or has ended.
      </p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}