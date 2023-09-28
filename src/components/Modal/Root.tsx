import { useRef } from "react"
import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

type RootProps = {
  state: boolean
  closeHandler?: () => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, "aria-hidden">

export const Root: React.FC<RootProps> = ({
  state,
  closeHandler,
  ...props
}) => {
  const rootRef = useRef<HTMLDivElement>(null)

  const clickOutsideHandler: React.PointerEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (
      !(event.target as HTMLElement).closest("[data-wrapper]") ||
      !rootRef.current?.contains(event.target as HTMLElement)
    )
      closeHandler && closeHandler()

    if (props.onPointerDown) props.onPointerDown(event)
  }

  return (
    <div
      {...props}
      className={cls([styles.root, props.className])}
      aria-hidden={!state}
      ref={rootRef}
      onPointerDown={clickOutsideHandler}
    >
      {props.children}
    </div>
  )
}
