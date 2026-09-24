import { NextResponse } from "next/server";
import { getWordPressAccessToken } from "@/lib/wordpress-auth";

const WORDPRESS_SITE_ID =
  process.env.WORDPRESS_SITE_ID || "257478587";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = getWordPressAccessToken();

    if (!token) {
      return NextResponse.json(
        {
          error:
            "WordPress is not connected. Please authorize first.",
        },
        { status: 401 }
      );
    }

    const response = await fetch(
      `https://public-api.wordpress.com/rest/v1.1/sites/${WORDPRESS_SITE_ID}/posts/${params.id}/delete`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("WordPress delete error:", data);

      return NextResponse.json(
        {
          error:
            data.error ||
            data.message ||
            "Failed to delete WordPress post.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      post: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal server error.",
      },
      { status: 500 }
    );
  }
}
