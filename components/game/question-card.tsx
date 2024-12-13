'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { shuffleAnswers, calculateScore } from '@/lib/game/utils';
import type { Question } from '@/lib/supabase/types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (score: number) => void;
  timeLimit: number;
}

export function QuestionCard({ question, onAnswer, timeLimit }: QuestionCardProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers] = useState(() => shuffleAnswers(question));

  useEffect(() => {
    if (!selectedAnswer && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onAnswer(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [selectedAnswer, timeLeft, onAnswer]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    const score = calculateScore(
      timeLeft,
      answer === question.correct_answer
    );
    onAnswer(score);
  };

  return (
    <Card className="p-8">
      <div className="mb-6">
        <Progress value={(timeLeft / timeLimit) * 100} />
        <p className="text-right text-sm text-muted-foreground mt-2">
          {timeLeft}s remaining
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{question.question_text}</h2>

        <div className="grid gap-4">
          {answers.map((answer) => (
            <Button
              key={answer}
              onClick={() => handleAnswer(answer)}
              disabled={selectedAnswer !== null}
              variant={
                selectedAnswer === null
                  ? 'outline'
                  : answer === question.correct_answer
                  ? 'default'
                  : selectedAnswer === answer
                  ? 'destructive'
                  : 'outline'
              }
              className="p-6 h-auto text-left"
            >
              {answer}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}