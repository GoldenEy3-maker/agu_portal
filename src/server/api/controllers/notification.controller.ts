import { observable } from "@trpc/server/observable"
import { RedisKeyMap } from "../../../utils/enums"
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
    return authProcedure.query(async (opts) => {
      const scan = await opts.ctx.redisClient.scan(
        0,
        "MATCH",
        RedisKeyMap.Notification + ":*"
      )
      const keys = scan[1]
      let notifications: NotificationModel[] = []

      for (const key of keys) {
        const result = await opts.ctx.redisClient.get(key)

        if (!result) return

        const notification = notificationModel.parse(JSON.parse(result))

        if (notification.recipientId !== opts.ctx.user.id) return

        notifications.push(notification)
      }

      return notifications
    })
  }

  clear() {
    return authProcedure.mutation(async (opts) => {
      const scan = await opts.ctx.redisClient.scan(
        0,
        "MATCH",
        RedisKeyMap.Notification + ":*"
      )
      const keys = scan[1]

      for (const key of keys) {
        const result = await opts.ctx.redisClient.get(key)

        if (!result) return

        const notification = notificationModel.parse(JSON.parse(result))

        if (notification.recipientId !== opts.ctx.user.id) return

        await opts.ctx.redisClient.del(key)
      }

      return true
    })
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

          opts.ctx.subRedisClient.subscribe(
            `user-notification-${opts.input.userId}`
          )
          opts.ctx.subRedisClient.on("message", onSend)

          return () => {
            opts.ctx.subRedisClient.off("message", onSend)
          }
        })
      })
  }

  readAll() {
    return authProcedure.mutation(async (opts) => {
      const scan = await opts.ctx.redisClient.scan(
        0,
        "MATCH",
        RedisKeyMap.Notification + ":*"
      )
      const keys = scan[1]

      for (const key of keys) {
        let result = await opts.ctx.redisClient.get(key)

        if (!result) return

        let notification = notificationModel.parse(JSON.parse(result))

        if (notification.recipientId !== opts.ctx.user.id) return

        notification = { ...notification, isReaded: true }

        await opts.ctx.redisClient.set(key, JSON.stringify(notification))
      }

      return true
    })
  }

  send() {
    return authProcedure.input(notificationSendInput).mutation(async (opts) => {
      const newNotification = notificationModel.parse({
        ...opts.input,
        id: crypto.randomUUID(),
        isReaded: false,
        sender: opts.ctx.user,
        createdAt: new Date().toISOString(),
      })

      await opts.ctx.redisClient.set(
        `${RedisKeyMap.Notification}:${crypto.randomUUID()}`,
        JSON.stringify(newNotification)
      )

      await opts.ctx.pubRedisClient.publish(
        `user-notification-${opts.input.recipientId}`,
        JSON.stringify(newNotification)
      )

      return true
    })
  }
})()
