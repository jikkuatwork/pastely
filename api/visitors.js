const { RequestContext } = require("@vercel/edge")
const kv = require("@vercel/kv")

exports.config = {
  runtime: "edge",
}

exports.default = async function handler(_, ctx) {
  const currentCount = (await kv.get("visitor-count")) ?? 0
  const incremented = currentCount + 1

  // It doesn't seem to work properly on the dev server.
  ctx.waitUntil(kv.set("visitor-count", incremented))

  return new Response(`You're No. ${incremented} visitor!`)
}
