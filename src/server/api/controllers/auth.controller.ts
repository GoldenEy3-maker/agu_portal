import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import ApiError from "~/server/exeptions"
import tokenService from "~/services/token.service"
import { PusherChannelMap, PusherEventMap } from "~/utils/enums"
import { AuthSignInInput } from "../schemas/auth.schema"
import { Context } from "../trpc"

export default new (class AuthController {
  getSession(opts: { ctx: Context & { user: User } }) {
    return opts.ctx.user
  }

  async signIn(opts: { input: AuthSignInInput; ctx: Context }) {
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

    opts.ctx.pusher.trigger(
      `presence-${PusherChannelMap.Auth}`,
      PusherEventMap.SignInUser,
      {
        message: `Authorized user - ${user.id}`,
      }
    )

    tokenService.setRefreshToken(refreshToken, opts.ctx.req, opts.ctx.res)

    return { accessToken, user }
  }

  signOut(opts: { ctx: Context }) {
    opts.ctx.pusher.trigger(
      `presence-${PusherChannelMap.Auth}`,
      PusherEventMap.SingOutUser,
      {
        message: `User was sing-out`,
      }
    )
    tokenService.removeRefreshToken(opts.ctx.req, opts.ctx.res)
  }
})()
