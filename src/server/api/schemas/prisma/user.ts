import * as z from "zod"
import { Role } from "@prisma/client"
import { CompleteClass, RelatedClassModel, CompleteCourse, RelatedCourseModel, CompleteNotification, RelatedNotificationModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  classId: z.string().nullish(),
  login: z.string(),
  password: z.string(),
  tokenVersion: z.number().int(),
  email: z.string().nullish(),
  name: z.string(),
  surname: z.string(),
  patronymic: z.string().nullish(),
  avatar: z.string().nullish(),
  role: z.nativeEnum(Role),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  class?: CompleteClass | null
  courses: CompleteCourse[]
  sendedNotifications: CompleteNotification[]
  receivedNotifications: CompleteNotification[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  class: RelatedClassModel.nullish(),
  courses: RelatedCourseModel.array(),
  sendedNotifications: RelatedNotificationModel.array(),
  receivedNotifications: RelatedNotificationModel.array(),
}))
