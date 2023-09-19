import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

export const Title: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (
  props
) => {
  return (
    <h3 {...props} className={cls([styles.title, props.className])}>
      {props.children}
    </h3>
  )
}
