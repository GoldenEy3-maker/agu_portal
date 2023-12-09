"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const Button_1 = __importDefault(require("~/components/Button"));
const Modal = __importStar(require("~/components/Modal"));
const modal_1 = require("~/store/modal");
const api_1 = require("~/utils/api");
const enums_1 = require("~/utils/enums");
const DeleteNotificationsModal = () => {
    const modalStore = (0, modal_1.useModalStore)();
    const isModalOpen = modalStore.queue.at(-1) === enums_1.ModalKeyMap.DeleteNotifications;
    const closeModalHandler = () => modalStore.close(enums_1.ModalKeyMap.DeleteNotifications);
    const getNotificationsQuery = api_1.api.notification.getBySession.useQuery();
    const clearNotifications = api_1.api.notification.clear.useMutation({
        onSuccess() {
            react_hot_toast_1.default.success("Уведомления успешно удалены.");
            getNotificationsQuery.refetch();
            closeModalHandler();
        },
        onError(error) {
            console.log("🚀 ~ file: index.tsx:20 ~ onError ~ error:", error);
            react_hot_toast_1.default.error(error.message);
        },
    });
    return (<Modal.Root state={isModalOpen}>
      <Modal.Header>
        <Modal.Title>Удалить уведомления</Modal.Title>
        <Modal.Close onClick={closeModalHandler}/>
      </Modal.Header>
      <Modal.Content>
        <p>Ваши уведомления пропадут навседа!</p>
      </Modal.Content>
      <Modal.Footer>
        <Button_1.default type="button" onClick={closeModalHandler} disabled={clearNotifications.isLoading}>
          Отмена
        </Button_1.default>
        <Button_1.default type="button" color="danger" variant="filled" disabled={clearNotifications.isLoading} loading={clearNotifications.isLoading} onClick={() => clearNotifications.mutate()}>
          Удалить
        </Button_1.default>
      </Modal.Footer>
    </Modal.Root>);
};
exports.default = DeleteNotificationsModal;
