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
const router_1 = require("next/router");
const react_1 = require("react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const Button_1 = __importDefault(require("~/components/Button"));
const Modal = __importStar(require("~/components/Modal"));
const autoFocus_hook_1 = require("~/hooks/autoFocus.hook");
const modal_1 = require("~/store/modal");
const session_1 = require("~/store/session");
const api_1 = require("~/utils/api");
const enums_1 = require("~/utils/enums");
const LogOutModal = () => {
    const router = (0, router_1.useRouter)();
    const modalStore = (0, modal_1.useModalStore)();
    const sessionStore = (0, session_1.useSessionStore)();
    const cancelButtonRef = (0, react_1.useRef)(null);
    const closeModalHandler = () => modalStore.close();
    const isModalOpen = modalStore.queue.at(-1) === enums_1.ModalKeyMap.LogOut;
    const logOut = api_1.api.auth.logOut.useMutation({
        onSuccess() {
            router.push(enums_1.PagePathMap.HomePage);
            sessionStore.clear();
            modalStore.close(enums_1.ModalKeyMap.LogOut);
        },
        onError(error) {
            console.log("🚀 ~ file: index.tsx:24 ~ onError ~ error:", error);
            react_hot_toast_1.default.error(error.message);
        },
    });
    (0, autoFocus_hook_1.useAutoFocus)(cancelButtonRef, isModalOpen);
    return (<Modal.Root state={isModalOpen}>
      <Modal.Header>
        <Modal.Title>Вы действительно хотите выйти?</Modal.Title>
        <Modal.Close onClick={closeModalHandler}/>
      </Modal.Header>
      <Modal.Content>
        Вы можете покинуть этот аккаунт. После чего перейдете в режим гостя, в
        котором ограничен доступ ко многим элементам портала.
      </Modal.Content>
      <Modal.Footer>
        <Button_1.default type="button" onClick={closeModalHandler} textAlign="center" ref={cancelButtonRef} disabled={logOut.isLoading}>
          Отмена
        </Button_1.default>
        <Button_1.default variant="filled" color="danger" type="button" textAlign="center" onClick={() => logOut.mutate()} disabled={logOut.isLoading} loading={logOut.isLoading}>
          Выйти
        </Button_1.default>
      </Modal.Footer>
    </Modal.Root>);
};
exports.default = LogOutModal;
