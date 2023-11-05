import toast from "react-hot-toast"
import { BiCalendar, BiCog, BiFolder, BiLogOut, BiUser } from "react-icons/bi"
import Button from "~/components/Button"
import Link from "~/components/Link"
import * as Popover from "~/components/Popover"
import { useModalStore } from "~/store/modal"
import { useUserStore } from "~/store/user"
import { api } from "~/utils/api"
import { ModalKeyMap, PagePathMap } from "~/utils/enums"
import styles from "./styles.module.sass"

const PopoverProfile = () => {
  const userStore = useUserStore()
  const modalStore = useModalStore()

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
              <span className={styles.credentials}>
                <strong>
                  {userStore.user?.surname} {userStore.user?.name}{" "}
                  {userStore.user?.patronymic}
                </strong>
                &nbsp;
                <span className={styles.credentialsRole}>
                  {userStore.user?.role}
                </span>
              </span>
              <span className={styles.profileEmail}>
                {userStore.user?.email ?? "Email не привязан"}
              </span>
            </div>
            <nav className={styles.nav}>
              <Link color="default" href={PagePathMap.CoursesPage}>
                <BiFolder /> <span>Курсы</span>
              </Link>
              <Link color="default" href={PagePathMap.SchedulerPage}>
                <BiCalendar /> <span>Расписание</span>
              </Link>
              <Link color="default" href={PagePathMap.SettingsPage}>
                <BiCog /> <span>Настройки</span>
              </Link>
              <hr />
              <Button
                type="button"
                color="default"
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
