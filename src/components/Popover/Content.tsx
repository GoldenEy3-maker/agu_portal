import { cls } from "~/utils/func"
import { usePopoverContext } from "./context"
import styles from "./styles.module.sass"

export const Content: React.FC<React.ComponentProps<"div">> = (props) => {
  const ctx = usePopoverContext()

  return (
    <div
      {...props}
      className={cls([styles.content, props.className])}
      aria-hidden={!ctx.isOpen}
    >
      {props.children}
    </div>
  )
}
