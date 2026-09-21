import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    return new NextResponse(`WordPress authorization failed: ${error}`, {
      status: 400,
    });
  }

  if (!code) {
    return new NextResponse("No authorization code received.", {
      status: 400,
    });
  }

  return new NextResponse(
    `WordPress authorization successful. Code received.`,
    {
      status: 200,
    }
  );
}
