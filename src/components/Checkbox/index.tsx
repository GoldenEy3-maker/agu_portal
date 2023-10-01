import { forwardRef } from "react"
import { BiCheck, BiMinus } from "react-icons/bi"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

export type CheckboxValue = "on" | "off" | undefined

export type CheckboxType = {
  value: CheckboxValue
  checked: boolean
}

type CheckboxProps = {
  label: string
  value: CheckboxValue
  onChange?: (
    value: CheckboxValue,
    checked: boolean,
    event?: React.ChangeEvent<HTMLInputElement>
  ) => void
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
>

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, onChange, ...props }, ref) => {
    const rippleEffectEvent = useRippleEffect()

    const renderIcon = (value: CheckboxValue) => {
      if (value === "on") return <BiCheck />
      if (value === "off") return <BiMinus />

      return null
    }

    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      if (!onChange) return

      const prevValue: CheckboxValue = props.value
      let value: CheckboxValue = undefined
      let checked = false

      if (prevValue === undefined) {
        value = "on"
        checked = true
      }

      if (prevValue === "on") {
        value = "off"
        checked = true
      }

      if (prevValue === "off") {
        value = undefined
        checked = false
      }

      onChange(value, checked, event)
    }

    return (
      <div className={cls([styles.wrapper, props.className])}>
        <input type="checkbox" {...props} onChange={changeHandler} ref={ref} />
        <label htmlFor={props.id} onPointerDown={rippleEffectEvent}>
          <span className={styles.icon}>{renderIcon(props.value)}</span>
          {label}
        </label>
      </div>
    )
  }
)

export const changeCheckboxHandler = () => {}

export default Checkbox
