import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

type GroupProps = {
  directions?: "horizontal" | "vertical"
} & React.ComponentProps<"div">

export const Group: React.FC<GroupProps> = ({ directions, ...props }) => {
  return (
    <div
      {...props}
      className={cls([styles.group, props.className], {
        [styles._vertical ?? ""]: directions === "vertical",
      })}
    >
      {props.children}
    </div>
  )
}
