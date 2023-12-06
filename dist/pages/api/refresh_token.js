"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("~/server/db");
const exeptions_1 = __importDefault(require("~/server/exeptions"));
const token_service_1 = __importDefault(require("~/services/token.service"));
const enums_1 = require("~/utils/enums");
const handler = async (req, res) => {
    try {
        const refreshToken = req.cookies[enums_1.CookieKeyMap.RefreshToken];
        if (!refreshToken)
            throw exeptions_1.default.Unauthorized();
        const refreshTokenPayload = token_service_1.default.verifyRefreshToken(refreshToken);
        if (!refreshTokenPayload)
            throw exeptions_1.default.Unauthorized();
        const user = await db_1.db.user.findUnique({
            where: {
                login: refreshTokenPayload.login,
            },
        });
        if (!user)
            throw exeptions_1.default.Unauthorized();
        if (user.tokenVersion !== refreshTokenPayload.tokenVersion)
            throw exeptions_1.default.Unauthorized();
        const { accessToken, refreshToken: newRefreshToken } = token_service_1.default.generateTokens(user);
        token_service_1.default.setRefreshToken(newRefreshToken, req, res);
        return res.json({ accessToken, user });
    }
    catch (error) {
        if (error instanceof exeptions_1.default)
            return res.status(401).json({ message: error.message });
        return res.status(400).json({ message: "Неожиданная ошибка!" });
    }
};
exports.default = handler;
