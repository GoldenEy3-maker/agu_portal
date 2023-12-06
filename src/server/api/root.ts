import { authRouter } from "./routers/auth.router"
import { notificationRouter } from "./routers/notification.router"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  auth: authRouter,
  notification: notificationRouter,
})

export type AppRouter = typeof appRouter
