import React, { createContext, useContext } from "react"

export type TabsContext = {
  offset: number
  cursorOffset: number
  activeItemWidth: number
  name: string
  setOffset: React.Dispatch<React.SetStateAction<number>>
  setActiveItemWidth: React.Dispatch<React.SetStateAction<number>>
  setCursorOffset: React.Dispatch<React.SetStateAction<number>>
}

export const TabsContext = createContext<TabsContext | null>(null)

export const useTabsContext = () => {
  const ctx = useContext(TabsContext)

  if (!ctx) throw new Error("ctx is lost!")

  return ctx
}
