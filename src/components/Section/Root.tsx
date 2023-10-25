import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

type RootProps = {
  isSpanGridArea?: boolean
} & React.ComponentProps<"section">

export const Root: React.FC<RootProps> = ({ isSpanGridArea, ...props }) => {
  return (
    <section
      {...props}
      className={cls([styles.root, props.className], {
        [styles._spanGridArea ?? ""]: !!isSpanGridArea,
      })}
    >
      {props.children}
    </section>
  )
}
