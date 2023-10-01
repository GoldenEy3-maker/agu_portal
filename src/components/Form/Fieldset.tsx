import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

type FieldsetProps = {
  legend?: string
  type?: "input" | "checkbox"
} & React.FieldsetHTMLAttributes<HTMLFieldSetElement>

export const Fieldset: React.FC<FieldsetProps> = ({
  legend,
  type,
  ...props
}) => {
  return (
    <fieldset {...props} className={cls([styles.fieldset, props.className])}>
      {legend ? <legend>{legend}</legend> : null}
      {props.children}
    </fieldset>
  )
}