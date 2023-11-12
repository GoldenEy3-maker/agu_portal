import { z } from "zod"

const UserSchema = {
  signInInput: z.object({
    login: z.string(),
    password: z.string(),
    rememberMe: z.boolean(),
  }),
}

export type UserSignInInput = z.TypeOf<typeof UserSchema.signInInput>

export default UserSchema
