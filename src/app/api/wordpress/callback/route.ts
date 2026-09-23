import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.WORDPRESS_CLIENT_ID!;
const CLIENT_SECRET = process.env.WORDPRESS_CLIENT_SECRET!;
const REDIRECT_URI = process.env.WORDPRESS_REDIRECT_URI!;

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

  try {
    const tokenResponse = await fetch(
      "https://public-api.wordpress.com/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "authorization_code",
          code,
          redirect_uri: REDIRECT_URI,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("WordPress token error:", tokenData);

      return new NextResponse(
        "Failed to obtain WordPress access token.",
        { status: 500 }
      );
    }

    const response = NextResponse.redirect(
      new URL("/admin/dashboard", request.url)
    );

    response.cookies.set(
      "wordpress_access_token",
      tokenData.access_token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: tokenData.expires_in || 86400,
      }
    );

    return response;
  } catch (error) {
    console.error(error);

    return new NextResponse(
      "WordPress OAuth connection failed.",
      { status: 500 }
    );
  }
}
