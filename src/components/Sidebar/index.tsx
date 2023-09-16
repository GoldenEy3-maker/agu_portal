import { useRouter } from "next/router"
import {
  BiBarChartSquare,
  BiBell,
  BiCog,
  BiFolder,
  BiGroup,
  BiHelpCircle,
  BiHome,
  BiHomeAlt,
  BiLogOut,
  BiMessageSquareDetail,
  BiSolidBarChartSquare,
  BiSolidBell,
  BiSolidCog,
  BiSolidFolder,
  BiSolidGroup,
  BiSolidHelpCircle,
  BiSolidHome,
  BiSolidMessageAltDetail,
  BiSolidMessageSquareDetail,
  BiUser,
} from "react-icons/bi"
import Link from "~/components/Link"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { PagePaths } from "~/utils/enums"
import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <div className={cls([styles.navGroup, styles.header])}>
          <Link href="#" className={styles.navLink}>
            <BiUser />
          </Link>
        </div>
        <div className={cls([styles.navGroup, styles.main])}>
          <Link
            href={PagePaths.HomePage}
            activeClassName={styles.activeNavLink}
            className={styles.navLink}
          >
            {(isActive) => (isActive ? <BiSolidHome /> : <BiHome />)}
          </Link>
          <Link
            href={PagePaths.NotificationsPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            {(isActive) => (isActive ? <BiSolidBell /> : <BiBell />)}
          </Link>
          <Link
            href={PagePaths.ChatPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            {(isActive) =>
              isActive ? (
                <BiSolidMessageSquareDetail />
              ) : (
                <BiMessageSquareDetail />
              )
            }
          </Link>
          <Link
            href={PagePaths.CoursesPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            {(isActive) => (isActive ? <BiSolidFolder /> : <BiFolder />)}
          </Link>
          <Link
            href={PagePaths.UsersPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            {(isActive) => (isActive ? <BiSolidGroup /> : <BiGroup />)}
          </Link>
          <Link
            href={PagePaths.StatisticsPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            {(isActive) =>
              isActive ? <BiSolidBarChartSquare /> : <BiBarChartSquare />
            }
          </Link>
          <Link
            href={PagePaths.SupportPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            {(isActive) =>
              isActive ? <BiSolidHelpCircle /> : <BiHelpCircle />
            }
          </Link>
        </div>
        <div className={cls([styles.navGroup, styles.footer])}>
          <Link
            href={PagePaths.SettingsPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            {(isActive) => (isActive ? <BiSolidCog /> : <BiCog />)}
          </Link>
          <Link href="#" className={styles.navLink}>
            <BiLogOut />
          </Link>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
