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
      let notificaitons = ((await opts.ctx.redisClient.json_get(
        RedisKeyMap.Notifications
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

  clear() {
    return authProcedure.mutation(async (opts) => {
      let notifications = ((await opts.ctx.redisClient.json_get(
        RedisKeyMap.Notifications
      )) || []) as NotificationModel[]

      if (notifications.length > 0) {
        notifications = notifications.filter(
          (notificaiton) => notificaiton.recipientId !== opts.ctx.user.id
        )

        await opts.ctx.redisClient.json_set(
          RedisKeyMap.Notifications,
          "$",
          notifications
        )
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
      let notifications = ((await opts.ctx.redisClient.json_get(
        RedisKeyMap.Notifications
      )) || []) as NotificationModel[]

      if (notifications.length > 0) {
        notifications = notifications
          .filter(
            (notification) => notification.recipientId === opts.ctx.user.id
          )
          .map((notification) => ({
            ...notification,
            isReaded: true,
          }))

        await opts.ctx.redisClient.json_set(
          RedisKeyMap.Notifications,
          "$",
          notifications
        )
      }

      return notifications
    })
  }

  send() {
    return authProcedure.input(notificationSendInput).mutation(async (opts) => {
      const notifications = ((await opts.ctx.redisClient.json_get(
        RedisKeyMap.Notifications
      )) || []) as NotificationModel[]

      const newNotification = notificationModel.parse({
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

      await opts.ctx.redisClient.json_set(RedisKeyMap.Notifications, "$", [
        ...notifications,
        newNotification,
      ])

      await opts.ctx.pubRedisClient.publish(
        `user-notification-${opts.input.recipientId}`,
        JSON.stringify(newNotification)
      )

      return newNotification
    })
  }
})()
