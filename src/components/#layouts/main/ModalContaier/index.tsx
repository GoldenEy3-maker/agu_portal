import * as Modal from "~/components/Modal"
import ChatModal from "~/modals/Chat"
import LogOutModal from "~/modals/LogOut"
import SidebarModal from "~/modals/Sidebar"
import SignInModal from "~/modals/SignIn"
import { useModalStore } from "~/store/modal"

const ModalContainer: React.FC = () => {
  const modalStore = useModalStore()

  return (
    <Modal.Container
      state={modalStore.queue.length !== 0}
      closeHandler={modalStore.close}
    >
      <SidebarModal />
      <SignInModal />
      <LogOutModal />
      <ChatModal />
    </Modal.Container>
  )
}

export default ModalContainer
