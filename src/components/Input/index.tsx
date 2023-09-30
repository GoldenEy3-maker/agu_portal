import { forwardRef } from "react"
import { BiUser } from "react-icons/bi"
import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

type InputProps = {
  label?: string
  leadingIcon?: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, leadingIcon, ...props }, ref) => {
    return (
      <div
        className={cls([styles.wrapper, className], {
          [styles._withLeadingIcon ?? ""]: !!leadingIcon,
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
