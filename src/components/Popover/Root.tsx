import { useRef, useState } from "react"
import { useDocEventListener } from "~/hooks/docEvent.hook"
import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

type RootProps = {
  closeHandler: () => void
} & React.ComponentProps<"div">

export const Root: React.FC<RootProps> = ({ closeHandler, ...props }) => {
  const rootRef = useRef<HTMLDivElement>(null)

  const blurHandler: React.FocusEventHandler<HTMLDivElement> = (event) => {
    if (event.relatedTarget && !rootRef.current?.contains(event.relatedTarget))
      closeHandler()

    if (props.onBlur) props.onBlur(event)
  }

  const clickOutsideHandler = (event: MouseEvent) => {
    if (!rootRef.current?.contains(event.target as Element)) closeHandler()
  }

  useDocEventListener("click", clickOutsideHandler)

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
