"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModalStore = void 0;
const zustand_1 = require("zustand");
exports.useModalStore = (0, zustand_1.create)((set, get) => ({
    queue: [],
    props: null,
    target: null,
    open(args) {
        const storedQueue = get().queue;
        if (storedQueue.at(-1) === args.key)
            return;
        if (storedQueue.length === 0)
            document.body.style.setProperty("--scrollbar-offset", window.innerWidth - document.body.offsetWidth + "px");
        document.body.dataset.lock = "true";
        if (args.target)
            set(() => ({ target: args.target }));
        if (storedQueue.includes(args.key)) {
            set((state) => ({
                queue: [...state.queue.filter((q) => q !== args.key), args.key],
            }));
        }
        else {
            set((store) => ({
                queue: [...store.queue, args.key],
            }));
        }
        if (args.props) {
            set((store) => ({ props: { ...store.props, [args.key]: args.props } }));
        }
    },
    close(key) {
        const newQueue = get().queue.filter((q, _, self) => key ? q !== key : q !== self.at(-1));
        if (newQueue.length === 0) {
            setTimeout(() => document.body.removeAttribute("data-lock"), 200);
            const target = get().target;
            if (target) {
                target.focus();
                set(() => ({ target: null }));
            }
        }
        set(() => ({ queue: newQueue }));
    },
    setProps(key, props) {
        set((store) => ({ props: { ...store.props, [key]: props } }));
    },
}));
