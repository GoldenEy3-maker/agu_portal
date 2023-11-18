import Pusher from "pusher-js"
import { env } from "~/env.mjs"

Pusher.logToConsole = process.env.NODE_ENV === "development"

export const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
})
