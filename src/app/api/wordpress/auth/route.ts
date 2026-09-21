import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.WORDPRESS_CLIENT_ID;
  const redirectUri = process.env.WORDPRESS_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return new NextResponse("WordPress OAuth is not configured.", {
      status: 500,
    });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "posts,media",
    blog: "nandanportfolioin.wordpress.com",
  });

  const authorizationUrl =
    `https://public-api.wordpress.com/oauth2/authorize?${params.toString()}`;

  return NextResponse.redirect(authorizationUrl);
}
