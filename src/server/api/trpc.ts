import { inferAsyncReturnType, initTRPC } from "@trpc/server"
import { type CreateNextContextOptions } from "@trpc/server/adapters/next"
import { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws"
import superjson from "superjson"
import { ZodError } from "zod"
import { db } from "~/server/db"
import tokenService from "~/services/token.service"
import ApiError from "../exeptions"
import { pusher } from "../pusher"

type CreateContextOptions = Record<string, never>

const createInnerTRPCContext = (_opts?: CreateContextOptions) => {
  return {
    db,
    pusher,
  }
}

export const createTRPCContext = (_opts: CreateNextContextOptions) => {
  return { ...createInnerTRPCContext(), req: _opts.req, res: _opts.res }
}

export type Context = inferAsyncReturnType<typeof createTRPCContext>

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createTRPCRouter = t.router
export const middleware = t.middleware

const isApi = middleware((opts) => {
  if (!opts.ctx.req || !opts.ctx.res) throw ApiError.BadRequest("Context lost!")

  return opts.next({
    ctx: {
      req: opts.ctx.req,
      res: opts.ctx.res,
    },
  })
})

const isAuth = middleware(async (opts) => {
  const accessToken = opts.ctx.req.headers.authorization?.split(" ")[1]

  if (!accessToken) throw ApiError.Unauthorized()

  const accessTokenPayload = tokenService.verifyAccessToken(accessToken)

  if (!accessTokenPayload) throw ApiError.Unauthorized()

  const user = await opts.ctx.db.user.findUnique({
    where: {
      login: accessTokenPayload.login,
    },
  })

  if (!user) throw ApiError.Unauthorized()

  return opts.next({
    ctx: { user },
  })
})

export const publicProcedure = t.procedure.use(isApi)
export const authProcedure = t.procedure.use(isAuth)
