const WORDPRESS_SITE_ID = "257478587";

const WORDPRESS_API = `https://public-api.wordpress.com/rest/v1.1/sites/${WORDPRESS_SITE_ID}`;

export async function getWordPressSite() {
  const response = await fetch(WORDPRESS_API);

  if (!response.ok) {
    throw new Error("Failed to connect to WordPress");
  }

  return response.json();
}
