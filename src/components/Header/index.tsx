import Image from "next/image"
import { BiBell, BiMenu, BiMessageSquareDetail, BiUser } from "react-icons/bi"
import HeaderLogoPng from "~/assets/header_logo_resized.png"
import { useModalStore } from "~/store/modal"
import { ModalKeys } from "~/utils/enums"
import Button from "../Button"
import styles from "./styles.module.scss"

const Header: React.FC = () => {
  const modalStore = useModalStore()

  return (
    <header className={styles.header}>
      <div className={styles.leftSide}>
        <Button className={styles.menu} asIcon type="button">
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
        <Button type="button" asIcon>
          <BiBell />
        </Button>
        <Button type="button" asIcon>
          <BiMessageSquareDetail />
        </Button>
        <Button
          variant="filled"
          asIcon
          onClick={(event) =>
            modalStore.open({
              key: ModalKeys.SignIn,
              target: event.currentTarget,
            })
          }
        >
          <BiUser />
        </Button>
      </div>
    </header>
  )
}

export default Header
