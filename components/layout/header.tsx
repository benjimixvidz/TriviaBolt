'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { signOut } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

export function Header() {
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Brain className="w-8 h-8" />
          <span className="font-bold text-xl">TriviaBolt</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/auth">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}