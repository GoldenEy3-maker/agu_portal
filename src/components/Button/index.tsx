import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

type ButtonProps = {
  variant?: "elevated" | "filled" | "outliend"
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ variant, ...props }) => {
  const rippleEffectEvent = useRippleEffect()

  return (
    <div className={styles.wrapper}>
      <button
        {...props}
        className={cls([styles.btn, props.className], {
          [styles._filled ?? ""]: variant === "filled",
          [styles._elevated ?? ""]: variant === "elevated",
          [styles._outlined ?? ""]: variant === "outliend",
        })}
        onPointerDown={rippleEffectEvent}
      >
        {props.children}
      </button>
      {props.title ? (
        <span className={styles.tooltip}>{props.title}</span>
      ) : null}
    </div>
  )
}

export default Button
