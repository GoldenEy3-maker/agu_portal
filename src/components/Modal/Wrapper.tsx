import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

type WrapperProps = { state: boolean } & React.HTMLAttributes<HTMLDivElement>

export const Wrapper: React.FC<WrapperProps> = ({ state, ...props }) => {
  return (
    <div
      {...props}
      className={cls([styles.wrapper, props.className])}
      data-modal-root
      aria-hidden={!state}
    >
      {props.children}
    </div>
  )
}
