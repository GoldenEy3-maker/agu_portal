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
  BiUser,
} from "react-icons/bi"
import Link from "~/components/Link"
import SingInModal from "~/modals/SingIn"
import SingOutModal from "~/modals/SingOut"
import { useModalStore } from "~/store/modal"
import { ModalKeys, PagePaths } from "~/utils/enums"
import { cls } from "~/utils/func"
import Button from "../Button"
import styles from "./styles.module.scss"

const Sidebar: React.FC = () => {
  const modalStore = useModalStore()

  return (
    <>
      <SingInModal />
      <SingOutModal />
      <aside className={styles.aside}>
        <nav className={styles.nav}>
          <div className={cls([styles.navGroup, styles.header])}>
            <div className={styles.signIn}>
              <Button
                asIcon
                variant="filled"
                onClick={() => modalStore.open(ModalKeys.SignIn)}
              >
                <BiUser />
              </Button>
              <span>Гость</span>
            </div>
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
            <Link
              href={PagePaths.SettingsPage}
              className={styles.navLink}
              activeClassName={styles.activeNavLink}
            >
              {(isActive) => (isActive ? <BiSolidCog /> : <BiCog />)}
            </Link>
            <Button
              className={styles.navLink}
              type="button"
              onClick={() => modalStore.open(ModalKeys.SingOut)}
            >
              <BiLogOut />
            </Button>
          </div>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
