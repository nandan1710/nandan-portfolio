import { NextRequest, NextResponse } from "next/server";

const SITE_ID = "257478587";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const token = request.cookies.get(
      "wordpress_access_token"
    )?.value;

    if (!token) {
      return NextResponse.json(
        {
          error: "WordPress is not connected. Please authorize first.",
        },
        { status: 401 }
      );
    }

    const response = await fetch(
      `https://public-api.wordpress.com/rest/v1/sites/${SITE_ID}/posts/${id}/delete`,
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
          error: "WordPress rejected the delete request.",
          details: data,
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
      { error: "Failed to delete WordPress post." },
      { status: 500 }
    );
  }
}
