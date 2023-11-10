import { useState } from "react"
import {
  BiCalendar,
  BiCog,
  BiFolder,
  BiLogOut,
  BiSun,
  BiUser,
} from "react-icons/bi"
import Button from "~/components/Button"
import Checkbox from "~/components/Checkbox"
import Link from "~/components/Link"
import * as Popover from "~/components/Popover"
import { useModalStore } from "~/store/modal"
import { useUserStore } from "~/store/user"
import { ModalKeyMap, PagePathMap } from "~/utils/enums"
import styles from "./styles.module.sass"

const PopoverProfile = () => {
  const userStore = useUserStore()
  const modalStore = useModalStore()
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  return (
    <Popover.Root>
      <Popover.Trigger variant="filled" asIcon color="default">
        <BiUser />
      </Popover.Trigger>
      <Popover.Content className={styles.popover}>
        {(close) => (
          <>
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
                type="check"
                leadingIcon={<BiSun />}
                checked={isDarkTheme}
                name="change-theme"
                id="change-theme"
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
          </>
        )}
      </Popover.Content>
    </Popover.Root>
  )
}

export default PopoverProfile