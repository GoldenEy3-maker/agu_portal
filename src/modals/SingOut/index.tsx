import { useEffect, useMemo, useRef } from "react"
import Button from "~/components/Button"
import * as Modal from "~/components/Modal"
import { useModalStore } from "~/store/modal"
import { ModalKeys } from "~/utils/enums"

const SingOutModal: React.FC = () => {
  const modalStore = useModalStore()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const closeModalHandler = () => modalStore.close(ModalKeys.SingOut)

  const isModalOpen = useMemo(
    () => modalStore.queue.at(-1) === ModalKeys.SingOut,
    [modalStore.queue]
  )

  useEffect(() => {
    if (isModalOpen && closeButtonRef.current)
      setTimeout(() => closeButtonRef.current?.focus(), 30)
  }, [isModalOpen, closeButtonRef.current])

  return (
    <Modal.Root state={isModalOpen}>
      <Modal.Wrapper>
        <Modal.Header>
          <Modal.Title>Вы действительно хотите выйти?</Modal.Title>
          <Modal.Close ref={closeButtonRef} onClick={closeModalHandler} />
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
