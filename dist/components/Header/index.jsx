"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("next/image"));
const header_logo_resized_png_1 = __importDefault(require("~/assets/header_logo_resized.png"));
const winEvent_hook_1 = require("~/hooks/winEvent.hook");
const modal_1 = require("~/store/modal");
const sidebar_1 = require("~/store/sidebar");
const enums_1 = require("~/utils/enums");
const func_1 = require("~/utils/func");
const Button_1 = __importDefault(require("../Button"));
const Icons_1 = require("../Icons");
const Actions_1 = __importDefault(require("./Actions"));
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const Header = () => {
    const modalStore = (0, modal_1.useModalStore)();
    const sidebarStore = (0, sidebar_1.useSidebarStore)();
    const changeTypeSidebarHandler = () => {
        if (window.innerWidth > 1300 &&
            modalStore.queue.at(-1) === enums_1.ModalKeyMap.Sidebar)
            modalStore.close(enums_1.ModalKeyMap.Sidebar);
    };
    (0, winEvent_hook_1.useWinEventListener)("resize", changeTypeSidebarHandler);
    return (<header className={styles_module_sass_1.default.header}>
      <div className={styles_module_sass_1.default.leftSide}>
        <Button_1.default className={styles_module_sass_1.default.sidebarControl} asIcon type="button" color="default" onClick={sidebarStore.toggle}>
          <Icons_1.IconMenu />
        </Button_1.default>
        <Button_1.default className={(0, func_1.cls)(styles_module_sass_1.default.sidebarControl, styles_module_sass_1.default._modal)} asIcon type="button" color="default" onClick={(event) => modalStore.open({
            key: enums_1.ModalKeyMap.Sidebar,
            target: event.currentTarget,
        })}>
          <Icons_1.IconMenu />
        </Button_1.default>
        <div className={styles_module_sass_1.default.title}>
          <image_1.default src={header_logo_resized_png_1.default} alt="" width={header_logo_resized_png_1.default.width} height={header_logo_resized_png_1.default.height}/>
          <h3 className={styles_module_sass_1.default.title}>Цифровой университет АлтГУ</h3>
        </div>
      </div>
      <Actions_1.default />
    </header>);
};
exports.default = Header;
