import {
  BiCalendar,
  BiChevronDown,
  BiCog,
  BiFolder,
  BiGroup,
  BiHelpCircle,
  BiHome,
  BiSolidCalendar,
  BiSolidCog,
  BiSolidFolder,
  BiSolidGroup,
  BiSolidHelpCircle,
  BiSolidHome,
} from "react-icons/bi"
import Link from "~/components/Link"
import { useSidebarStore } from "~/store/sidebar"
import { PagePathMap } from "~/utils/enums"
import { cls } from "~/utils/func"
import Button from "../Button"
import styles from "./styles.module.scss"

type SidebarProps = {
  isModal?: boolean
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const sidebarStore = useSidebarStore()

  const isExpanded = props.isModal ? true : sidebarStore.isExpanded

  return (
    <aside
      className={cls([styles.aside], {
        [styles._modal ?? ""]: !!props.isModal,
      })}
      aria-expanded={isExpanded}
    >
      <nav className={styles.nav}>
        <div className={styles.navGroup}>
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
        </div>
        <div className={styles.navGroup}>
          <span className={styles.navGroupLabel}>Курсы</span>
          <div className={styles.navGroupList}>
            <Link
              href={PagePathMap.CoursesPage + "/1"}
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
            >
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link>
            <Link
              href={PagePathMap.CoursesPage + "/1"}
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
            >
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link>
            <Link
              href={PagePathMap.CoursesPage + "/1"}
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
            >
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link>
            <Link
              href={PagePathMap.CoursesPage + "/1"}
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
            >
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link>
            <Link
              href={PagePathMap.CoursesPage + "/1"}
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
            >
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link>
            <Link
              href={PagePathMap.CoursesPage + "/1"}
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
            >
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link>
            <Link
              href={PagePathMap.CoursesPage + "/1"}
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
            >
              <span>Иностранный язык в профессиональной деятельности</span>
            </Link>

            <Button className={styles.navLink}>
              <BiChevronDown />
              <span>Раскрыть</span>
            </Button>
          </div>
        </div>
        <div className={styles.navGroup}>
          <Link
            href={PagePathMap.SettingsPage}
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
          >
            {(isActive) => (
              <>
                {isActive ? <BiSolidCog /> : <BiCog />}
                <span>Настройки</span>
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
      <nav className={cls([styles.nav, styles._shrinked])}>
        <div className={styles.navGroup}>
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
