"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRouter = void 0;
const notification_controller_1 = __importDefault(require("../controllers/notification.controller"));
const trpc_1 = require("../trpc");
exports.notificationRouter = (0, trpc_1.createTRPCRouter)({
    getBySession: notification_controller_1.default.getBySession(),
    onSend: notification_controller_1.default.onSend(),
    send: notification_controller_1.default.send(),
    clear: notification_controller_1.default.clear(),
    readAll: notification_controller_1.default.readAll(),
});
