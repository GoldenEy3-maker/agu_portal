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
const image_1 = __importDefault(require("next/image"));
const header_logo_resized_png_1 = __importDefault(require("~/assets/header_logo_resized.png"));
const Modal = __importStar(require("~/components/Modal"));
const Sidebar_1 = __importDefault(require("~/components/Sidebar"));
const routerEvent_hook_1 = require("~/hooks/routerEvent.hook");
const modal_1 = require("~/store/modal");
const enums_1 = require("~/utils/enums");
const SidebarModal = () => {
    const modalStore = (0, modal_1.useModalStore)();
    const isModalOpen = modalStore.queue.at(-1) === enums_1.ModalKeyMap.Sidebar;
    (0, routerEvent_hook_1.useRouterChangeEvent)(() => modalStore.close(enums_1.ModalKeyMap.Sidebar));
    return (<Modal.Root state={isModalOpen} asDrawer position="left">
      <Modal.Header isJustifyContentStart>
        <Modal.Close onClick={() => modalStore.close(enums_1.ModalKeyMap.Sidebar)}/>
        <image_1.default src={header_logo_resized_png_1.default} alt="Логотоп АлтГУ" width={header_logo_resized_png_1.default.width} height={header_logo_resized_png_1.default.height}/>
        <Modal.Title>Цифровой университет АлтГУ</Modal.Title>
      </Modal.Header>
      <Modal.Content>
        <Sidebar_1.default isModal/>
      </Modal.Content>
    </Modal.Root>);
};
exports.default = SidebarModal;
