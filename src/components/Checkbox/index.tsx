import { forwardRef } from "react"
import { BiCheck, BiMinus } from "react-icons/bi"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/func"
import styles from "./styles.module.sass"

export type ExtendedCheckboxValue = "on" | "off" | undefined

export type ExtendedCheckboxType = {
  value: ExtendedCheckboxValue
  checked: boolean
}

type CheckboxHTMLAttributes = Omit<
  React.ComponentProps<"input">,
  "type" | "value" | "onChange"
>

type CheckboxProps =
  | ({
      type: "check"
      label: string
      onChange: (checked: boolean) => void
    } & CheckboxHTMLAttributes)
  | ({
      type: "extended-check"
      label: string
      value: ExtendedCheckboxValue
      onChange: (value: ExtendedCheckboxValue, checked: boolean) => void
    } & CheckboxHTMLAttributes)
  | ({
      type: "switch"
      label: string
      onChange: (checked: boolean) => void
    } & CheckboxHTMLAttributes)

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    const rippleEffectEvent = useRippleEffect()

    const renderCheckboxIcon = () => {
      if (props.type === "check") {
        return props.checked ? <BiCheck /> : null
      }

      if (props.type !== "extended-check") return null

      if (props.value === "on") return <BiCheck />
      if (props.value === "off") return <BiMinus />

      return null
    }

    const changeHandler = () => {
      if (props.type === "check" || props.type === "switch") {
        props.onChange(!props.checked)
        return
      }

      if (props.type !== "extended-check") return

      const prevValue: ExtendedCheckboxValue = props.value
      let value: ExtendedCheckboxValue = undefined
      let checked = !!props.checked

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
      <div className={cls(styles.wrapper, props.className)}>
        <input {...props} type="checkbox" onChange={changeHandler} ref={ref} />
        <div className={styles.labelWrapper}>
          <label htmlFor={props.id} onPointerDown={rippleEffectEvent}>
            <span className={styles.icon}>{renderCheckboxIcon()}</span>
            {label}
          </label>
        </div>
      </div>
    )
  }
)

export default Checkbox
