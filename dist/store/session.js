"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSessionStore = void 0;
const zustand_1 = require("zustand");
exports.useSessionStore = (0, zustand_1.create)((set, get) => ({
    token: null,
    user: null,
    setToken(token) {
        set(() => ({ token }));
    },
    removeToken() {
        set(() => ({ token: null }));
    },
    setUser(data) {
        set(() => ({ user: data }));
    },
    clear() {
        set(() => ({ user: null, token: null }));
    },
}));
