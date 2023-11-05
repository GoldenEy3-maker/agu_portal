import { User } from "@prisma/client"
import { create } from "zustand"

type UserStore = {
  token: string | null
  user: Partial<User> | null
  setToken: (token: string) => void
  removeToken: () => void
  setUser: (data: User) => void
  clear: () => void
}

export const useUserStore = create<UserStore>((set, get) => ({
  token: null,
  user: null,
  setToken(token) {
    set(() => ({ token }))
  },
  removeToken() {
    set(() => ({ token: null }))
  },
  setUser(data) {
    set(() => ({ user: data }))
  },
  clear() {
    set(() => ({ user: null, token: null }))
  },
}))
