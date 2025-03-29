import { saveDishEmbeddings } from "./pinecone";
import prisma from "./prisma";

export async function createUser({ name, linkedin, dish, sessionId }) {
	return await prisma.user.create({
		data: {
			name,
			linkedin,
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

export const saveUser = async (
	name,
	dish,
	linkedin,
	embedding,
	sessionId
) => {
	try {
		// Create new user in Prisma
		const newUser = await createUser(name, linkedin, dish, embedding, sessionId);

		// Save to Pinecone using reusable method
		await saveDishEmbeddings(newUser, embedding, sessionId);

		return newUser;
	} catch (error) {
		console.error("Error in saveUser:", error);
		throw error;
	}
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
  const users = await prisma.user.findMany({
    where: {
      sessionId: sessionId,
    },
    // orderBy: {
    //   timestamp: 'desc',
    // },
    include: {
      user1Matches: {
        include: {
          user2: {
            select: {
              name: true,
              dish: true,
              linkedin: true,
            },
          },
        },
      },
      user2Matches: {
        include: {
          user1: {
            select: {
              name: true,
              dish: true,
              linkedin: true,
            },
          },
        },
      },
    },
  });

  const transformedUsers = users.map(user => {
    const matchAsUser1 = user.user1Matches[0];
    const matchAsUser2 = user.user2Matches[0];
    const matchedUser = matchAsUser1?.user2 || matchAsUser2?.user1;

    return {
      id: user.id,
      name: user.name,
      dish: user.dish,
      linkedin: user.linkedin,
      matchedUser: matchedUser ? {
        name: matchedUser.name,
        dish: matchedUser.dish,
        linkedin: matchedUser.linkedin,
        similarity: matchAsUser1?.similarityScore || matchAsUser2?.similarityScore,
      } : null,
    };
  });

  return transformedUsers;
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
