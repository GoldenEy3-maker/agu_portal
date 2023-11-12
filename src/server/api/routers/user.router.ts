import userController from "../controllers/user.controller"
import UserSchema from "../schemas/user.schema"
import { authProcedure, createTRPCRouter, publicProcedure } from "../trpc"

export const userRouter = createTRPCRouter({
  getSession: authProcedure.query(userController.getSession),
  signIn: publicProcedure
    .input(UserSchema.signInInput)
    .mutation(userController.signIn),
  signOut: publicProcedure.mutation(userController.signOut),
})
