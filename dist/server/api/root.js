"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const auth_router_1 = require("./routers/auth.router");
const notification_router_1 = require("./routers/notification.router");
const trpc_1 = require("./trpc");
exports.appRouter = (0, trpc_1.createTRPCRouter)({
    auth: auth_router_1.authRouter,
    notification: notification_router_1.notificationRouter,
});
