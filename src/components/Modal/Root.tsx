import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

type RootProps = {
  state: boolean
  asDrawer?: boolean
} & Omit<React.HTMLAttributes<HTMLDivElement>, "aria-hidden">

export const Root: React.FC<RootProps> = ({ state, asDrawer, ...props }) => {
  return (
    <div
      {...props}
      className={cls([styles.root, props.className], {
        [styles._drawer ?? ""]: !!asDrawer,
      })}
      aria-hidden={!state}
    >
      <div data-modal-root className={styles.rootWrapper}>
        {props.children}
      </div>
    </div>
  )
}
