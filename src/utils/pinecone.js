import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
	apiKey: process.env.PINECONE_API_KEY,
});

const INDEX_NAME = process.env.PINECONE_INDEX;

// Initialize index (you should run this once when setting up your application)
export const initIndex = async () => {
	try {
		const indexes = await pinecone.listIndexes();
		const indexExists = indexes.indexes?.some(
			(index) => index.name === INDEX_NAME
		);

		if (!indexExists) {
			await pinecone.createIndex({
				name: INDEX_NAME,
				dimension: 1536, // dimension for text-embedding-ada-002
				metric: "cosine",
				spec: {
					serverless: {
						cloud: "aws",
						region: "us-east-1",
					},
				},
			});
			console.log("Index created successfully");
		} else {
			console.log("Index already exists");
		}
	} catch (error) {
		console.error("Error initializing Pinecone index:", error);
		throw error;
	}
};

// Save dish embeddings
export const saveDishEmbeddings = async (user, embedding, sessionId) => {
	try {
		const index = pinecone.index(INDEX_NAME);
        const {id, name, dish} = user;

		// Log the request for debugging
		console.log("Embedding data:", {
			dimension: embedding.data[0].embedding.length,
			sampleValues: embedding.data[0].embedding.slice(0, 3),
		});

		// New format for Pinecone upsert
		await index.upsert([
			{
				id: id,
				values: embedding.data[0].embedding,
				metadata: {
					userId: id,
					sessionId,
					name,
					dish,
				},
			},
		]);

		return true;
	} catch (error) {
		console.error("Error saving embeddings to Pinecone:", error);
		throw error;
	}
};

// Query similar dishes from the same session
export const querySimilarDishes = async (embedding, limit = 10, sessionId) => {
	try {
		const index = pinecone.index(INDEX_NAME);

		const queryRequest = {
			vector: embedding,
			topK: limit,
			includeMetadata: true,
			includeValues: false, // We don't need the actual vectors
			filter: {
				sessionId: { $eq: sessionId }, // Only get matches from the same session
			},
		};

		const queryResponse = await index.query(queryRequest);
		const matches = queryResponse.matches.map((match) => ({
			metadata: match.metadata,
			similarity: (match.score * 100).toFixed(2), // Convert score to percentage
		}));

		console.log("Matches:", matches);

		return matches;
	} catch (error) {
		console.error("Error querying Pinecone:", error);
		throw error;
	}
};
