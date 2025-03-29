import prisma from "@/utils/prisma";
import { findMatch } from "@/utils/matching";
import { SESSION_ID } from "@/constants/session";

const delay = (s) => new Promise((resolve) => setTimeout(resolve, s * 1000));

const getUnmatchedUsers = async (sessionId, umatched = true) => await prisma.user.findMany({
  where: {
    sessionId: sessionId,
    matchedWith: umatched ? null : undefined
  },
  include: {
    matchesAsUser1: {
      include: {
        user2: {
          select: {
            id: true,
            name: true,
            dish: true,
          },
        },
      },
    },
    matchesAsUser2: {
      include: {
        user1: {
          select: {
            id: true,
            name: true,
            dish: true,
          },
        },
      },
    },
  },
});

export const POST = async (request) => {
	const encoder = new TextEncoder();
	const { sessionId } = await request.json() || SESSION_ID;

	if (!sessionId) {
		return new Response(
			JSON.stringify({ error: "Session ID is required" }),
			{
				status: 400,
				headers: { "Content-Type": "application/json" },
			}
		);
	}

	const stream = new ReadableStream({
		async start(controller) {
			const sendMessage = (message, status = "progress") => {
				controller.enqueue(
					encoder.encode(JSON.stringify({ message, status }) + "\n")
				);
			};

			try {
				// Initial check for unmatched users
				let unmatchedUsers = await getUnmatchedUsers(sessionId, true);

				if (unmatchedUsers.length === 0) {
					sendMessage(
						`No unmatched users found in session ${sessionId}`,
						"info"
					);
					controller.close();
					return;
				}

				sendMessage(
					`Found ${unmatchedUsers.length} unmatched users in session ${sessionId}`,
					"info"
				);

				// Process each unmatched user
				while (unmatchedUsers.length > 0) {
					const user = unmatchedUsers[0]; // Take the first unmatched user
					try {
						const matchRes = await findMatch(user, sessionId);

						if (matchRes.matched) {
							sendMessage(
								`Matched ${user.name} with ${matchRes.match.name} (${matchRes.match.similarity}% similarity)`,
								"success"
							);
						} else {
							sendMessage(
								`Could not find a match for ${user.name}`,
								"info"
							);
						}

						// Refresh the list of unmatched users
						unmatchedUsers = await getUnmatchedUsers(sessionId, true);

            if (unmatchedUsers.length === 1) {
              unmatchedUsers = await getUnmatchedUsers(sessionId, false);
            }

					} catch (error) {
						sendMessage(
							`Error processing user ${user.name}: ${error.message}`,
							"error"
						);
						// Remove the failed user from the list to prevent infinite loop
						unmatchedUsers = unmatchedUsers.filter(u => u.id !== user.id);
					}
				}

				sendMessage("Matching session completed", "success");
				await delay(1);
				sendMessage("Matching session completed", "error");
			} catch (error) {
				console.error("Session matching error:", error);
				sendMessage(`Error: ${error.message}`, "error");
			} finally {
				controller.close();
			}
		},
	});

	return new Response(stream, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive",
		},
	});
};
