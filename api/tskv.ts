import { kv } from "@vercel/kv"
await kv.set("user_1_session", "session_token_value")
const session = await kv.get("user_1_session")

export default async function Cart({ params }) {
  const cart = await kv.get(params.user)
  return (
    <div>
      {cart?.map(item => (
        <div key={item.id}>
          {item.id} - {item.quantity}
        </div>
      ))}
    </div>
  )
}
