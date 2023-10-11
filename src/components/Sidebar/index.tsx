import { useState } from "react"
import {
  BiCalendar,
  BiFolder,
  BiGroup,
  BiHelpCircle,
  BiHome,
  BiSolidCalendar,
  BiSolidFolder,
  BiSolidGroup,
  BiSolidHelpCircle,
  BiSolidHome,
} from "react-icons/bi"
import Link from "~/components/Link"
import { PagePathMap } from "~/utils/enums"
import { cls } from "~/utils/func"
import styles from "./styles.module.scss"

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <aside className={styles.aside} aria-expanded={isExpanded}>
      <nav className={styles.nav}>
        <div className={cls([styles.navGroup, styles.main])}>
          <Link
            href={PagePathMap.HomePage}
            activeClassName={styles.activeNavLink}
            className={styles.navLink}
          >
            {(isActive) => (
              <>
                {isActive ? <BiSolidHome /> : <BiHome />}
                <span>Главная</span>
              </>
            )}
          </Link>
          <Link
            href={PagePathMap.CoursesPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            {(isActive) => (
              <>
                {isActive ? <BiSolidFolder /> : <BiFolder />}
                <span>Курсы</span>
              </>
            )}
          </Link>
          <Link
            href={PagePathMap.UsersPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            {(isActive) => (
              <>
                {isActive ? <BiSolidGroup /> : <BiGroup />}
                <span>Люди</span>
              </>
            )}
          </Link>
          <Link
            href={PagePathMap.SchedulerPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            {(isActive) => (
              <>
                {isActive ? <BiSolidCalendar /> : <BiCalendar />}
                <span>Календарь</span>
              </>
            )}
          </Link>
          <Link
            href={PagePathMap.SupportPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            {(isActive) => (
              <>
                {isActive ? <BiSolidHelpCircle /> : <BiHelpCircle />}
                <span>Поддержка</span>
              </>
            )}
          </Link>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
