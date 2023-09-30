import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

export const Inputs: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div {...props} className={cls([styles.inputs, props.className])}>
      {props.children}
    </div>
  )
}
