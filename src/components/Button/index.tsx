import {useRippleEffect} from "~/hooks/rippleEffect.hook"
import {cls} from "~/utils/func"
import styles from "./styles.module.scss"

type ButtonProps = {
  variant?: "elevated" | "filled" | "outlined"
  asIcon?: boolean
  color?: "danger" | "primary" | "success"
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
                                         variant,
                                         asIcon,
                                         color,
                                         ...props
                                       }) => {
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
      })}
      onPointerDown={rippleEffectEvent}
    >
      {props.children}
    </button>
  )
}

export default Button
