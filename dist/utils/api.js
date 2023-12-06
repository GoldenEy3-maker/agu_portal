"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const client_1 = require("@trpc/client");
const next_1 = require("@trpc/next");
const superjson_1 = __importDefault(require("superjson"));
const session_1 = require("~/store/session");
const func_1 = require("./func");
exports.api = (0, next_1.createTRPCNext)({
    config({ ctx }) {
        var _a;
        return {
            transformer: superjson_1.default,
            links: [
                (0, client_1.loggerLink)({
                    enabled: (opts) => process.env.NODE_ENV === "development" ||
                        (opts.direction === "down" && opts.result instanceof Error),
                }),
                (0, client_1.splitLink)({
                    condition(op) {
                        return op.type === "subscription" || op.context.wss === true;
                    },
                    true: (0, client_1.wsLink)({
                        client: (0, client_1.createWSClient)({
                            url: (_a = process.env.NEXT_PUBLIC_WS_URL) !== null && _a !== void 0 ? _a : "ws://127.0.0.1:3000",
                        }),
                    }),
                    false: (0, client_1.httpBatchLink)({
                        url: `${(0, func_1.getBaseUrl)()}/api/trpc`,
                        async fetch(url, options) {
                            const sessionStore = session_1.useSessionStore.getState();
                            const response = await fetch(url, {
                                ...options,
                                credentials: "include",
                            });
                            if (response.status === 401) {
                                const refreshResponse = await fetch(`${(0, func_1.getBaseUrl)()}/api/refresh_token`, {
                                    method: "POST",
                                    credentials: "include",
                                });
                                if (!refreshResponse.ok)
                                    return refreshResponse;
                                const refreshData = (await refreshResponse.json());
                                sessionStore.setToken(refreshData.accessToken);
                                sessionStore.setUser(refreshData.user);
                                return await fetch(url, {
                                    ...options,
                                    credentials: "include",
                                    headers: {
                                        ...options === null || options === void 0 ? void 0 : options.headers,
                                        authorization: `Bearer ${refreshData.accessToken}`,
                                    },
                                });
                            }
                            return response;
                        },
                        headers() {
                            var _a;
                            const token = session_1.useSessionStore.getState().token;
                            const headers = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.req) === null || _a === void 0 ? void 0 : _a.headers;
                            if (!token)
                                return { ...headers };
                            return {
                                ...headers,
                                authorization: `Bearer ${token}`,
                            };
                        },
                    }),
                }),
            ],
        };
    },
    ssr: false,
});
