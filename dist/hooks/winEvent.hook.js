"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWinEventListener = void 0;
const react_1 = require("react");
const useWinEventListener = (key, listener) => {
    (0, react_1.useEffect)(() => {
        window.addEventListener(key, listener);
        return () => window.removeEventListener(key, listener);
    }, [listener]);
};
exports.useWinEventListener = useWinEventListener;
