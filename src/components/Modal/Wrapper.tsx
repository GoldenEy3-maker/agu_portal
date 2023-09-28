import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

type WrapperProps = {
  closeHandler?: () => void
} & React.HTMLAttributes<HTMLDivElement>

export const Wrapper: React.FC<WrapperProps> = ({ closeHandler, ...props }) => {
  return (
    <div
      {...props}
      className={cls([styles.wrapper, props.className])}
      data-wrapper
    >
      {props.children}
    </div>
  )
}
