import { forwardRef } from "react"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/func"
import LoadingIcon from "../LoadingIcon"
import styles from "./styles.module.sass"

export type ButtonProps = {
  variant?: "elevated" | "filled" | "outlined"
  asIcon?: boolean
  color?: "danger" | "primary" | "success" | "default"
  textAlign?: "center" | "left" | "right"
  size?: "sm"
  loading?: boolean
  isActive?: boolean
} & React.ComponentProps<"button">

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      asIcon,
      color = "primary",
      textAlign,
      size,
      loading,
      isActive,
      ...props
    },
    ref
  ) => {
    const rippleEffectEvent = useRippleEffect()

    const isLoading = loading || (props.type === "submit" && props.disabled)

    return (
      <button
        {...props}
        className={cls(styles.btn, props.className, {
          [styles._filled ?? ""]: variant === "filled",
          [styles._elevated ?? ""]: variant === "elevated",
          [styles._outlined ?? ""]: variant === "outlined",
          [styles._asIcon ?? ""]: asIcon!!,
          [styles._dangerClr ?? ""]: color === "danger",
          [styles._successClr ?? ""]: color === "success",
          [styles._defaultClr ?? ""]: color === "default",
          [styles._textAlignCenter ?? ""]: textAlign === "center",
          [styles._textAlignRight ?? ""]: textAlign === "right",
          [styles._sm ?? ""]: size === "sm",
          [styles._isActive ?? ""]: !!isActive,
        })}
        onPointerDown={rippleEffectEvent}
        ref={ref}
      >
        {isLoading ? <LoadingIcon /> : null}
        {isLoading && asIcon ? null : props.children}
      </button>
    )
  }
)

export default Button
