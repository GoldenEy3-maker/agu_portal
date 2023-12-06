import toast from "react-hot-toast"
import Button from "~/components/Button"
import * as Modal from "~/components/Modal"
import { useModalStore } from "~/store/modal"
import { api } from "~/utils/api"
import { ModalKeyMap } from "~/utils/enums"

const DeleteNotificationsModal = () => {
  const modalStore = useModalStore()
  const isModalOpen =
    modalStore.queue.at(-1) === ModalKeyMap.DeleteNotifications

  const closeModalHandler = () =>
    modalStore.close(ModalKeyMap.DeleteNotifications)

  const getNotificationsQuery = api.notification.getAllBySession.useQuery()

  const deleteNotifications = api.notification.deleteAll.useMutation({
    onSuccess() {
      toast.success("Уведомления успешно удалены.")
      getNotificationsQuery.refetch()
      closeModalHandler()
    },
    onError(error) {
      console.log("🚀 ~ file: index.tsx:20 ~ onError ~ error:", error)
      toast.error(error.message)
    },
  })

  return (
    <Modal.Root state={isModalOpen}>
      <Modal.Header>
        <Modal.Title>Удалить уведомления</Modal.Title>
        <Modal.Close onClick={closeModalHandler} />
      </Modal.Header>
      <Modal.Content>
        <p>Ваши уведомления пропадут навседа!</p>
      </Modal.Content>
      <Modal.Footer>
        <Button
          type="button"
          onClick={closeModalHandler}
          disabled={deleteNotifications.isLoading}
        >
          Отмена
        </Button>
        <Button
          type="button"
          color="danger"
          variant="filled"
          disabled={deleteNotifications.isLoading}
          loading={deleteNotifications.isLoading}
          onClick={() => deleteNotifications.mutate()}
        >
          Удалить
        </Button>
      </Modal.Footer>
    </Modal.Root>
  )
}

export default DeleteNotificationsModal
