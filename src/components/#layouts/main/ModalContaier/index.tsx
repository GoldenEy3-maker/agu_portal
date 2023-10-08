import * as Modal from "~/components/Modal"
import SingInModal from "~/modals/SingIn"
import SingOutModal from "~/modals/SingOut"
import { useModalStore } from "~/store/modal"

const ModalContainer: React.FC = () => {
  const modalStore = useModalStore()

  return (
    <Modal.Container
      state={modalStore.queue.length !== 0}
      closeHandler={() => modalStore.close()}
    >
      <SingInModal />
      <SingOutModal />
    </Modal.Container>
  )
}

export default ModalContainer
