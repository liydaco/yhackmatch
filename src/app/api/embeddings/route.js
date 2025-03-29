import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text.trim(),
    });

    const embedding = response.data[0].embedding;
    return NextResponse.json({ embedding });
    
  } catch (error) {
    console.error('Error generating embeddings:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 