import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    return NextResponse.json({
      authenticated: !!session,
      hasAccessToken: !!session?.accessToken,
      hasUserId: !!session?.userId,
      userId: session?.userId || null,
      // Don't expose the actual token for security
      tokenPreview: session?.accessToken ? `${session.accessToken.substring(0, 10)}...` : null,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
