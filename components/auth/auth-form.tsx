'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { signIn, signUp } from '@/lib/auth';

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) throw error;

      toast({
        title: isSignUp ? 'Account created!' : 'Welcome back!',
        description: isSignUp ? 'Please check your email to verify your account.' : 'Successfully signed in.',
      });

      if (!isSignUp) router.push('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-center">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p className="text-muted-foreground text-center">
            {isSignUp ? 'Sign up to start playing' : 'Sign in to continue'}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>

        <div className="text-center">
          <Button
            type="button"
            variant="link"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </Button>
        </div>
      </form>
    </Card>
  );
}