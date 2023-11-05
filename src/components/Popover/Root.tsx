import { useRef, useState } from "react"
import { useDocEventListener } from "~/hooks/docEvent.hook"
import { cls } from "~/utils/func"
import { PopoverContext } from "./context"
import styles from "./styles.module.sass"

export const Root: React.FC<React.ComponentProps<"div">> = (props) => {
  const rootRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen((state) => !state)

  const close = () => setIsOpen(false)

  const blurHandler: React.FocusEventHandler<HTMLDivElement> = (event) => {
    if (event.relatedTarget && !rootRef.current?.contains(event.relatedTarget))
      close()

    if (props.onBlur) props.onBlur(event)
  }

  const clickOutsideHandler = (event: MouseEvent) => {
    if (!rootRef.current?.contains(event.target as Element)) close()
  }

  useDocEventListener("click", clickOutsideHandler)

  return (
    <PopoverContext.Provider value={{ isOpen, toggle, close }}>
      <div
        {...props}
        ref={rootRef}
        onBlur={blurHandler}
        className={cls(styles.root, props.className)}
      >
        {props.children}
      </div>
    </PopoverContext.Provider>
  )
}
