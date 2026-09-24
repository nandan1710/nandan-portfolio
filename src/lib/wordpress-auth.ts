import { cookies } from "next/headers";

export function getWordPressAccessToken() {
  const cookieStore = cookies();

  return cookieStore.get("wordpress_access_token")?.value;
}
