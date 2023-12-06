import notificationController from "../controllers/notification.controller"
import { createTRPCRouter } from "../trpc"

export const notificationRouter = createTRPCRouter({
  getAllBySession: notificationController.getAllBySession(),
  onSend: notificationController.onSend(),
  testSend: notificationController.testSend(),
  deleteAll: notificationController.deleteAll(),
})
