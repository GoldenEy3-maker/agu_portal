import { z } from "zod"

class UserSchema {
  signInInput = z.object({
    login: z.string(),
    password: z.string(),
  })
}

const userSchema = new UserSchema()

export type UserSignInInput = z.TypeOf<typeof userSchema.signInInput>

export default userSchema
