"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_service_1 = __importDefault(require("../../../services/token.service"));
const exeptions_1 = __importDefault(require("../../exeptions"));
const auth_schema_1 = require("../schemas/auth.schema");
const trpc_1 = require("../trpc");
exports.default = new (class AuthController {
    getSession() {
        return trpc_1.authProcedure.query((opts) => opts.ctx.user);
    }
    signIn() {
        return trpc_1.publicProcedure.input(auth_schema_1.authSignInInput).mutation(async (opts) => {
            const user = await opts.ctx.db.user.findUnique({
                where: {
                    login: opts.input.login,
                },
            });
            if (!user)
                throw exeptions_1.default.BadRequest("Неверный логин или пароль!");
            const isPassowrdMatch = await bcrypt_1.default.compare(opts.input.password, user.password);
            if (!isPassowrdMatch)
                throw exeptions_1.default.BadRequest("Неверный логин или пароль!");
            const { accessToken, refreshToken } = token_service_1.default.generateTokens(user, opts.input.rememberMe);
            // @ts-ignore
            token_service_1.default.setRefreshToken(refreshToken, opts.ctx.req, opts.ctx.res);
            return { accessToken, user };
        });
    }
    logOut() {
        return trpc_1.publicProcedure.mutation((opts) => {
            // @ts-ignore
            token_service_1.default.removeRefreshToken(opts.ctx.req, opts.ctx.res);
        });
    }
})();
