import { useState } from "react"
import {
  BiCalendar,
  BiFolder,
  BiGroup,
  BiHelpCircle,
  BiHome,
  BiLogOut,
  BiMenu,
  BiSolidCalendar,
  BiSolidFolder,
  BiSolidGroup,
  BiSolidHelpCircle,
  BiSolidHome,
} from "react-icons/bi"
import Link from "~/components/Link"
import { useModalStore } from "~/store/modal"
import { ModalKeys, PagePaths } from "~/utils/enums"
import { cls } from "~/utils/func"
import Button from "../Button"
import styles from "./styles.module.scss"

const Sidebar: React.FC = () => {
  const modalStore = useModalStore()

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <aside className={styles.aside} aria-expanded={isExpanded}>
      <nav className={styles.nav}>
        <div className={cls([styles.navGroup, styles.main])}>
          <Link
            href={PagePaths.HomePage}
            activeClassName={styles.activeNavLink}
            className={styles.navLink}
          >
            {(isActive) => (
              <>
                {isActive ? <BiSolidHome /> : <BiHome />}
                {isExpanded ? <span>Главная</span> : null}
              </>
            )}
          </Link>
          <Link
            href={PagePaths.CoursesPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            {(isActive) => (
              <>
                {isActive ? <BiSolidFolder /> : <BiFolder />}
                {isExpanded ? <span>Курсы</span> : null}
              </>
            )}
          </Link>
          <Link
            href={PagePaths.UsersPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            {(isActive) => (isActive ? <BiSolidGroup /> : <BiGroup />)}
          </Link>
          <Link
            href={PagePaths.SchedulerPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            {(isActive) => (isActive ? <BiSolidCalendar /> : <BiCalendar />)}
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
          <Button
            className={styles.navLink}
            type="button"
            onClick={(event) =>
              modalStore.open({
                key: ModalKeys.SingOut,
                target: event.currentTarget,
              })
            }
          >
            <BiLogOut />
          </Button>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
