import { cookies } from "next/headers";

export async function getWordPressAccessToken() {
  const cookieStore = cookies();

  const token = cookieStore.get(
    "wordpress_access_token"
  )?.value;

  if (!token) {
    throw new Error(
      "WordPress is not connected. Please authorize first."
    );
  }

  return token;
}
