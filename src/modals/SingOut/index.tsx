import { useRef } from "react"
import Button from "~/components/Button"
import * as Modal from "~/components/Modal"
import { useAutoFocus } from "~/hooks/autoFocus.hook"
import { useModalStore } from "~/store/modal"
import { ModalKeyMap } from "~/utils/enums"

const SingOutModal: React.FC = () => {
  const modalStore = useModalStore()
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const closeModalHandler = () => modalStore.close()

  const isModalOpen = modalStore.queue.at(-1) === ModalKeyMap.SingOut

  useAutoFocus(cancelButtonRef, isModalOpen)

  return (
    <Modal.Root state={isModalOpen} asDrawer>
      <Modal.Header>
        <Modal.Title>Вы действительно хотите выйти?</Modal.Title>
        <Modal.Close onClick={closeModalHandler} />
      </Modal.Header>
      <Modal.Content>
        Вы можете покинуть этот аккаунт. После чего попадете в режим гостя, в
        котором ограничен доступ ко многим элементам портала.
      </Modal.Content>
      <Modal.Footer>
        <Button
          variant="elevated"
          type="button"
          onClick={closeModalHandler}
          textAlign="center"
          ref={cancelButtonRef}
        >
          Отмена
        </Button>
        <Button
          variant="filled"
          color="danger"
          type="button"
          textAlign="center"
        >
          Выйти
        </Button>
      </Modal.Footer>
    </Modal.Root>
  )
}

export default SingOutModal
