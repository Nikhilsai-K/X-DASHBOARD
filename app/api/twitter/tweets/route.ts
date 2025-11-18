import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { fetchUserTweets } from "@/lib/twitter";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    console.log("Session data:", {
      hasSession: !!session,
      hasAccessToken: !!session?.accessToken,
      hasUserId: !!session?.userId,
      userId: session?.userId,
    });

    if (!session || !session.accessToken || !session.userId) {
      return NextResponse.json(
        { error: "Unauthorized - No valid session" },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const maxResults = parseInt(searchParams.get("max_results") || "100");

    const data = await fetchUserTweets(
      session.accessToken,
      session.userId,
      maxResults
    );

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in tweets API route:", error);
    console.error("Error details:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message || "Failed to fetch tweets", details: error.toString() },
      { status: 500 }
    );
  }
}
