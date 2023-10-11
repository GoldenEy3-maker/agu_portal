import { forwardRef } from "react"
import { BiCheck, BiMinus } from "react-icons/bi"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

export type SwitchValue = "on" | "off" | undefined

export type SwtichType = {
  value: SwitchValue
  checked: boolean
}

type CheckboxHTMLAttributes = Omit<
  React.ComponentProps<"input">,
  "type" | "value" | "onChange"
>

type CheckboxProps =
  | ({
      type: "switch"
      label: string
      value: SwitchValue
      onChange: (value: SwitchValue, checked: boolean) => void
    } & CheckboxHTMLAttributes)
  | ({
      type: "check"
      label: string
      onChange: (checked: boolean) => void
    } & CheckboxHTMLAttributes)

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    const rippleEffectEvent = useRippleEffect()

    const renderIcon = () => {
      if (props.type === "check") {
        return props.checked ? <BiCheck /> : null
      }

      if (props.type !== "switch") return null

      if (props.value === "on") return <BiCheck />
      if (props.value === "off") return <BiMinus />

      return null
    }

    const changeHandler = () => {
      if (props.type === "check") {
        props.onChange(!props.checked)
        return
      }

      if (props.type !== "switch") return

      const prevValue: SwitchValue = props.value
      let value: SwitchValue = undefined
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

      props.onChange(value, checked)
    }

    return (
      <div className={cls([styles.wrapper, props.className])}>
        <input {...props} type="checkbox" onChange={changeHandler} ref={ref} />
        <div className={styles.labelWrapper}>
          <label htmlFor={props.id} onPointerDown={rippleEffectEvent}>
            <span className={styles.icon}>{renderIcon()}</span>
            {label}
          </label>
        </div>
      </div>
    )
  }
)

export const changeCheckboxHandler = () => {}

export default Checkbox
