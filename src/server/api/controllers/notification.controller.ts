import { observable } from "@trpc/server/observable"
import ApiError from "../../exeptions"
import {
  NotificationModel,
  notificationModel,
  notificationOnSendInput,
  notificationSendInput,
} from "../schemas/notification.schema"
import { authProcedure, publicProcedure } from "../trpc"

export default new (class NotificationController {
  getBySession() {
    return authProcedure.query(
      async (opts) => await opts.ctx.redis.getNotifications(opts.ctx.user.id)
    )
  }

  clear() {
    return authProcedure.mutation(
      async (opts) => await opts.ctx.redis.clearNotifications(opts.ctx.user.id)
    )
  }

  onSend() {
    return publicProcedure
      .input(notificationOnSendInput)
      .subscription((opts) => {
        return observable<NotificationModel>((emit) => {
          if (!opts.input.userId) throw ApiError.Unauthorized()

          const onSend = (channel: string, message: string) => {
            const notification = notificationModel.parse(JSON.parse(message))
            emit.next(notification)
          }

          opts.ctx.redis.subscribeToNotification(opts.input.userId)
          opts.ctx.redis.on("message", onSend)

          return () => {
            opts.ctx.redis.off("message", onSend)
          }
        })
      })
  }

  readAll() {
    return authProcedure.mutation(
      async (opts) => await opts.ctx.redis.readNotifications(opts.ctx.user.id)
    )
  }

  send() {
    return authProcedure.input(notificationSendInput).mutation(async (opts) => {
      const key = crypto.randomUUID()
      const notification = notificationModel.parse({
        ...opts.input,
        id: key,
        isRead: false,
        sender: opts.ctx.user,
        createdAt: new Date().toISOString(),
      })

      await opts.ctx.redis.setNotification(key, notification)

      await opts.ctx.redis.publishNotification(
        opts.input.recipientId,
        notification
      )

      return notification
    })
  }
})()
