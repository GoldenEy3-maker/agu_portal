import {
  BiBell,
  BiCalendar,
  BiCog,
  BiFolder,
  BiGroup,
  BiHelpCircle,
  BiHome,
  BiLogOut,
  BiMessageSquareDetail,
  BiSolidBell,
  BiSolidCalendar,
  BiSolidCog,
  BiSolidFolder,
  BiSolidGroup,
  BiSolidHelpCircle,
  BiSolidHome,
  BiSolidMessageSquareDetail,
} from "react-icons/bi"
import Link from "~/components/Link"
import { PagePaths } from "~/utils/enums"
import { cls } from "~/utils/func"
import ProfileIcon from "../ProfileIcon"
import styles from "./styles.module.scss"

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <div className={cls([styles.navGroup, styles.header])}>
          <ProfileIcon />
        </div>
        <div className={cls([styles.navGroup, styles.main])}>
          <Link
            href={PagePaths.HomePage}
            activeClassName={styles.activeNavLink}
            className={styles.navLink}
            asIcon
          >
            {(isActive) => (isActive ? <BiSolidHome /> : <BiHome />)}
          </Link>
          <Link
            href={PagePaths.NotificationsPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            asIcon
          >
            {(isActive) => (isActive ? <BiSolidBell /> : <BiBell />)}
          </Link>
          <Link
            href={PagePaths.ChatPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            asIcon
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
            asIcon
          >
            {(isActive) => (isActive ? <BiSolidFolder /> : <BiFolder />)}
          </Link>
          <Link
            href={PagePaths.UsersPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            asIcon
          >
            {(isActive) => (isActive ? <BiSolidGroup /> : <BiGroup />)}
          </Link>
          <Link
            href={PagePaths.SchedulerPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            asIcon
          >
            {(isActive) => (isActive ? <BiSolidCalendar /> : <BiCalendar />)}
          </Link>
          <Link
            href={PagePaths.SupportPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            asIcon
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
            asIcon
          >
            {(isActive) => (isActive ? <BiSolidCog /> : <BiCog />)}
          </Link>
          <Link href="#" className={styles.navLink} asIcon>
            <BiLogOut />
          </Link>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
