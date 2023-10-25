import { cls } from "~/utils/func"
import Button, { ButtonProps } from "../Button"
import Link, { LinkProps } from "../Link"
import { useSubmenuContext } from "./context"
import styles from "./styles.module.sass"

type TriggerProps =
  | ({
      as?: "link"
    } & React.PropsWithoutRef<LinkProps>)
  | ({
      as?: "button"
    } & React.PropsWithoutRef<ButtonProps>)

export const Trigger: React.FC<TriggerProps> = ({
  as = "button",
  ...props
}) => {
  const ctx = useSubmenuContext()

  if (as === "link") {
    return (
      // @ts-ignore
      <Link
        {...props}
        className={cls([styles.trigger, props.className])}
        onClick={(e) => {
          e.preventDefault()

          ctx.toggle()
        }}
      >
        {props.children}
      </Link>
    )
  }

  return (
    <Button
      {...props}
      className={cls([styles.trigger, props.className])}
      onClick={ctx.toggle}
    >
      {/* @ts-ignore */}
      {props.children}
    </Button>
  )
}
