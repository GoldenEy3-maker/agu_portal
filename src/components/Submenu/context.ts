import { createContext, useContext } from "react"

type SubmenuContext = {
  isExpanded: boolean
  toggle: () => void
}

export const SubmenuContext = createContext<SubmenuContext | null>(null)

export const useSubmenuContext = () => {
  const ctx = useContext(SubmenuContext)

  if (!ctx) throw new Error("SubemnuContextProvider is lost!")

  return ctx
}
