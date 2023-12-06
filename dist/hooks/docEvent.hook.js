"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDocEventListener = void 0;
const react_1 = require("react");
const useDocEventListener = (key, listener) => {
    (0, react_1.useEffect)(() => {
        document.addEventListener(key, listener);
        return () => document.removeEventListener(key, listener);
    }, [listener]);
};
exports.useDocEventListener = useDocEventListener;
