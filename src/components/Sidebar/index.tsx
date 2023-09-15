import Link from "next/link"
import {
  BiBarChartSquare,
  BiBell,
  BiCog,
  BiFolder,
  BiGroup,
  BiHelpCircle,
  BiHomeAlt,
  BiLogOut,
  BiMessageSquareDetail,
  BiUser,
} from "react-icons/bi"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

const Sidebar: React.FC = () => {
  const rippleEffectEvent = useRippleEffect()

  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <div className={cls([styles.navGroup, styles.header])}>
          <Link href="#" onPointerDown={rippleEffectEvent}>
            <BiUser />
          </Link>
        </div>
        <div className={cls([styles.navGroup, styles.main])}>
          <Link href="#" onPointerDown={rippleEffectEvent}>
            <BiHomeAlt />
          </Link>
          <Link href="#" onPointerDown={rippleEffectEvent}>
            <BiBell />
          </Link>
          <Link href="#" onPointerDown={rippleEffectEvent}>
            <BiMessageSquareDetail />
          </Link>
          <Link href="#" onPointerDown={rippleEffectEvent}>
            <BiFolder />
          </Link>
          <Link href="#" onPointerDown={rippleEffectEvent}>
            <BiGroup />
          </Link>
          <Link href="#" onPointerDown={rippleEffectEvent}>
            <BiBarChartSquare />
          </Link>
          <Link href="#" onPointerDown={rippleEffectEvent}>
            <BiHelpCircle />
          </Link>
        </div>
        <div className={cls([styles.navGroup, styles.footer])}>
          <Link href="#" onPointerDown={rippleEffectEvent}>
            <BiCog />
          </Link>
          <Link href="#" onPointerDown={rippleEffectEvent}>
            <BiLogOut />
          </Link>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
