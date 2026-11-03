import { getToken } from "next-auth/jwt";

// Returns the signed-in user's id, or sends a 401 and returns null.
export async function requireUserId(req, res) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.id) {
    res.status(401).json({ message: "Please sign in first." });
    return null;
  }
  return token.id;
}

export function pick(source, keys) {
  return Object.fromEntries(keys.filter((key) => source[key] !== undefined).map((key) => [key, source[key]]));
}
