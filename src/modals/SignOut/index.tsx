import { useRef } from "react"
import toast from "react-hot-toast"
import Button from "~/components/Button"
import * as Modal from "~/components/Modal"
import { useAutoFocus } from "~/hooks/autoFocus.hook"
import { useModalStore } from "~/store/modal"
import { useUserStore } from "~/store/user"
import { api } from "~/utils/api"
import { ModalKeyMap } from "~/utils/enums"

const SignOutModal: React.FC = () => {
  const modalStore = useModalStore()
  const userStore = useUserStore()
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const closeModalHandler = () => modalStore.close()

  const isModalOpen = modalStore.queue.at(-1) === ModalKeyMap.SignOut

  const signOut = api.user.signOut.useMutation({
    onSuccess() {
      userStore.clear()
      modalStore.close(ModalKeyMap.SignOut)
    },
    onError(error) {
      console.log("🚀 ~ file: index.tsx:24 ~ onError ~ error:", error)
      toast.error(error.message)
    },
  })

  useAutoFocus(cancelButtonRef, isModalOpen)

  return (
    <Modal.Root state={isModalOpen}>
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
          onClick={() => signOut.mutate()}
        >
          Выйти
        </Button>
      </Modal.Footer>
    </Modal.Root>
  )
}

export default SignOutModal
