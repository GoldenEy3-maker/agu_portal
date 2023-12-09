"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const react_1 = require("react");
const docEvent_hook_1 = require("~/hooks/docEvent.hook");
const modal_1 = require("~/store/modal");
const func_1 = require("~/utils/func");
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const Root = ({ closeHandler, ...props }) => {
    const modalStore = (0, modal_1.useModalStore)();
    const rootRef = (0, react_1.useRef)(null);
    const isModalsClosed = modalStore.queue.length === 0;
    const blurHandler = (event) => {
        var _a;
        if (isModalsClosed &&
            event.relatedTarget &&
            !((_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.relatedTarget)))
            closeHandler();
        if (props.onBlur)
            props.onBlur(event);
    };
    const clickOutsideHandler = (event) => {
        var _a;
        if (isModalsClosed && !((_a = rootRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target)))
            closeHandler();
    };
    (0, docEvent_hook_1.useDocEventListener)("pointerdown", clickOutsideHandler);
    return (<div {...props} ref={rootRef} onBlur={blurHandler} className={(0, func_1.cls)(styles_module_sass_1.default.root, props.className)}>
      {props.children}
    </div>);
};
exports.Root = Root;
