import { useRef } from "react"
import { useModalStore } from "~/store/modal"
import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

type RootProps = {
  state: boolean
  closeHandler: () => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, "aria-hidden">

export const Root: React.FC<RootProps> = ({
  state,
  closeHandler,
  ...props
}) => {
  const modalStore = useModalStore()

  const containerRef = useRef<HTMLDivElement>(null)

  const clickOutsideHandler: React.PointerEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (
      !(event.target as HTMLElement).closest("[data-modal-root]") ||
      !containerRef.current?.contains(event.target as HTMLElement)
    )
      closeHandler && closeHandler()

    if (props.onPointerDown) props.onPointerDown(event)
  }

  const blurOutsideHandler: React.FocusEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (
      event.relatedTarget !== null &&
      !event.relatedTarget.closest("[data-modal-root]") &&
      !containerRef.current?.contains(event.relatedTarget as HTMLElement)
    )
      closeHandler && closeHandler()

    if (props.onBlur) props.onBlur(event)
  }

  return (
    <div
      {...props}
      className={cls([styles.root, props.className])}
      aria-hidden={!state}
      ref={containerRef}
      onPointerDown={clickOutsideHandler}
      onBlur={blurOutsideHandler}
    >
      {props.children}
    </div>
  )
}
