import { useState } from "react"
import { cls } from "~/utils/func"
import { TabsContext } from "./context"
import styles from "./styles.module.sass"

type RootProps = {
  name: string
} & React.ComponentProps<"div">

export const Root: React.FC<RootProps> = ({ name, ...props }) => {
  const [offset, setOffset] = useState(0)
  const [cursorOffset, setCursorOffset] = useState(0)
  const [activeItemWidth, setActiveItemWidth] = useState(0)

  return (
    <TabsContext.Provider
      value={{
        name,
        offset,
        cursorOffset,
        activeItemWidth,
        setOffset,
        setActiveItemWidth,
        setCursorOffset,
      }}
    >
      <div {...props} className={cls(styles.root, props.className)}>
        {props.children}
      </div>
    </TabsContext.Provider>
  )
}
