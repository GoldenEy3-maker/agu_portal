import { PusherEventMap } from "~/utils/enums"
import NotificationSchema from "../schemas/notification.schema"
import { authProcedure } from "../trpc"

export default new (class NotificationController {
  getAllBySession() {
    return authProcedure.query(async (opts) => {
      const notifications = await opts.ctx.db.notification.findMany({
        where: {
          recipientId: opts.ctx.user.id,
        },
        include: {
          sender: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })

      return notifications
    })
  }

  testSend() {
    return authProcedure
      .input(NotificationSchema.testSend)
      .mutation(async (opts) => {
        await opts.ctx.db.notification.create({
          data: {
            link: opts.input.link,
            subject: opts.input.subjet,
            senderId: opts.ctx.user.id,
            recipientId: opts.input.recipientId,
          },
        })

        opts.ctx.pusher.trigger(
          `presence-user-${opts.input.recipientId}`,
          PusherEventMap.SendNotification,
          {
            message: "sended new notification",
          }
        )

        return true
      })
  }
})()
