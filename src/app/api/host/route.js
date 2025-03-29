import { NextResponse } from "next/server";
import { getUsers } from "@/utils/db";
import { SESSION_ID } from "@/constants/session";

export async function GET(request) {
  try {
    // Get the session from the URL query parameter
    const { searchParams } = new URL(request.url);
    const session = searchParams.get("session") || SESSION_ID;

    if (!session) {
      return NextResponse.json(
        { error: "Session parameter is required" },
        { status: 400 }
      );
    }

    // Get all users and filter by session
    const allUsers = await getUsers(session);

    return new Response(JSON.stringify({ users: allUsers }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
