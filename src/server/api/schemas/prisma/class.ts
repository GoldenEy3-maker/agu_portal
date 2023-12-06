import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteSheduler, RelatedShedulerModel } from "./index"

export const ClassModel = z.object({
  id: z.string(),
})

export interface CompleteClass extends z.infer<typeof ClassModel> {
  users: CompleteUser[]
  sheduler: CompleteSheduler[]
}

/**
 * RelatedClassModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedClassModel: z.ZodSchema<CompleteClass> = z.lazy(() => ClassModel.extend({
  users: RelatedUserModel.array(),
  sheduler: RelatedShedulerModel.array(),
}))
