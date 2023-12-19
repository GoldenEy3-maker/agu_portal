import { useEffect, useRef } from "react"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/func"
import { useTabsContext } from "./context"
import styles from "./styles.module.sass"

type ItemProps = {
  id: string
  label: string
  isActive: boolean
} & Omit<React.ComponentProps<"input">, "id" | "name">

export const Item: React.FC<ItemProps> = ({
  className,
  id,
  label,
  isActive,
  ...props
}) => {
  const rippleEffectEvent = useRippleEffect()

  const ctx = useTabsContext()

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.parentElement as HTMLElement
    const track = target.parentElement
    const trackScrollWidth = track?.scrollWidth ?? 0
    const trackOffsetWidth = track?.offsetWidth ?? 0

    ctx.setActiveItemWidth(target.offsetWidth / 2)
    ctx.setCursorOffset(target.offsetLeft + target.offsetWidth / 4)

    ctx.setOffset(
      -Math.min(
        Math.max(target.offsetLeft - target.offsetWidth, 0),
        trackScrollWidth - trackOffsetWidth
      )
    )

    if (props.onChange) props.onChange(event)
  }

  const initialActiveItem = (node: HTMLDivElement | null) => {
    if (node && isActive) {
      const width = node.offsetWidth

      ctx.setActiveItemWidth(width / 2)
      ctx.setCursorOffset(node.offsetLeft + width / 4)
    }
  }

  return (
    <div className={cls(styles.item, className)} ref={initialActiveItem}>
      <input
        {...props}
        type="radio"
        id={id}
        name={ctx.name}
        onChange={changeHandler}
      />
      <label onPointerDown={rippleEffectEvent} htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
