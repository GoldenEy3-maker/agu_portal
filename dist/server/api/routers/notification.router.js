"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRouter = void 0;
const notification_controller_1 = __importDefault(require("../controllers/notification.controller"));
const trpc_1 = require("../trpc");
exports.notificationRouter = (0, trpc_1.createTRPCRouter)({
    getAllBySession: notification_controller_1.default.getAllBySession(),
    onSend: notification_controller_1.default.onSend(),
    testSend: notification_controller_1.default.testSend(),
    deleteAll: notification_controller_1.default.deleteAll(),
});
