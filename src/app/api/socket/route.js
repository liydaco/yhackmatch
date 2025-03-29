import { WebSocketServer } from "ws";
import { createUser, getUser } from "@/utils/db";

// Initialize WebSocket server (you might want to move this to a separate file)
const wss = new WebSocketServer({ noServer: true });

export async function GET(request) {
  // Upgrade HTTP connection to WebSocket
  if (request.headers.get("upgrade") !== "websocket") {
    return new Response("Expected websocket", { status: 426 });
  }

  const { socket, response } = await request.body;

  wss.handleUpgrade(request, socket, Buffer.alloc(0), async (ws) => {
    try {
      // Get user details from query params
      const { searchParams } = new URL(request.url);
      const name = searchParams.get("name");
      const linkedIn = searchParams.get("linkedIn");
      const dish = searchParams.get("dish");
      const session = searchParams.get("session");

      // Validate required parameters
      if (!name || !linkedIn || !dish || !session) {
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Missing required parameters",
          })
        );
        ws.close();
        return;
      }

      // Send initial status
      ws.send(
        JSON.stringify({
          type: "status",
          message: "Generating dish embeddings...",
        })
      );

      // TODO: Generate dish embeddings here
      // For now, we'll skip this step

      // Create user in database
      ws.send(
        JSON.stringify({
          type: "status",
          message: "Saving user details...",
        })
      );

      const user = await createUser({
        name,
        linkedIn,
        dish,
        session,
      });

      ws.send(
        JSON.stringify({
          type: "status",
          message: "Waiting for match...",
        })
      );

      // Start polling for matches
      const checkMatch = async () => {
        const updatedUser = await getUser(user.id);

        if (updatedUser.matches.length > 0) {
          // User has been matched
          const match = updatedUser.matches[0];
          const matchedWith = match.users.find((u) => u.id !== user.id);

          ws.send(
            JSON.stringify({
              type: "matched",
              data: {
                matchId: match.id,
                partner: {
                  name: matchedWith.name,
                  linkedIn: matchedWith.linkedIn,
                  dish: matchedWith.dish,
                },
              },
            })
          );

          ws.close();
          return;
        }

        // Continue polling every 3 seconds
        setTimeout(checkMatch, 3000);
      };

      checkMatch();

      // Handle client disconnect
      ws.on("close", () => {
        // Clean up any resources if needed
      });
    } catch (error) {
      console.error("WebSocket error:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          message: "An error occurred",
        })
      );
      ws.close();
    }
  });

  return response;
}
