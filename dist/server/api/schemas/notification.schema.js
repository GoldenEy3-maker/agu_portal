"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationModel = exports.notificationOnSendInput = exports.notificationSendInput = void 0;
const zod_1 = require("zod");
exports.notificationSendInput = zod_1.z.object({
    link: zod_1.z.string(),
    subject: zod_1.z.string(),
    recipientId: zod_1.z.string(),
});
exports.notificationOnSendInput = zod_1.z.object({
    userId: zod_1.z.string().optional(),
});
exports.notificationModel = zod_1.z.object({
    id: zod_1.z.string(),
    recipientId: zod_1.z.string(),
    subject: zod_1.z.string(),
    link: zod_1.z.string(),
    isReaded: zod_1.z.boolean(),
    createdAt: zod_1.z.string(),
    sender: zod_1.z.object({
        id: zod_1.z.string(),
        avatar: zod_1.z.string().nullable(),
        name: zod_1.z.string(),
    }),
});
