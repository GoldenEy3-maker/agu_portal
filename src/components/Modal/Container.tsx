import { useRef } from "react"
import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

type ContainerProps = {
  state: boolean
  closeHandler: () => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, "aria-hidden">

export const Container: React.FC<ContainerProps> = ({
  state,
  closeHandler,
  ...props
}) => {
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
      className={cls([styles.container, props.className])}
      aria-hidden={!state}
      ref={containerRef}
      onPointerDown={clickOutsideHandler}
      onBlur={blurOutsideHandler}
    >
      {props.children}
    </div>
  )
}
