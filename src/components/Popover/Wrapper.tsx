import { cls } from "~/utils/func"
import { usePopoverContext } from "./context"
import styles from "./styles.module.sass"

type WrapperProps = {
  children: React.ReactNode | ((close: () => void) => React.ReactNode)
} & Omit<React.ComponentProps<"div">, "children">

export const Wrapper: React.FC<WrapperProps> = (props) => {
  const ctx = usePopoverContext()

  return (
    <div
      {...props}
      className={cls(styles.wrapper, props.className)}
      aria-hidden={!ctx.isOpen}
    >
      {typeof props.children === "function"
        ? props.children(ctx.close)
        : props.children}
    </div>
  )
}
