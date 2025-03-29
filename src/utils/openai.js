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

const MENU_GENERATION_PROMPT = `Create a detailed and elegant menu description for a fine dining experience based on the following two dishes. Include:
1. A creative menu title
2. Each dish's name styled elegantly
3. Detailed description including:
   - Key ingredients
   - Cooking methods
   - Flavor profile
   - Plating description
4. Suggested wine pairing for each dish
5. Price in GBP (£)

Format the response in a structured way that's easy to read.

Dishes to include:`;

/**
 * Generates an elegant menu description from two dishes using GPT-4
 * @param {string} dish1 - The first dish
 * @param {string} dish2 - The second dish
 * @returns {Promise<string>} A promise that resolves to the generated menu text
 * @throws {Error} If the API call fails or returns invalid data
 */
export async function generateMenu(dish1, dish2) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert fine dining chef and sommelier crafting elegant menu descriptions."
        },
        {
          role: "user",
          content: `${MENU_GENERATION_PROMPT}\n1. ${dish1}\n2. ${dish2}`
        }
      ],
      temperature: 0.7,
      // max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating menu:', error);
    throw new Error('Failed to generate menu: ' + error.message);
  }
} 