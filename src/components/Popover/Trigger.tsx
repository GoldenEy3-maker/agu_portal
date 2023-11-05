import { forwardRef } from "react"
import { cls } from "~/utils/func"
import Button, { ButtonProps } from "../Button"
import { usePopoverContext } from "./context"
import styles from "./styles.module.sass"

export const Trigger = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const ctx = usePopoverContext()

    const clickHandler: React.MouseEventHandler<HTMLButtonElement> = (
      event
    ) => {
      ctx.toggle()

      if (props.onClick) props.onClick(event)
    }

    return (
      <Button
        {...props}
        ref={ref}
        className={cls(styles.trigger, props.className)}
        onClick={clickHandler}
      >
        {props.children}
      </Button>
    )
  }
)
