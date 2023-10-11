import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

export const Root: React.FC<React.ComponentProps<"form">> = (props) => {
  return (
    <form {...props} className={cls([styles.root, props.className])}>
      {props.children}
    </form>
  )
}
