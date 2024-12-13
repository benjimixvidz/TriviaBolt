import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai/server';

export async function POST(request: Request) {
  try {
    const { category } = await request.json();

    if (!category) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      );
    }

    const prompt = `Generate a trivia question about ${category} with one correct answer and three incorrect answers. Format as JSON: { "question": "...", "correct_answer": "...", "incorrect_answers": ["...", "...", "..."] }`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    });

    const question = JSON.parse(completion.choices[0].message.content!);
    return NextResponse.json(question);
  } catch (error: any) {
    console.error('Failed to generate question:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate question' },
      { status: 500 }
    );
  }
}