import Redis from "ioredis"
import { RedisKeyMap } from "../utils/enums"
import { NotificationModel, notificationModel } from "./api/schemas/notification.schema"
import ApiError from "./exeptions"

class CustomRedis extends Redis {
  constructor(path: string) {
    super(path)
  }

  setNotification(key: string, notification: NotificationModel) {
    return this.set(
      `${RedisKeyMap.Notification}:${key}`,
      JSON.stringify(notification)
    )
  }

  async getNotifications(recipientId?: string) {
    const scan = await this.scan(0, "MATCH", RedisKeyMap.Notification + ":*")
    const keys = scan[1]
    let notifications: NotificationModel[] = []

    for (const key of keys) {
      const result = await this.get(key)

      if (!result) continue

      const notification = notificationModel.parse(JSON.parse(result))

      if (recipientId && recipientId !== notification.recipientId) continue

      notifications.push(notification)
    }

    return notifications
  }

  async clearNotifications(recipientId: string) {
    const notifications = await this.getNotifications(recipientId)

    for (const notification of notifications) {
      await this.del(`${RedisKeyMap.Notification}:${notification.id}`)
    }

    return true
  }

  async getNotification(id: string) {
    const result = await this.get(`${RedisKeyMap.Notification}:${id}`)

    if (!result) throw ApiError.BadRequest("Такого уведомления не существует!")

    return notificationModel.parse(JSON.parse(result))
  }

  async readNotification(id: string) {
    const notification = await this.getNotification(id)
    const newNotification: NotificationModel = {...notification, isRead: true}
    await this.setNotification(id, newNotification)
    return newNotification
  }

  async readNotifications(recipientId: string) {
    let notifications = await this.getNotifications(recipientId)

    return await Promise.all(notifications.map(async (notification) => {
      const newNotification: NotificationModel = {...notification, isRead: true}
      await this.setNotification(notification.id, newNotification)
      return newNotification
    }))
  }

  subscribeToNotification(userId: string) {
    return this.subscribe(`user-notification-${userId}`)
  }

  publishNotification(userId: string, notification: NotificationModel) {
    return this.publish(`user-notification-${userId}`, JSON.stringify(notification))
  }
}

export const redis = new CustomRedis(process.env.REDIS_URL ?? "")
