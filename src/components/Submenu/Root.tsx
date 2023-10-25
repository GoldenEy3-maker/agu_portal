import { useState } from "react"
import { cls } from "~/utils/func"
import { SubmenuContext } from "./context"
import styles from "./styles.module.sass"

export const Root: React.FC<React.ComponentProps<"div">> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggle = () => setIsExpanded((state) => !state)

  return (
    <SubmenuContext.Provider value={{ isExpanded, toggle }}>
      <div
        {...props}
        className={cls([styles.root, props.className])}
        aria-expanded={isExpanded}
      >
        {props.children}
      </div>
    </SubmenuContext.Provider>
  )
}
