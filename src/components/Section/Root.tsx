import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

export const Root: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  return (
    <section {...props} className={cls([styles.root, props.className])}>
      {props.children}
    </section>
  )
}
