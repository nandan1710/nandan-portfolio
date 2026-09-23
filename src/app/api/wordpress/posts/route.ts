import { NextRequest, NextResponse } from "next/server";

const WORDPRESS_SITE_ID = "257478587";

const WORDPRESS_API =
  `https://public-api.wordpress.com/rest/v1.1/sites/${WORDPRESS_SITE_ID}`;

function getToken() {
  const token = process.env.WORDPRESS_ACCESS_TOKEN;

  if (!token) {
    throw new Error("WORDPRESS_ACCESS_TOKEN is missing");
  }

  return token;
}

/**
 * GET
 * Get WordPress posts
 */
export async function GET() {
  try {
    const token = getToken();

    const response = await fetch(
      `${WORDPRESS_API}/posts/?number=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch WordPress posts",
      },
      { status: 500 }
    );
  }
}

/**
 * POST
 * Create a WordPress post
 */
export async function POST(request: NextRequest) {
  try {
    const token = getToken();

    const body = await request.json();

    const formData = new URLSearchParams();

    formData.append("title", body.title);
    formData.append("content", body.content);
    formData.append("status", body.status || "publish");

    const response = await fetch(
      `${WORDPRESS_API}/posts/new`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to create WordPress post",
      },
      { status: 500 }
    );
  }
}
