import { create } from "zustand"
import { ModalKeys } from "~/utils/enums"

type ModalProps = {
  [ModalKeys.SignIn]: {
    id: string
  }
  [ModalKeys.SingOut]: {
    id: string
    name: string
  }
}

type ModalStore = {
  queue: ModalKeys[]
  props: ModalProps | null
  open: <T extends ModalKeys>(
    key: T,
    props?: T extends keyof ModalProps ? ModalProps[T] : never
  ) => void
  close: (key: ModalKeys) => void
  setProps: <T extends keyof ModalProps>(key: T, props: ModalProps[T]) => void
}

export const useModalStore = create<ModalStore>((set, get) => ({
  queue: [],
  props: null,
  open(key, props) {
    const storedQueue = get().queue

    if (storedQueue.at(-1) === key) return

    document.body.style.overflow = "hidden"

    if (storedQueue.includes(key)) {
      set((store) => ({
        queue: [...store.queue.filter((qKey) => qKey !== key), key],
      }))
    } else {
      set((store) => ({
        queue: [...store.queue, key],
      }))
    }

    if (props) {
      // @ts-ignore
      set((store) => ({ props: { ...store.props, [key]: props } }))
    }
  },
  close(key) {
    const newQueue = get().queue.filter((qKey) => qKey !== key)

    if (newQueue.length === 0) document.body.style.overflow = "auto"

    set(() => ({ queue: newQueue }))
  },
  setProps(key, props) {
    // @ts-ignore
    set((store) => ({ props: { ...store.props, [key]: props } }))
  },
}))
