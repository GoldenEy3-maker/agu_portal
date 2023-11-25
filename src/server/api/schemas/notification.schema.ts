import { z } from "zod"

const NotificationSchema = {
  testSend: z.object({
    link: z.string(),
    subjet: z.string(),
    recipientId: z.string(),
  }),
}

export type NotificationTestSendInput = z.TypeOf<
  typeof NotificationSchema.testSend
>

export default NotificationSchema
