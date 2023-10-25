import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import { deleteCookie } from "cookies-next"
import tokenService from "services/token.service"
import ApiError from "~/server/exeptions"
import { CookieKeyMap } from "~/utils/enums"
import { UserSignInInput } from "../schemas/user.schema"
import { Context } from "../trpc"

export default new (class UserController {
  getSession(opts: { ctx: Context & { user: User } }) {
    return opts.ctx.user
  }

  async signIn(opts: { input: UserSignInInput; ctx: Context }) {
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

    const { accessToken, refreshToken } = tokenService.generateTokens(user)

    tokenService.setRefreshToken(refreshToken, opts.ctx.req, opts.ctx.res)

    return { accessToken }
  }

  signOut() {
    deleteCookie(CookieKeyMap.RefreshToken)
  }
})()
