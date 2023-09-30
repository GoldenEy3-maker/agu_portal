import { forwardRef } from "react"
import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

type InputProps = {
  label?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className={cls([styles.wrapper, className])}>
        {label ? <label htmlFor={props.id}>{label}</label> : null}
        <input {...props} ref={ref} />
      </div>
    )
  }
)

export default Input
