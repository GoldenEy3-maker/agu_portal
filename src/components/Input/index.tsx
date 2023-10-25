import { forwardRef } from "react"
import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

type InputProps = {
  label?: string
  leadingIcon?: React.ReactNode
  size?: "sm"
  errorMessage?: string
} & Omit<React.ComponentProps<"input">, "size">

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, size, leadingIcon, errorMessage, ...props }, ref) => {
    return (
      <div
        className={cls([styles.wrapper, className], {
          [styles._withLeadingIcon ?? ""]: !!leadingIcon,
          [styles._sm ?? ""]: size === "sm",
          [styles._error ?? ""]: !!errorMessage,
        })}
      >
        {label ? <label htmlFor={props.id}>{label}</label> : null}
        <div className={styles.inputWrapper}>
          {leadingIcon ? (
            <span className={styles.leadingIcon}>{leadingIcon}</span>
          ) : null}
          <input {...props} ref={ref} />
        </div>
        {errorMessage ? (
          <p className={styles.errorMessage}>{errorMessage}</p>
        ) : null}
      </div>
    )
  }
)

export default Input
