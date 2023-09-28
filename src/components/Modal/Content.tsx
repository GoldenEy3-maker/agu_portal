import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

export const Content: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div {...props} className={cls([styles.content, props.className])}>
      {props.children}
    </div>
  )
}
