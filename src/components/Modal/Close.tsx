import { forwardRef } from "react"
import { BiX } from "react-icons/bi"
import { cls } from "~/utils/func"
import Button, { ButtonProps } from "../Button"
import styles from "./styles.module.scss"

export const Close = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "asIcon" | "type">
>((props, ref) => {
  return (
    <div className={styles.close}>
      <Button {...props} ref={ref} asIcon type="button">
        <BiX />
      </Button>
    </div>
  )
})
