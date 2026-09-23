import { NextRequest, NextResponse } from "next/server";
import { getWordPressAccessToken } from "@/lib/wordpress-auth";

export async function POST(
  request: NextRequest,
  context: {
    params: {
      id: string;
    };
  }
) {
  try {
    const token = await getWordPressAccessToken();

    const postId = context.params.id;

    const siteId = process.env.WORDPRESS_SITE_ID;

    if (!siteId) {
      return NextResponse.json(
        { error: "WordPress site ID is missing." },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts/${postId}/delete/`,
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
            data?.message ||
            "Failed to delete WordPress post.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Delete failed.",
      },
      { status: 500 }
    );
  }
}
