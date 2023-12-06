import { z } from "zod"
import { UserModel } from "./prisma"

export const NotificationTestSendInput = z.object({
  link: z.string(),
  subject: z.string(),
  recipientId: z.string(),
})

export const NotificationModel = z.object({
  id: z.string(),
  recipientId: z.string(),
  subject: z.string(),
  link: z.string(),
  isReaded: z.boolean(),
  createdAt: z.string(),
  sender: z.object({
    id: z.string(),
    avatar: z.string().nullable(),
    name: z.string(),
  }),
})

export type NotificationTestSendInput = z.TypeOf<
  typeof NotificationTestSendInput
>

export type NotificationModel = z.TypeOf<typeof NotificationModel>
