import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.WORDPRESS_CLIENT_ID;
  const redirectUri = process.env.WORDPRESS_REDIRECT_URI;
  const siteId = process.env.WORDPRESS_SITE_ID;

  if (!clientId || !redirectUri || !siteId) {
    return new NextResponse(
      "WordPress OAuth environment variables are missing.",
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "posts,media",
    blog: siteId,
  });

  const authorizationUrl =
    `https://public-api.wordpress.com/oauth2/authorize?${params.toString()}`;

  return NextResponse.redirect(authorizationUrl);
}
