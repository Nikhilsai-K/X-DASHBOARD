import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { fetchUserProfile } from "@/lib/twitter";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    console.log("Session in user API:", JSON.stringify(session, null, 2));

    if (!session || !session.accessToken || !session.userId) {
      console.log("Missing auth data:", {
        hasSession: !!session,
        hasAccessToken: !!session?.accessToken,
        hasUserId: !!session?.userId
      });
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await fetchUserProfile(
      session.accessToken,
      session.userId
    );

    return NextResponse.json(user);
  } catch (error: any) {
    console.error("Error in user API route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}
