import { authRouter } from "./routers/auth.router"
import { notificationRouter } from "./routers/notification.router"
import { createTRPCRouter, publicProcedure } from "./trpc"

export const appRouter = createTRPCRouter({
  healthCheck: publicProcedure.query(() => "healthCheck trpc!"),
  auth: authRouter,
  notification: notificationRouter,
})

export type AppRouter = typeof appRouter
