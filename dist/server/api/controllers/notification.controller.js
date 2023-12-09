"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const observable_1 = require("@trpc/server/observable");
const enums_1 = require("../../../utils/enums");
const exeptions_1 = __importDefault(require("../../exeptions"));
const notification_schema_1 = require("../schemas/notification.schema");
const trpc_1 = require("../trpc");
exports.default = new (class NotificationController {
    getBySession() {
        return trpc_1.authProcedure.query(async (opts) => {
            let notificaitons = ((await opts.ctx.redisClient.json_get(enums_1.RedisKeyMap.Notifications)) || []);
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
    clear() {
        return trpc_1.authProcedure.mutation(async (opts) => {
            let notifications = ((await opts.ctx.redisClient.json_get(enums_1.RedisKeyMap.Notifications)) || []);
            if (notifications.length > 0) {
                notifications = notifications.filter((notificaiton) => notificaiton.recipientId !== opts.ctx.user.id);
                await opts.ctx.redisClient.json_set(enums_1.RedisKeyMap.Notifications, "$", notifications);
            }
            return true;
        });
    }
    onSend() {
        return trpc_1.publicProcedure
            .input(notification_schema_1.notificationOnSendInput)
            .subscription((opts) => {
            return (0, observable_1.observable)((emit) => {
                if (!opts.input.userId)
                    throw exeptions_1.default.Unauthorized();
                const onSend = (channel, message) => {
                    const notification = notification_schema_1.notificationModel.parse(JSON.parse(message));
                    emit.next(notification);
                };
                opts.ctx.subRedisClient.subscribe(`user-notification-${opts.input.userId}`);
                opts.ctx.subRedisClient.on("message", onSend);
                return () => {
                    opts.ctx.subRedisClient.off("message", onSend);
                };
            });
        });
    }
    readAll() {
        return trpc_1.authProcedure.mutation(async (opts) => {
            let notifications = ((await opts.ctx.redisClient.json_get(enums_1.RedisKeyMap.Notifications)) || []);
            if (notifications.length > 0) {
                notifications = notifications
                    .filter((notification) => notification.recipientId === opts.ctx.user.id)
                    .map((notification) => ({
                    ...notification,
                    isReaded: true,
                }));
                await opts.ctx.redisClient.json_set(enums_1.RedisKeyMap.Notifications, "$", notifications);
            }
            return notifications;
        });
    }
    send() {
        return trpc_1.authProcedure.input(notification_schema_1.notificationSendInput).mutation(async (opts) => {
            const notifications = ((await opts.ctx.redisClient.json_get(enums_1.RedisKeyMap.Notifications)) || []);
            const newNotification = notification_schema_1.notificationModel.parse({
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
            await opts.ctx.redisClient.json_set(enums_1.RedisKeyMap.Notifications, "$", [
                ...notifications,
                newNotification,
            ]);
            await opts.ctx.pubRedisClient.publish(`user-notification-${opts.input.recipientId}`, JSON.stringify(newNotification));
            return newNotification;
        });
    }
})();
