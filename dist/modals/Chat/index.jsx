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
Object.defineProperty(exports, "__esModule", { value: true });
const Modal = __importStar(require("~/components/Modal"));
const modal_1 = require("~/store/modal");
const enums_1 = require("~/utils/enums");
const ChatModal = () => {
    const modalStore = (0, modal_1.useModalStore)();
    const isModalOpen = modalStore.queue.at(-1) === enums_1.ModalKeyMap.Chat;
    const closeModalHandler = () => modalStore.close(enums_1.ModalKeyMap.Chat);
    return (<Modal.Root state={isModalOpen} asDrawer>
      <Modal.Header>
        <Modal.Title>Сообщения</Modal.Title>
        <Modal.Close onClick={closeModalHandler}/>
      </Modal.Header>
      <Modal.Content>
        <ul>
          <li>Чат 1</li>
          <li>Чат 2</li>
          <li>Чат 3</li>
          <li>Чат 4</li>
        </ul>
      </Modal.Content>
    </Modal.Root>);
};
exports.default = ChatModal;
