import * as Modal from "~/components/Modal"
import SingInModal from "~/modals/SingIn"
import SingOutModal from "~/modals/SingOut"
import { useModalStore } from "~/store/modal"

const ModalContainer: React.FC = () => {
  const modalStore = useModalStore()

  return (
    <Modal.Root
      state={modalStore.queue.length !== 0}
      closeHandler={() => modalStore.close()}
    >
      <SingInModal />
      <SingOutModal />
    </Modal.Root>
  )
}

export default ModalContainer
