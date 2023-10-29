import { createContext, useContext } from "react"

type PopoverContext = {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

export const PopoverContext = createContext<PopoverContext | null>(null)

export const usePopoverContext = () => {
  const ctx = useContext(PopoverContext)

  if (!ctx) throw new Error("PopoverContext.Provider is lost!")

  return ctx
}
