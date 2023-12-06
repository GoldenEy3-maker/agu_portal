"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
const react_1 = require("react");
const useLocalStorage = (key, initialValue) => {
    const [state, setState] = (0, react_1.useState)(() => {
        const storage = localStorage.getItem(key);
        if (!storage)
            return initialValue;
        return JSON.parse(storage);
    });
    const set = (value) => {
        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
    };
    return [state, set];
};
exports.useLocalStorage = useLocalStorage;
