"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseWsUrl = exports.getBaseUrl = exports.toUpperCaseInitialLetter = exports.cls = void 0;
const cls = (...classes) => {
    const result = [];
    const filteredCls = classes.filter((c) => c !== undefined);
    for (const item of filteredCls) {
        if (typeof item === "string")
            result.push(item);
        else if (typeof item === "object") {
            for (const keyCls of Object.keys(item)) {
                if (item[keyCls])
                    result.push(keyCls);
            }
        }
    }
    return result.join(" ");
};
exports.cls = cls;
const toUpperCaseInitialLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.toUpperCaseInitialLetter = toUpperCaseInitialLetter;
const getBaseUrl = () => {
    var _a;
    if (typeof window !== "undefined")
        return "";
    if (process.env.VERCEL_URL)
        return `https://${process.env.VERCEL_URL}`;
    if (process.env.APP_URL)
        return `https://${process.env.APP_URL}`;
    return `http://localhost:${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000}`;
};
exports.getBaseUrl = getBaseUrl;
const getBaseWsUrl = () => {
    if (process.env.WS_URL)
        return `ws://${process.env.WS_URL}`;
    return `ws://127.0.0.1:3000`;
};
exports.getBaseWsUrl = getBaseWsUrl;
