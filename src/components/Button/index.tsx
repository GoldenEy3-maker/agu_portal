import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

type ButtonProps = {
  variant?: "elevated" | "filled" | "outliend"
  asIcon?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ variant, asIcon, ...props }) => {
  const rippleEffectEvent = useRippleEffect()

  return (
    <button
      {...props}
      className={cls([styles.btn, props.className], {
        [styles._filled ?? ""]: variant === "filled",
        [styles._elevated ?? ""]: variant === "elevated",
        [styles._outlined ?? ""]: variant === "outliend",
        [styles._asIcon ?? ""]: asIcon!!,
      })}
      onPointerDown={rippleEffectEvent}
    >
      {props.children}
    </button>
  )
}

export default Button
