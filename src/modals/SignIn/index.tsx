import { useEffect, useMemo, useRef } from "react"
import Button from "~/components/Button"
import * as Modal from "~/components/Modal"
import { useModalStore } from "~/store/modal"
import { ModalKeys } from "~/utils/enums"

const SignInModal: React.FC = () => {
  const modalStore = useModalStore()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isModalOpen = useMemo(
    () => modalStore.queue.at(-1) === ModalKeys.SignIn,
    [modalStore.queue]
  )
  const closeModalHandler = () => modalStore.close(ModalKeys.SignIn)

  useEffect(() => {
    if (isModalOpen && closeButtonRef.current)
      setTimeout(() => closeButtonRef.current?.focus(), 30)
  }, [isModalOpen, closeButtonRef.current])

  return (
    <Modal.Root
      state={modalStore.queue.at(-1) === ModalKeys.SignIn}
      closeHandler={closeModalHandler}
    >
      <Modal.Wrapper>
        <Modal.Header>
          <Modal.Title>Войти</Modal.Title>
          <Modal.Close ref={closeButtonRef} onClick={closeModalHandler} />
        </Modal.Header>
        <Modal.Content>
          <form action="">
            <label htmlFor="test">Test</label>
            <input type="text" id="test" ref={inputRef} />
          </form>
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
            type="button"
            onClick={() => modalStore.open(ModalKeys.SingOut)}
            textAlign="center"
          >
            Выйти
          </Button>
        </Modal.Footer>
      </Modal.Wrapper>
    </Modal.Root>
  )
}

export default SignInModal
