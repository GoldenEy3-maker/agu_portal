import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const CourseModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  password: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteCourse extends z.infer<typeof CourseModel> {
  users: CompleteUser[]
}

/**
 * RelatedCourseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCourseModel: z.ZodSchema<CompleteCourse> = z.lazy(() => CourseModel.extend({
  users: RelatedUserModel.array(),
}))
