"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSidebarStore = void 0;
const zustand_1 = require("zustand");
exports.useSidebarStore = (0, zustand_1.create)((set, get) => ({
    isExpanded: true,
    shrink() {
        set(() => ({ isExpanded: false }));
    },
    toggle() {
        set((state) => ({ isExpanded: !state.isExpanded }));
    },
}));
