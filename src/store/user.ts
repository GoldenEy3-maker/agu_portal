import { User } from "@prisma/client"
import { create } from "zustand"

type UserStore = {
  token: string | null
} & Partial<User>

export const useUserStore = create<UserStore>((set, get) => ({
  token: null,
}))
