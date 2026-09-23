const WORDPRESS_SITE_ID = "257478587";

const WORDPRESS_API =
  `https://public-api.wordpress.com/rest/v1.1/sites/${WORDPRESS_SITE_ID}`;

export interface WordPressPost {
  ID: number;
  title: string;
  URL: string;
  date: string;
  modified: string;
  content: string;
  excerpt: string;
  status: string;
  slug: string;
}

/**
 * Public: get site information
 */
export async function getWordPressSite() {
  const response = await fetch(WORDPRESS_API, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to connect to WordPress");
  }

  return response.json();
}

/**
 * Public: get posts
 */
export async function getWordPressPosts() {
  const response = await fetch(
    `${WORDPRESS_API}/posts/?number=100`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch WordPress posts");
  }

  return response.json();
}
