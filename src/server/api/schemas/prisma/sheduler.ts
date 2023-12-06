import * as z from "zod"
import { CompleteClass, RelatedClassModel } from "./index"

export const ShedulerModel = z.object({
  id: z.string(),
  classId: z.string(),
  subject: z.string(),
  teacher: z.string(),
  address: z.string(),
  audience: z.number().int(),
  start: z.date(),
  end: z.date(),
})

export interface CompleteSheduler extends z.infer<typeof ShedulerModel> {
  class: CompleteClass
}

/**
 * RelatedShedulerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedShedulerModel: z.ZodSchema<CompleteSheduler> = z.lazy(() => ShedulerModel.extend({
  class: RelatedClassModel,
}))
