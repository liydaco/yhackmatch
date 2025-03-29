import { initIndex } from '@/util/pinecone';

export async function GET() {
  try {
    await initIndex();
    return new Response(JSON.stringify({ message: 'Pinecone index initialized successfully' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 