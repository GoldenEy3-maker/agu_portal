import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

export const Header: React.FC<React.ComponentProps<"header">> = (props) => {
  return (
    <header {...props} className={cls([styles.header, props.className])}>
      {props.children}
    </header>
  )
}
