import { create } from "zustand"
import { ModalKeys } from "~/utils/enums"

type ModalProps = {}

type OpenModalStoreActionArgs<T extends ModalKeys> = T extends keyof ModalProps
  ? { key: T; target?: HTMLElement; props?: ModalProps[T] }
  : { key: T; target?: HTMLElement }

type ModalStore = {
  queue: ModalKeys[]
  props: ModalProps | null
  target: HTMLElement | null
  open: <T extends ModalKeys>(args: OpenModalStoreActionArgs<T>) => void
  close: (key?: ModalKeys) => void
  setProps: <T extends keyof ModalProps>(key: T, props: ModalProps[T]) => void
}

export const useModalStore = create<ModalStore>((set, get) => ({
  queue: [],
  props: null,
  target: null,
  open(args) {
    const storedQueue = get().queue

    if (storedQueue.at(-1) === args.key) return

    if (storedQueue.length === 0)
      document.body.style.setProperty(
        "--scrollbar-offset",
        window.innerWidth - document.body.offsetWidth + "px"
      )
    document.body.dataset.lock = "true"

    if (args.target) set(() => ({ target: args.target }))

    if (storedQueue.includes(args.key)) {
      set((state) => ({
        queue: [...state.queue.filter((q) => q !== args.key), args.key],
      }))
    } else {
      set((store) => ({
        queue: [...store.queue, args.key],
      }))
    }

    // @ts-ignore
    if (args.props) {
      // @ts-ignore
      set((store) => ({ props: { ...store.props, [args.key]: args.props } }))
    }
  },
  close(key) {
    const newQueue = get().queue.filter((q, _, self) =>
      key ? q !== key : q !== self.at(-1)
    )

    if (newQueue.length === 0) {
      setTimeout(() => document.body.removeAttribute("data-lock"), 200)

      const target = get().target

      if (target) {
        target.focus()
        set(() => ({ target: null }))
      }
    }

    set(() => ({ queue: newQueue }))
  },
  setProps(key, props) {
    // @ts-ignore
    set((store) => ({ props: { ...store.props, [key]: props } }))
  },
}))
