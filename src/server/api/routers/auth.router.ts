import userController from "../controllers/auth.controller"
import AuthSchema from "../schemas/auth.schema"
import { authProcedure, createTRPCRouter, publicProcedure } from "../trpc"

export const authRouter = createTRPCRouter({
  getSession: authProcedure.query(userController.getSession),
  signIn: publicProcedure
    .input(AuthSchema.signInInput)
    .mutation(userController.signIn),
  signOut: publicProcedure.mutation(userController.signOut),
})
