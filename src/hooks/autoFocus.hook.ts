import { useEffect } from "react"

export const useAutoFocus = (
  target: React.RefObject<HTMLElement>,
  state: boolean
) => {
  useEffect(() => {
    if (!target.current || !state) return

    setTimeout(() => target.current?.focus(), 30)
    // target.current.focus()
  }, [state])
}
