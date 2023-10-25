import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

type RootProps = {
  state: boolean
  asDrawer?: boolean
  position?: "left" | "center" | "right"
} & Omit<React.ComponentProps<"div">, "aria-hidden">

export const Root: React.FC<RootProps> = ({
  state,
  asDrawer,
  position,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cls([styles.root, props.className], {
        [styles._drawer ?? ""]: !!asDrawer,
        [styles._leftPos ?? ""]: !!asDrawer && position === "left",
      })}
      aria-hidden={!state}
    >
      <div data-modal-root className={styles.rootWrapper}>
        {props.children}
      </div>
    </div>
  )
}
