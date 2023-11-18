import { z } from "zod"

const AuthSchema = {
  signInInput: z.object({
    login: z.string(),
    password: z.string(),
    rememberMe: z.boolean(),
  }),
}

export type AuthSignInInput = z.TypeOf<typeof AuthSchema.signInInput>

export default AuthSchema
