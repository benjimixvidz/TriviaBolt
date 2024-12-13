'use client';

import { AuthForm } from '@/components/auth/auth-form';
import { Brain } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <Brain className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold">TriviaBolt</h1>
        <p className="text-muted-foreground mt-2">Challenge your friends in real-time trivia battles!</p>
      </div>
      <AuthForm />
    </div>
  );
}