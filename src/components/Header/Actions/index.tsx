import Button from "~/components/Button"
import { IconChat, IconUser } from "~/components/Icons"
import { useModalStore } from "~/store/modal"
import { useSessionStore } from "~/store/session"
import { api } from "~/utils/api"
import { ModalKeyMap } from "~/utils/enums"
import PopoverNotifications from "../PopoverNotifications"
import PopoverProfile from "../PopoverProfile"
import LoadingSkeleton from "./LoadingSkeleton"
import styles from "./styles.module.sass"

const Actions: React.FC = () => {
  const modalStore = useModalStore()
  const sessionStore = useSessionStore()

  const getSessionQuery = api.auth.getSession.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
  })

  return (
    <div className={styles.actions}>
      {!getSessionQuery.isLoading ? (
        sessionStore.token ? (
          <>
            <PopoverNotifications />
            <Button
              type="button"
              asIcon
              color="default"
              onClick={() => modalStore.open({ key: ModalKeyMap.Chat })}
            >
              <IconChat />
            </Button>
            <PopoverProfile />
          </>
        ) : (
          <Button
            className={styles.singinButton}
            variant="outlined"
            onClick={(event) =>
              modalStore.open({
                key: ModalKeyMap.SignIn,
                target: event.currentTarget,
              })
            }
          >
            <IconUser />
            Войти
          </Button>
        )
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  )
}

export default Actions
