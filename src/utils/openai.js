'use server'

import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates embeddings for the given text using OpenAI's text-embedding-ada-002 model
 * @param {string} text - The input text to generate embeddings for
 * @returns {Promise<number[]>} A promise that resolves to an array of embedding values
 * @throws {Error} If the API call fails or returns invalid data
 */
export async function generateEmbeddings(text) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text.trim(),
    });

    // The API returns an array of embeddings, but we only sent one text input
    // so we can safely take the first embedding
    const embedding = response.data[0].embedding;
    return embedding;
  } catch (error) {
    console.error('Error generating embeddings:', error);
    throw new Error('Failed to generate embeddings: ' + error.message);
  }
} 