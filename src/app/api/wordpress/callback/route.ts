import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    return new NextResponse(
      `WordPress authorization failed: ${error}`,
      { status: 400 }
    );
  }

  if (!code) {
    return new NextResponse(
      "No authorization code received.",
      { status: 400 }
    );
  }

  const clientId = process.env.WORDPRESS_CLIENT_ID;
  const clientSecret = process.env.WORDPRESS_CLIENT_SECRET;
  const redirectUri = process.env.WORDPRESS_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return new NextResponse(
      "WordPress OAuth environment variables are missing.",
      { status: 500 }
    );
  }

  const tokenResponse = await fetch(
    "https://public-api.wordpress.com/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    }
  );

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok || !tokenData.access_token) {
    console.error("WordPress token error:", tokenData);

    return new NextResponse(
      `Failed to obtain WordPress access token: ${
        tokenData.error || "Unknown error"
      }`,
      { status: 500 }
    );
  }

  const response = NextResponse.redirect(
    new URL("/admin/dashboard?wordpress=connected", request.url)
  );

  response.cookies.set(
    "wordpress_access_token",
    tokenData.access_token,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    }
  );

  return response;
}
