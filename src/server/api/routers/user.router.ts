import userController from "../controllers/user.controller"
import userSchema from "../schemas/user.schema"
import { authProcedure, createTRPCRouter, publicProcedure } from "../trpc"

export const userRouter = createTRPCRouter({
  getSession: authProcedure.query(userController.getSession),
  signIn: publicProcedure
    .input(userSchema.signInInput)
    .mutation(userController.signIn),
  signOut: publicProcedure.mutation(userController.signOut),
})
