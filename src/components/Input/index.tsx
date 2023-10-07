import { forwardRef } from "react"
import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

type InputProps = {
  label?: string
  leadingIcon?: React.ReactNode
  size?: "sm"
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, size, leadingIcon, ...props }, ref) => {
    return (
      <div
        className={cls([styles.wrapper, className], {
          [styles._withLeadingIcon ?? ""]: !!leadingIcon,
          [styles._sm ?? ""]: size === "sm",
        })}
      >
        {label ? <label htmlFor={props.id}>{label}</label> : null}
        <div className={styles.inputWrapper}>
          {leadingIcon ? (
            <span className={styles.leadingIcon}>{leadingIcon}</span>
          ) : null}
          <input {...props} ref={ref} />
        </div>
      </div>
    )
  }
)

export default Input
