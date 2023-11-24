import bcrypt from "bcrypt"
import ApiError from "~/server/exeptions"
import tokenService from "~/services/token.service"
import AuthSchema from "../schemas/auth.schema"
import { authProcedure, publicProcedure } from "../trpc"

export default new (class AuthController {
  getSession() {
    return authProcedure.query((opts) => opts.ctx.user)
  }

  signIn() {
    return publicProcedure
      .input(AuthSchema.signInInput)
      .mutation(async (opts) => {
        const user = await opts.ctx.db.user.findUnique({
          where: {
            login: opts.input.login,
          },
        })

        if (!user) throw ApiError.BadRequest("Неверный логин или пароль!")

        const isPassowrdMatch = await bcrypt.compare(
          opts.input.password,
          user.password
        )

        if (!isPassowrdMatch)
          throw ApiError.BadRequest("Неверный логин или пароль!")

        const { accessToken, refreshToken } = tokenService.generateTokens(
          user,
          opts.input.rememberMe
        )

        tokenService.setRefreshToken(refreshToken, opts.ctx.req, opts.ctx.res)

        return { accessToken, user }
      })
  }

  signOut() {
    return publicProcedure.mutation((opts) => {
      tokenService.removeRefreshToken(opts.ctx.req, opts.ctx.res)
    })
  }
})()
