import { z } from "zod"

export const notificationSendInput = z.object({
  link: z.string(),
  subject: z.string(),
  recipientId: z.string(),
})

export const notificationOnSendInput = z.object({
  userId: z.string().nullable(),
})

export const notificationModel = z.object({
  id: z.string(),
  recipientId: z.string(),
  subject: z.string(),
  link: z.string(),
  isRead: z.boolean(),
  createdAt: z.string(),
  sender: z.object({
    id: z.string(),
    avatar: z.string().nullable(),
    name: z.string(),
  }),
})

export type NotificationSendInput = z.TypeOf<typeof notificationSendInput>
export type NotificationOnSendInput = z.TypeOf<typeof notificationOnSendInput>
export type NotificationModel = z.TypeOf<typeof notificationModel>
