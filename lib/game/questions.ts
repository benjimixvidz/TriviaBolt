import { supabase } from '@/lib/supabase/client';
import { openai } from '@/lib/openai/client';
import type { Question } from '@/lib/types';

export async function generateQuestions(gameId: string, category: string, count: number = 1) {
  try {
    const questions: Question[] = [];
    
    for (let i = 0; i < count; i++) {
      const prompt = `Generate a trivia question about ${category} with one correct answer and three incorrect answers. Format as JSON: { "question": "...", "correct_answer": "...", "incorrect_answers": ["...", "...", "..."] }`;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
      });

      const generated = JSON.parse(completion.choices[0].message.content!);

      const { data, error } = await supabase
        .from('questions')
        .insert([{
          game_session_id: gameId,
          category,
          question_text: generated.question,
          correct_answer: generated.correct_answer,
          incorrect_answers: generated.incorrect_answers,
        }])
        .select()
        .single();

      if (error) throw error;
      questions.push(data);
    }

    return questions;
  } catch (error) {
    console.error('Failed to generate questions:', error);
    throw error;
  }
}