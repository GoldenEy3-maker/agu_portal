import { forwardRef } from "react"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

export type ButtonProps = {
  variant?: "elevated" | "filled" | "outlined"
  asIcon?: boolean
  color?: "danger" | "primary" | "success" | "default"
  textAlign?: "center" | "left" | "right"
} & React.ComponentProps<"button">

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, asIcon, color = "primary", textAlign, ...props }, ref) => {
    const rippleEffectEvent = useRippleEffect()

    return (
      <button
        {...props}
        className={cls([styles.btn, props.className], {
          [styles._filled ?? ""]: variant === "filled",
          [styles._elevated ?? ""]: variant === "elevated",
          [styles._outlined ?? ""]: variant === "outlined",
          [styles._asIcon ?? ""]: asIcon!!,
          [styles._danger ?? ""]: color === "danger",
          [styles._success ?? ""]: color === "success",
          [styles._default ?? ""]: color === "default",
          [styles._textAlignCenter ?? ""]: textAlign === "center",
          [styles._textAlignRight ?? ""]: textAlign === "right",
        })}
        onPointerDown={rippleEffectEvent}
        ref={ref}
      >
        {props.children}
      </button>
    )
  }
)

export default Button
