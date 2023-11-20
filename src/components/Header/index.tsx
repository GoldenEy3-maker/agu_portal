import Image from "next/image"
import Pusher from "pusher-js"
import { useEffect } from "react"
import { BiChat, BiMenu, BiUser } from "react-icons/bi"
import Skeleton from "react-loading-skeleton"
import HeaderLogoPng from "~/assets/header_logo_resized.png"
import { env } from "~/env.mjs"
import { useWinEventListener } from "~/hooks/winEvent.hook"
import { useModalStore } from "~/store/modal"
import { useSessionStore } from "~/store/session"
import { useSidebarStore } from "~/store/sidebar"
import { api } from "~/utils/api"
import { ModalKeyMap, PusherChannelMap, PusherEventMap } from "~/utils/enums"
import { cls } from "~/utils/func"
import {
  useChannelSubscribe,
  usePresenceChannelSubscribe,
} from "~/utils/pusher"
import Button from "../Button"
import PopoverNotifications from "./PopoverNotifications"
import PopoverProfile from "./PopoverProfile"
import styles from "./styles.module.sass"

const Header: React.FC = () => {
  const modalStore = useModalStore()
  const sidebarStore = useSidebarStore()
  const userStore = useSessionStore()

  const getSessionQuery = api.auth.getSession.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
  })

  const changeTypeSidebarHandler = () => {
    if (
      window.innerWidth > 1300 &&
      modalStore.queue.at(-1) === ModalKeyMap.Sidebar
    )
      modalStore.close(ModalKeyMap.Sidebar)
  }

  const members = usePresenceChannelSubscribe(
    PusherChannelMap.Auth,
    "sing-in-user",
    (data) => console.log(data)
  )
  usePresenceChannelSubscribe(PusherChannelMap.Auth, "sing-out-user", (data) =>
    console.log(data)
  )

  console.log(members)

  // useEffect(() => {
  //   const pusherClient = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
  //     cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
  //   })
  //   pusherClient.connect()
  //   const channel = pusherClient.subscribe(PusherChannelMap.Auth)
  //   channel.bind(PusherEventMap.SignInUser, (data: unknown) =>
  //     console.log(data)
  //   )

  //   return () => {
  //     channel.unsubscribe()
  //     pusherClient.disconnect()
  //   }
  // }, [])

  useWinEventListener("resize", changeTypeSidebarHandler)

  return (
    <header className={styles.header}>
      <div className={styles.leftSide}>
        <Button
          className={styles.sidebarControl}
          asIcon
          type="button"
          color="default"
          onClick={sidebarStore.toggle}
        >
          <BiMenu />
        </Button>
        <Button
          className={cls(styles.sidebarControl, styles._modal)}
          asIcon
          type="button"
          color="default"
          onClick={() => modalStore.open({ key: ModalKeyMap.Sidebar })}
        >
          <BiMenu />
        </Button>
        <div className={styles.title}>
          <Image
            src={HeaderLogoPng}
            alt=""
            width={HeaderLogoPng.width}
            height={HeaderLogoPng.height}
          />
          <h3 className={styles.title}>Цифровой университет АлтГУ</h3>
        </div>
      </div>
      <div className={styles.actions}>
        {!getSessionQuery.isLoading ? (
          userStore.token ? (
            <>
              <PopoverNotifications />
              <Button
                type="button"
                asIcon
                color="default"
                onClick={() => modalStore.open({ key: ModalKeyMap.Chat })}
              >
                {/* <BiMessageSquareDetail /> */}
                <BiChat />
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
              <BiUser />
              Войти
            </Button>
          )
        ) : (
          <>
            <Skeleton width={45} height={45} circle />
            <Skeleton width={45} height={45} circle />
            <Skeleton width={45} height={45} circle />
          </>
        )}
      </div>
    </header>
  )
}

export default Header
