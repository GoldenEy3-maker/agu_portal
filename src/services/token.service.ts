import { setCookie } from "cookies-next"
import jwt from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"
import { env } from "~/env.mjs"
import { CookieKeyMap } from "~/utils/enums"

type AccessTokenPayload = {
  login: string
}

type RefreshTokenPayload = {
  login: string
  tokenVersion: number
}

export default new (class TokenService {
  generateTokens(payload: AccessTokenPayload & RefreshTokenPayload) {
    const accessToken = jwt.sign(
      { login: payload.login },
      env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    )
    const refreshToken = jwt.sign(
      { login: payload.login, tokenVersion: payload.tokenVersion },
      env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    )

    return { accessToken, refreshToken }
  }

  verifyAccessToken(token: string) {
    try {
      return jwt.verify(token, env.ACCESS_TOKEN_SECRET) as AccessTokenPayload
    } catch (error) {
      return null
    }
  }

  verifyRefreshToken(token: string) {
    try {
      return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as RefreshTokenPayload
    } catch (error) {
      return null
    }
  }

  setRefreshToken(payload: string, req: NextApiRequest, res: NextApiResponse) {
    setCookie(CookieKeyMap.RefreshToken, payload, {
      req,
      res,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    })
  }

  removeRefreshToken(req: NextApiRequest, res: NextApiResponse) {
    setCookie(CookieKeyMap.RefreshToken, 1, {
      req,
      res,
      maxAge: -1,
    })
  }
})()
