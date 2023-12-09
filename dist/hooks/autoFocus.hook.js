"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAutoFocus = void 0;
const react_1 = require("react");
const useAutoFocus = (target, condition) => {
    (0, react_1.useEffect)(() => {
        if (!target.current || !condition)
            return;
        setTimeout(() => {
            target.current.focus({ preventScroll: true });
            target.current.dataset.autoFocus = "true";
            target.current.addEventListener("blur", () => target.current.removeAttribute("data-auto-focus"));
        }, 30);
    }, [condition]);
};
exports.useAutoFocus = useAutoFocus;
