import Image from "next/image"
import { BiBell, BiMenu, BiMessageSquareDetail, BiUser } from "react-icons/bi"
import Skeleton from "react-loading-skeleton"
import HeaderLogoPng from "~/assets/header_logo_resized.png"
import { useWinEventListener } from "~/hooks/winEvent.hook"
import { useModalStore } from "~/store/modal"
import { useSidebarStore } from "~/store/sidebar"
import { useUserStore } from "~/store/user"
import { api } from "~/utils/api"
import { ModalKeyMap } from "~/utils/enums"
import { cls } from "~/utils/func"
import Button from "../Button"
import styles from "./styles.module.sass"

const Header: React.FC = () => {
  const modalStore = useModalStore()
  const sidebarStore = useSidebarStore()
  const userStore = useUserStore()

  const getSessionQuery = api.user.getSession.useQuery()

  const changeTypeSidebarHandler = () => {
    if (
      window.innerWidth > 1300 &&
      modalStore.queue.at(-1) === ModalKeyMap.Sidebar
    )
      modalStore.close(ModalKeyMap.Sidebar)
  }

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
          className={cls([styles.sidebarControl, styles._modal])}
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
              <Button type="button" asIcon color="default">
                <BiBell />
              </Button>
              <Button type="button" asIcon color="default">
                <BiMessageSquareDetail />
              </Button>
              <Button variant="filled" asIcon color="default">
                <BiUser />
              </Button>
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
