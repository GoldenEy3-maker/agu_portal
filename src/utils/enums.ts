import { ValueOf } from "./types"

export const PagePaths = {
  HomePage: "/",
} as const

export type PagePaths = ValueOf<typeof PagePaths>
