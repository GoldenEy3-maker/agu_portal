import { useEffect } from "react"

export const useAutoFocus = (
  target: React.RefObject<HTMLElement>,
  state: boolean
) => {
  useEffect(() => {
    if (!target.current || !state) return

    setTimeout(() => {
      target.current!.focus({ preventScroll: true })
      target.current!.dataset.programFocus = "true"
      target.current!.addEventListener("blur", () =>
        target.current!.removeAttribute("data-program-focus")
      )
    }, 30)
  }, [state])
}
