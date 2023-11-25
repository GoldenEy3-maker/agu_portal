import { createTRPCRouter } from "~/server/api/trpc"
import { authRouter } from "./routers/auth.router"
import { notificationRouter } from "./routers/notification.router"

export const appRouter = createTRPCRouter({
  auth: authRouter,
  notification: notificationRouter,
})

export type AppRouter = typeof appRouter
