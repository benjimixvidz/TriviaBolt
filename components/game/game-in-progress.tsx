'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getGameQuestions, updatePlayerScore, updateGameStatus } from '@/lib/game';
import { supabase } from '@/lib/supabase';
import type { Question } from '@/lib/types';
import { ANSWER_TIME_LIMIT, POINTS_PER_CORRECT_ANSWER, POINTS_TIME_BONUS, GAME_STATES } from '@/lib/constants';

interface GameInProgressProps {
  gameId: string;
}

export function GameInProgress({ gameId }: GameInProgressProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ANSWER_TIME_LIMIT);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await getGameQuestions(gameId);
      setQuestions(data || []);
    };

    fetchQuestions();
  }, [gameId]);

  useEffect(() => {
    if (!selectedAnswer && questions.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAnswer(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [selectedAnswer, questions]);

  const handleAnswer = async (answer: string | null) => {
    if (!questions[currentQuestionIndex]) return;

    const correct = answer === questions[currentQuestionIndex].correct_answer;
    const timeBonus = timeLeft * POINTS_TIME_BONUS;
    const questionScore = correct ? POINTS_PER_CORRECT_ANSWER + timeBonus : 0;

    setScore((prev) => prev + questionScore);
    setSelectedAnswer(answer);

    const { data: session } = await supabase.auth.getSession();
    if (session?.session?.user) {
      await updatePlayerScore(gameId, session.session.user.id, score + questionScore);
    }

    if (currentQuestionIndex === questions.length - 1) {
      await updateGameStatus(gameId, GAME_STATES.ENDED);
    } else {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(ANSWER_TIME_LIMIT);
      }, 2000);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-center">Loading questions...</div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const allAnswers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ].sort(() => Math.random() - 0.5);

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <Progress value={(timeLeft / ANSWER_TIME_LIMIT) * 100} />
        <p className="text-right text-sm text-muted-foreground mt-2">
          {timeLeft}s remaining
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <h2 className="text-2xl font-bold">{currentQuestion.question_text}</h2>
        </div>

        <div className="grid gap-4">
          {allAnswers.map((answer) => (
            <Button
              key={answer}
              onClick={() => handleAnswer(answer)}
              disabled={selectedAnswer !== null}
              variant={
                selectedAnswer === null
                  ? 'outline'
                  : answer === currentQuestion.correct_answer
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

        <div className="text-right">
          <p className="text-lg font-bold">Score: {score}</p>
        </div>
      </div>
    </Card>
  );
}