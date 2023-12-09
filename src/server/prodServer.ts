import next from "next"
import { createServer } from "node:http"
import { parse } from "node:url"

import { applyWSSHandler } from "@trpc/server/adapters/ws"
import { WebSocketServer } from "ws"
import { appRouter } from "./api/root"
import { createTRPCContext } from "./api/trpc"

const port = parseInt(process.env.PORT || "3000", 10)
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

void app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    if (!req.url) return
    const parsedUrl = parse(req.url, true)
    await handle(req, res, parsedUrl)
  })

  const wss = new WebSocketServer({ server })
  const handler = applyWSSHandler({
    wss,
    router: appRouter,
    createContext: createTRPCContext,
  })

  process.on("SIGTERM", () => {
    console.log("SIGTERM")
    handler.broadcastReconnectNotification()
  })

  server.once("error", (err) => {
    console.error(err)
    process.exit(1)
  })

  server.on("upgrade", (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req)
    })
  })

  server.listen(port, () => {
    console.log(
      `> Server listening https & ws requests at ${
        (process.env.APP_URL || process.env.WS_URL) ?? "127.0.0.1"
      }:${port} as ${dev ? "development" : process.env.NODE_ENV}`
    )
  })
})
