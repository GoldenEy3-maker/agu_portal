import { useEffect } from "react"

export const useAutoFocus = (
  target: React.RefObject<HTMLElement>,
  state: boolean
) => {
  useEffect(() => {
    if (!target.current || !state) return

    setTimeout(() => {
      target.current!.focus({ preventScroll: true })
      target.current!.dataset.autoFocus = "true"
      target.current!.addEventListener("blur", () =>
        target.current!.removeAttribute("data-auto-focus")
      )
    }, 30)
  }, [state])
}
