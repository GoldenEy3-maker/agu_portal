import * as Modal from "~/components/Modal"
import { useModalStore } from "~/store/modal"
import { ModalKeyMap } from "~/utils/enums"

const NotificationsModal: React.FC = () => {
  const modalStore = useModalStore()

  const isModalOpen = modalStore.queue.at(-1) === ModalKeyMap.Notifications

  const closeModalHandler = () => modalStore.close(ModalKeyMap.Notifications)

  return (
    <Modal.Root state={isModalOpen} asDrawer>
      <Modal.Header>
        <Modal.Title>Уведомления</Modal.Title>
        <Modal.Close onClick={closeModalHandler} />
      </Modal.Header>
      <Modal.Content>
        <ul>
          <li>Уведомление 1</li>
          <li>Уведомление 2</li>
          <li>Уведомление 3</li>
          <li>Уведомление 4</li>
        </ul>
      </Modal.Content>
    </Modal.Root>
  )
}

export default NotificationsModal
