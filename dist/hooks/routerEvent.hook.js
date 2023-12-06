"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRouterChangeEvent = void 0;
const router_1 = require("next/router");
const react_1 = require("react");
const useRouterChangeEvent = (callback) => {
    const router = (0, router_1.useRouter)();
    (0, react_1.useEffect)(() => {
        if (router.isReady)
            callback();
    }, [router]);
};
exports.useRouterChangeEvent = useRouterChangeEvent;
