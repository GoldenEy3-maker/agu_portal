import { observable } from "@trpc/server/observable"
import { z } from "zod"
import ApiError from "../../exeptions"
import {
  NotificationModel,
  NotificationTestSendInput,
} from "../schemas/notification.schema"
import { authProcedure, publicProcedure } from "../trpc"

export default new (class NotificationController {
  getAllBySession() {
    return authProcedure.query(async (opts) => {
      let notificaitons = ((await opts.ctx.redisClient.json_get(
        "notifications"
      )) || []) as NotificationModel[]

      if (notificaitons.length > 0) {
        notificaitons = notificaitons
          .filter(
            (notification) => notification.recipientId === opts.ctx.user.id
          )
          .sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime()
            const dateB = new Date(b.createdAt).getTime()

            return dateB - dateA
          })
      }

      return notificaitons
    })
  }

  deleteAll() {
    return authProcedure.mutation(async (opts) => {
      return true
    })
  }

  onSend() {
    return publicProcedure.input(z.string().optional()).subscription((opts) => {
      return observable<NotificationModel[]>((emit) => {
        if (!opts.input) throw ApiError.Unauthorized()
        const onSend = (channel: string, message: string) => {
          const notification = JSON.parse(message) as NotificationModel[]
          emit.next(notification)
        }

        opts.ctx.subRedisClient.subscribe(`user-notification-${opts.input}`)
        opts.ctx.subRedisClient.on("message", onSend)

        return () => {
          opts.ctx.subRedisClient.off("message", onSend)
        }
      })
    })
  }

  testSend() {
    return authProcedure
      .input(NotificationTestSendInput)
      .mutation(async (opts) => {
        const notification = NotificationModel.parse({
          ...opts.input,
          id: crypto.randomUUID(),
          sender: {
            id: opts.ctx.user.id,
            avatar: opts.ctx.user.avatar,
            name: opts.ctx.user.name,
          },
          isReaded: false,
          createdAt: new Date().toString(),
        })

        await opts.ctx.redisClient.json_arrappend(
          `notifications`,
          "$",
          notification
        )

        await opts.ctx.pubRedisClient.publish(
          `user-notification-${opts.input.recipientId}`,
          JSON.stringify(notification)
        )
        return notification
      })
  }
})()
