import { NextResponse } from "next/server";
import { getUsers } from "@/utils/db";

export async function GET(request) {
  try {
    // Get the session from the URL query parameter
    const { searchParams } = new URL(request.url);
    const session = searchParams.get("session");

    if (!session) {
      return NextResponse.json(
        { error: "Session parameter is required" },
        { status: 400 }
      );
    }

    // Get all users and filter by session
    const allUsers = await getUsers();
    const sessionUsers = allUsers.filter((user) => user.session === session);

    // Format the response with relevant user information
    return NextResponse.json({
      total: sessionUsers.length,
      users: sessionUsers.map((user) => ({
        id: user.id,
        name: user.name,
        linkedIn: user.linkedIn,
        dish: user.dish,
        createdAt: user.createdAt,
        isMatched: user.matches.length > 0,
        matchDetails: user.matches,
      })),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
