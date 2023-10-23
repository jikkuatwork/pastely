import kv from "@vercel/kv"

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  )
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  res.setHeader("Access-Control-Allow-Credentials", "true")

  // Handle preflight requests (OPTIONS method)
  if (req.method === "OPTIONS") {
    res.status(204).end()
    return
  }

  const meta = await kv.get("meta")

  res.status(200).json({ meta })
}
