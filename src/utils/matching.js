import { querySimilarDishes } from "./pinecone";
import { findUnmatchedUsers, createMatch } from "./db";

export const findMatch = async (user, sessionId) => {
	try {
		// skip if user has already matched
		if (user.matchRecordId) {
			const matchesAsUser1 = user.user1Matches;
			const matchesAsUser2 = user.user2Matches;

			let matchData;
			if (matchesAsUser1 && matchesAsUser1.user2) {
				matchData = matchesAsUser1.user2;
			} else if (matchesAsUser2 && matchesAsUser2.user1) {
				matchData = matchesAsUser2.user1;
			}

			if (matchData) {
				return {
					matched: true,
					match: {
						name: matchData.name,
						dish: matchData.dish,
						linkedin: matchData.linkedin,
						similarity: user.similarityScore,
					},
				};
			}
		}

		// Find similar users using reusable method (pass sessionId for filtering)
		const similarUsers = await querySimilarDishes(
			JSON.parse(user.embedding),
			50,
			sessionId
		);

		// Get unmatched users from Prisma (within the same session)
		const unmatchedUsers = await findUnmatchedUsers(
			similarUsers,
			user.id,
			sessionId
		);

		// Find best match
		const bestMatch = similarUsers
			.filter(
				(match) =>
					match.metadata?.userId &&
					unmatchedUsers.some(
						(user) => user.id === match.metadata.userId
					)
			)
			.sort(
				(a, b) => parseFloat(b.similarity) - parseFloat(a.similarity)
			)[0];

		if (bestMatch) {
			// Create match in database
			await createMatch(
				user.id,
				bestMatch.metadata.userId,
				bestMatch.similarity
			);

			return {
				matched: true,
				match: {
					name: bestMatch.metadata.name,
					dish: bestMatch.metadata.dish,
					similarity: bestMatch.similarity,
				},
			};
		}

		return {
			matched: false,
			message: "Waiting for a match...",
		};
	} catch (error) {
		console.error("Error in findMatch:", error);
		throw error;
	}
};
