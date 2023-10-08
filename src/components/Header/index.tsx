import { useRef } from "react"
import { BiBell, BiMessageSquareDetail, BiUser } from "react-icons/bi"
import { useModalStore } from "~/store/modal"
import { ModalKeys } from "~/utils/enums"
import Button from "../Button"
import styles from "./styles.module.scss"

const Header: React.FC = () => {
  const modalStore = useModalStore()

  return (
    <header className={styles.header}>
      <h3 className={styles.title}>Цифровой университет АлтГУ</h3>
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
