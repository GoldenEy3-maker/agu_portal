"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSignInInput = void 0;
const zod_1 = require("zod");
exports.authSignInInput = zod_1.z.object({
    login: zod_1.z.string(),
    password: zod_1.z.string().min(4, "Пароль не менее 4 символов!"),
    rememberMe: zod_1.z.boolean(),
});
