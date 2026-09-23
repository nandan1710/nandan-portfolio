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
 * GET ONE POST
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const response = await fetch(
      `${WORDPRESS_API}/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

/**
 * UPDATE POST
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const formData = new URLSearchParams();

    if (body.title !== undefined) {
      formData.append("title", body.title);
    }

    if (body.content !== undefined) {
      formData.append("content", body.content);
    }

    if (body.status !== undefined) {
      formData.append("status", body.status);
    }

    const response = await fetch(
      `${WORDPRESS_API}/posts/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

/**
 * DELETE POST
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const response = await fetch(
      `${WORDPRESS_API}/posts/${id}/delete`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
