import { applyWSSHandler } from "@trpc/server/adapters/ws"
import ws from "ws"
import { appRouter } from "./api/root"
import { createTRPCContext } from "./api/trpc"

const wss = new ws.Server({
  port: 3000,
  host: "127.0.0.1",
})

const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext: createTRPCContext,
})

wss.on("connection", (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`)
  ws.once("close", () => {
    console.log(`➖➖ Connection (${wss.clients.size})`)
  })
})

console.log("✅ WebSocket Server listening on ws://127.0.0.1:3000")

process.on("SIGTERM", () => {
  console.log("SIGTERM")
  handler.broadcastReconnectNotification()
  wss.close()
})
