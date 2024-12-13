import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai/server';
import { supabase } from '@/lib/supabase/server';
import { validateServerEnv } from '@/lib/config/server-env';

export async function POST(request: Request) {
  try {
    // Validate server environment before proceeding
    validateServerEnv();

    const { gameId, category } = await request.json();

    if (!gameId || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const prompt = `Generate a trivia question about ${category} with one correct answer and three incorrect answers. Format as JSON: { "question": "...", "correct_answer": "...", "incorrect_answers": ["...", "...", "..."] }`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    });

    const generated = JSON.parse(completion.choices[0].message.content!);

    // Validate generated question format
    if (!generated.question || !generated.correct_answer || !Array.isArray(generated.incorrect_answers)) {
      throw new Error('Invalid question format received from OpenAI');
    }

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

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to store question');
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Question generation error:', error);
    
    // Handle specific error types
    if (error.message.includes('OPENAI_API_KEY')) {
      return NextResponse.json(
        { error: 'OpenAI API is not properly configured' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to generate question' },
      { status: 500 }
    );
  }
}