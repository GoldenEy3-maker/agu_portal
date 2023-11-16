import {
  BiCalendar,
  BiCog,
  BiFolder,
  BiLogOut,
  BiMoon,
  BiUser,
} from "react-icons/bi"
import Button from "~/components/Button"
import Checkbox from "~/components/Checkbox"
import Link from "~/components/Link"
import * as Popover from "~/components/Popover"
import { useLocalStorage } from "~/hooks/localStorage"
import { useModalStore } from "~/store/modal"
import { useUserStore } from "~/store/user"
import { LocalStorageKeyMap, ModalKeyMap, PagePathMap } from "~/utils/enums"
import styles from "./styles.module.sass"

const PopoverProfile: React.FC = () => {
  const userStore = useUserStore()
  const modalStore = useModalStore()

  const [isDarkTheme, setIsDarkTheme] = useLocalStorage(
    LocalStorageKeyMap.isDarkTheme,
    false
  )

  return (
    <Popover.Root>
      <Popover.Trigger variant="filled" asIcon>
        <BiUser />
      </Popover.Trigger>
      <Popover.Wrapper className={styles.popover}>
        {(close) => (
          <Popover.Content>
            <div className={styles.profile}>
              <div className={styles.profileImg}>
                <span>
                  <BiUser />
                </span>
              </div>
              <p className={styles.credentials}>
                <strong>
                  {userStore.user?.surname}&nbsp;{userStore.user?.name}&nbsp;
                  {userStore.user?.patronymic}
                </strong>
                &nbsp;
                <span className={styles.credentialsRole}>
                  {userStore.user?.role}
                </span>
              </p>
              <p className={styles.profileEmail}>
                {userStore.user?.email ?? "Email не привязан"}
              </p>
            </div>
            <nav className={styles.nav}>
              <Checkbox
                label="Темная тема"
                type="switch"
                leadingIcon={<BiMoon />}
                controllerPosition="right"
                checked={isDarkTheme}
                name="change-theme"
                id="change-theme"
                className={styles.themeController}
                onChange={(checked) => setIsDarkTheme(checked)}
              />
              <hr />
              <Link
                color="default"
                href={PagePathMap.CoursesPage}
                className={styles.navLink}
              >
                <BiFolder /> <span>Курсы</span>
              </Link>
              <Link
                color="default"
                href={PagePathMap.SchedulerPage}
                className={styles.navLink}
              >
                <BiCalendar /> <span>Расписание</span>
              </Link>
              <Link
                color="default"
                href={PagePathMap.SettingsPage}
                className={styles.navLink}
              >
                <BiCog /> <span>Настройки</span>
              </Link>
              <hr />
              <Button
                type="button"
                color="danger"
                className={styles.navLink}
                onClick={() => {
                  modalStore.open({ key: ModalKeyMap.SignOut })
                  close()
                }}
              >
                <BiLogOut /> <span>Выход</span>
              </Button>
            </nav>
          </Popover.Content>
        )}
      </Popover.Wrapper>
    </Popover.Root>
  )
}

export default PopoverProfile
