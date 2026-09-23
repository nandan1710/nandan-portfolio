import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    return NextResponse.json(
      {
        error: `WordPress authorization failed: ${error}`,
      },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json(
      {
        error: "No authorization code received.",
      },
      { status: 400 }
    );
  }

  const clientId = process.env.WORDPRESS_CLIENT_ID;
  const clientSecret = process.env.WORDPRESS_CLIENT_SECRET;
  const redirectUri = process.env.WORDPRESS_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      {
        error: "WordPress OAuth environment variables are missing.",
      },
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

  if (!tokenResponse.ok) {
    console.error("WordPress token error:", tokenData);

    return NextResponse.json(
      {
        error: "Failed to exchange authorization code.",
        details: tokenData,
      },
      { status: 500 }
    );
  }

  /*
   * TEMPORARY TEST
   *
   * Do NOT display the actual token.
   */
  console.log("WordPress OAuth successful.");

  return NextResponse.json({
    success: true,
    message: "WordPress successfully connected.",
    hasAccessToken: Boolean(tokenData.access_token),
  });
}
