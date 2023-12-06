"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const observable_1 = require("@trpc/server/observable");
const zod_1 = require("zod");
const exeptions_1 = __importDefault(require("../../exeptions"));
const notification_schema_1 = require("../schemas/notification.schema");
const trpc_1 = require("../trpc");
exports.default = new (class NotificationController {
    getAllBySession() {
        return trpc_1.authProcedure.query(async (opts) => {
            let notificaitons = ((await opts.ctx.redisClient.json_get("notifications")) || []);
            if (notificaitons.length > 0) {
                notificaitons = notificaitons
                    .filter((notification) => notification.recipientId === opts.ctx.user.id)
                    .sort((a, b) => {
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    return dateB - dateA;
                });
            }
            return notificaitons;
        });
    }
    deleteAll() {
        return trpc_1.authProcedure.mutation(async (opts) => {
            return true;
        });
    }
    onSend() {
        return trpc_1.publicProcedure.input(zod_1.z.string().optional()).subscription((opts) => {
            return (0, observable_1.observable)((emit) => {
                if (!opts.input)
                    throw exeptions_1.default.Unauthorized();
                const onSend = (channel, message) => {
                    const notification = JSON.parse(message);
                    emit.next(notification);
                };
                opts.ctx.subRedisClient.subscribe(`user-notification-${opts.input}`);
                opts.ctx.subRedisClient.on("message", onSend);
                return () => {
                    opts.ctx.subRedisClient.off("message", onSend);
                };
            });
        });
    }
    testSend() {
        return trpc_1.authProcedure
            .input(notification_schema_1.NotificationTestSendInput)
            .mutation(async (opts) => {
            const notification = notification_schema_1.NotificationModel.parse({
                ...opts.input,
                id: crypto.randomUUID(),
                sender: {
                    id: opts.ctx.user.id,
                    avatar: opts.ctx.user.avatar,
                    name: opts.ctx.user.name,
                },
                isReaded: false,
                createdAt: new Date().toString(),
            });
            await opts.ctx.redisClient.json_arrappend(`notifications`, "$", notification);
            await opts.ctx.pubRedisClient.publish(`user-notification-${opts.input.recipientId}`, JSON.stringify(notification));
            return notification;
        });
    }
})();
