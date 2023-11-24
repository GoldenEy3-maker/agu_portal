import { useRouter } from "next/router"
import { useRef } from "react"
import toast from "react-hot-toast"
import Button from "~/components/Button"
import * as Modal from "~/components/Modal"
import { useAutoFocus } from "~/hooks/autoFocus.hook"
import { useModalStore } from "~/store/modal"
import { useSessionStore } from "~/store/session"
import { api } from "~/utils/api"
import { ModalKeyMap, PagePathMap } from "~/utils/enums"

const LogOutModal: React.FC = () => {
  const router = useRouter()
  const modalStore = useModalStore()
  const sessionStore = useSessionStore()
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const closeModalHandler = () => modalStore.close()

  const isModalOpen = modalStore.queue.at(-1) === ModalKeyMap.LogOut

  const logOut = api.auth.logOut.useMutation({
    onSuccess() {
      router.push(PagePathMap.HomePage)
      sessionStore.clear()
      modalStore.close(ModalKeyMap.LogOut)
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
        Вы можете покинуть этот аккаунт. После чего перейдете в режим гостя, в
        котором ограничен доступ ко многим элементам портала.
      </Modal.Content>
      <Modal.Footer>
        <Button
          type="button"
          onClick={closeModalHandler}
          textAlign="center"
          ref={cancelButtonRef}
          disabled={logOut.isLoading}
        >
          Отмена
        </Button>
        <Button
          variant="filled"
          color="danger"
          type="button"
          textAlign="center"
          onClick={() => logOut.mutate()}
          disabled={logOut.isLoading}
          loading={logOut.isLoading}
        >
          Выйти
        </Button>
      </Modal.Footer>
    </Modal.Root>
  )
}

export default LogOutModal
