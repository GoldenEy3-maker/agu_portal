import { create } from "zustand"

type SidebarStore = {
  isExpanded: boolean
  toggle: () => void
}

export const useSidebarStore = create<SidebarStore>((set, get) => ({
  isExpanded: false,
  toggle() {
    set((state) => ({ isExpanded: !state.isExpanded }))
  },
}))
