import { useMemo, useRef } from "react"
import Button from "~/components/Button"
import * as Modal from "~/components/Modal"
import { useAutoFocus } from "~/hooks/autoFocus.hook"
import { useModalStore } from "~/store/modal"
import { ModalKeys } from "~/utils/enums"

const SingOutModal: React.FC = () => {
  const modalStore = useModalStore()
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const closeModalHandler = () => modalStore.close(ModalKeys.SingOut)

  const isModalOpen = useMemo(
    () => modalStore.queue.at(-1) === ModalKeys.SingOut,
    [modalStore.queue]
  )

  useAutoFocus(cancelButtonRef, isModalOpen)

  return (
    <Modal.Root state={isModalOpen} closeHandler={closeModalHandler}>
      <Modal.Wrapper>
        <Modal.Header>
          <Modal.Title>Вы действительно хотите выйти?</Modal.Title>
          <Modal.Close onClick={closeModalHandler} />
        </Modal.Header>
        <Modal.Content>
          Вы можете покинуть этот аккаунт. После чего попадете в режим гостя, в
          котором ограничен доступ к многим элементам портала.
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
      </Modal.Wrapper>
    </Modal.Root>
  )
}

export default SingOutModal
