import { useRef } from "react"
import { useDocEventListener } from "~/hooks/docEvent.hook"
import { useModalStore } from "~/store/modal"
import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

type RootProps = {
  closeHandler: () => void
} & React.ComponentProps<"div">

export const Root: React.FC<RootProps> = ({ closeHandler, ...props }) => {
  const modalStore = useModalStore()
  const rootRef = useRef<HTMLDivElement>(null)

  const blurHandler: React.FocusEventHandler<HTMLDivElement> = (event) => {
    if (event.relatedTarget && !rootRef.current?.contains(event.relatedTarget))
      closeHandler()

    if (props.onBlur) props.onBlur(event)
  }

  const clickOutsideHandler = (event: MouseEvent) => {
    if (modalStore.queue.length > 0) return
    if (!rootRef.current?.contains(event.target as Element)) closeHandler()
  }

  useDocEventListener("pointerdown", clickOutsideHandler)

  return (
    <div
      {...props}
      ref={rootRef}
      onBlur={blurHandler}
      className={cls(styles.root, props.className)}
    >
      {props.children}
    </div>
  )
}
