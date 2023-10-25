import { createTRPCRouter } from "~/server/api/trpc"
import { userRouter } from "./routers/user.router"

export const appRouter = createTRPCRouter({
  user: userRouter,
})

export type AppRouter = typeof appRouter
