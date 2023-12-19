import { useRef, useState } from "react"
import { cls } from "~/utils/func"
import { useTabsContext } from "./context"
import styles from "./styles.module.sass"

type TrackProps = {
  labels: Record<string, string>
  children:
    | React.ReactNode
    | ((key: string, label: string) => React.ReactNode)
    | (React.ReactNode | ((key: string, label: string) => React.ReactNode))[]
} & Omit<React.ComponentProps<"div">, "children">

export const Track: React.FC<TrackProps> = ({ labels, children, ...props }) => {
  const [isTransitionLock, setIsTransitionLock] = useState(false)

  const trackRef = useRef<HTMLDivElement>(null)

  const startOffsetRef = useRef(0)
  const currentOffsetRef = useRef(0)

  const ctx = useTabsContext()

  const wheelScrolling = (event: React.WheelEvent<HTMLDivElement>) => {
    if (props.onWheel) props.onWheel(event)

    if (!event.shiftKey) return

    const target = event.currentTarget as HTMLElement

    if (event.deltaY > 0) {
      ctx.setOffset(
        (prev) =>
          -Math.min(
            Math.max(event.deltaY - prev, 0),
            target.scrollWidth - target.offsetWidth
          )
      )
    } else {
      ctx.setOffset(
        (prev) =>
          -Math.min(
            Math.max(event.deltaY + prev, 0),
            target.scrollWidth - target.offsetWidth
          )
      )
    }
  }

  const lockTransition = () => setIsTransitionLock(true)
  const unlockTransition = () => setIsTransitionLock(false)

  const pointerMoveHandler = (event: PointerEvent) => {
    const diff = startOffsetRef.current - event.clientX
    const newOffset = currentOffsetRef.current - diff

    ctx.setOffset(
      Math.max(
        Math.min(newOffset, 0),
        -(trackRef.current!.scrollWidth - trackRef.current!.offsetWidth)
      )
    )
  }

  const pointerUpHandler = () => {
    unlockTransition()

    window.removeEventListener("pointermove", pointerMoveHandler)
    window.removeEventListener("pointerup", pointerUpHandler)
  }

  const pointerDownHandler = (event: React.PointerEvent<HTMLDivElement>) => {
    if (props.onPointerDown) props.onPointerDown(event)

    currentOffsetRef.current = ctx.offset
    startOffsetRef.current = event.clientX

    lockTransition()

    window.addEventListener("pointermove", pointerMoveHandler)
    window.addEventListener("pointerup", pointerUpHandler)
  }

  return (
    <div
      {...props}
      className={cls(styles.track, props.className)}
      style={{
        ...props.style,
        transform: `translate3d(${ctx.offset}px, 0, 0)`,
        transition: isTransitionLock ? "none" : undefined,
      }}
      onWheel={wheelScrolling}
      onPointerDown={pointerDownHandler}
      ref={trackRef}
    >
      <span
        className={styles.cursor}
        style={{
          width: ctx.activeItemWidth + "px",
          left: ctx.cursorOffset + "px",
        }}
      />
      {Array.isArray(children)
        ? children.map((child) =>
            typeof child === "function"
              ? Object.keys(labels).map((key) => child(key, labels[key]!))
              : child
          )
        : typeof children === "function"
        ? Object.keys(labels).map((key) => children(key, labels[key]!))
        : children}
    </div>
  )
}
