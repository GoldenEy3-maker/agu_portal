import notificationController from "../controllers/notification.controller"
import { createTRPCRouter } from "../trpc"

export const notificationRouter = createTRPCRouter({
  getAllBySession: notificationController.getAllBySession(),
  testSend: notificationController.testSend(),
})
