import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const NotificationModel = z.object({
  id: z.string(),
  senderId: z.string(),
  recipientId: z.string(),
  isReaded: z.boolean(),
  subject: z.string(),
  link: z.string(),
  createdAt: z.date(),
})

export interface CompleteNotification extends z.infer<typeof NotificationModel> {
  sender: CompleteUser
  recipient: CompleteUser
}

/**
 * RelatedNotificationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedNotificationModel: z.ZodSchema<CompleteNotification> = z.lazy(() => NotificationModel.extend({
  sender: RelatedUserModel,
  recipient: RelatedUserModel,
}))
