import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser({ name, linkedIn, dish, sessionId }) {
	return await prisma.user.create({
		data: {
			name,
			linkedIn,
			dish,
			sessionId,
		},
	});
}

export const createMatch = async (user1Id, user2Id, similarityScore) => {
	return await prisma.$transaction(async (tx) => {
		// Create match record
		const newMatch = await tx.match.create({
			data: {
				user1Id,
				user2Id,
				similarityScore: parseFloat(similarityScore),
			},
		});

		// Update both users atomically
		await tx.user.updateMany({
			where: {
				id: {
					in: [user1Id, user2Id],
				},
			},
			data: {
				matchRecordId: newMatch.id,
			},
		});

		return newMatch;
	});
};

export async function getUser(id) {
	return await prisma.user.findUnique({
		where: { id },
		include: {
			matches: {
				include: {
					users: true,
				},
			},
		},
	});
}

export async function getUsers(sessionId) {
	return await prisma.user.findMany({
		where: { sessionId },
		include: {
			matches: true,
		},
	});
}

export async function getUnmatchedUsers(sessionId) {
	return await prisma.user.findMany({
		where: {
			sessionId,
			matchRecordId: null,
		},
	});
}

export const findUnmatchedUsers = async (
	similarUsers,
	newUserId,
	sessionId
) => {
	return await prisma.user.findMany({
		where: {
			id: {
				in: similarUsers
					.filter(
						(match) =>
							match.metadata?.userId &&
							match.metadata.userId !== newUserId
					)
					.map((match) => match.metadata.userId)
					.filter(Boolean),
			},
			matchRecordId: null,
			sessionId,
		},
	});
};

export async function updateUserMatchId(userId, matchId) {
	return await prisma.user.update({
		where: { id: userId },
		data: { matchId },
	});
}
