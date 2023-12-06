"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const react_1 = require("react");
const docEvent_hook_1 = require("~/hooks/docEvent.hook");
const func_1 = require("~/utils/func");
const styles_module_sass_1 = __importDefault(require("./styles.module.sass"));
const Container = ({ state, closeHandler, ...props }) => {
    const containerRef = (0, react_1.useRef)(null);
    const clickOutsideHandler = (event) => {
        var _a;
        if (!event.target.closest("[data-modal-root]") ||
            !((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.target)))
            closeHandler && closeHandler();
        if (props.onPointerDown)
            props.onPointerDown(event);
    };
    const blurOutsideHandler = (event) => {
        var _a;
        if (event.relatedTarget !== null &&
            !event.relatedTarget.closest("[data-modal-root]") &&
            !((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(event.relatedTarget)))
            closeHandler && closeHandler();
        if (props.onBlur)
            props.onBlur(event);
    };
    const closeOnKeyPressHandler = (event) => {
        if (!state)
            return;
        if (event.code === "Escape")
            closeHandler();
    };
    (0, docEvent_hook_1.useDocEventListener)("keyup", closeOnKeyPressHandler);
    return (<div {...props} className={(0, func_1.cls)(styles_module_sass_1.default.container, props.className)} aria-hidden={!state} ref={containerRef} onPointerDown={clickOutsideHandler} onBlur={blurOutsideHandler}>
      <div className={styles_module_sass_1.default.containerWrapper}>{props.children}</div>
    </div>);
};
exports.Container = Container;
