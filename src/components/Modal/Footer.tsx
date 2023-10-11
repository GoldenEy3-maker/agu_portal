import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

export const Footer: React.FC<React.ComponentProps<"footer">> = (props) => {
  return (
    <footer {...props} className={cls([styles.footer, props.className])}>
      {props.children}
    </footer>
  )
}
