"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookies_next_1 = require("cookies-next");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const enums_1 = require("../utils/enums");
exports.default = new (class TokenService {
    generateTokens(payload, rememberMe) {
        var _a, _b;
        const accessToken = jsonwebtoken_1.default.sign({ login: payload.login }, (_a = process.env.ACCESS_TOKEN_SECRET) !== null && _a !== void 0 ? _a : "", {
            expiresIn: "1m",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ login: payload.login, tokenVersion: payload.tokenVersion }, (_b = process.env.REFRESH_TOKEN_SECRET) !== null && _b !== void 0 ? _b : "", {
            expiresIn: rememberMe ? "7d" : "24h",
        });
        return { accessToken, refreshToken };
    }
    verifyAccessToken(token) {
        var _a;
        try {
            return jsonwebtoken_1.default.verify(token, (_a = process.env.ACCESS_TOKEN_SECRET) !== null && _a !== void 0 ? _a : "");
        }
        catch (error) {
            return null;
        }
    }
    verifyRefreshToken(token) {
        var _a;
        try {
            return jsonwebtoken_1.default.verify(token, (_a = process.env.REFRESH_TOKEN_SECRET) !== null && _a !== void 0 ? _a : "");
        }
        catch (error) {
            return null;
        }
    }
    setRefreshToken(payload, req, res) {
        (0, cookies_next_1.setCookie)(enums_1.CookieKeyMap.RefreshToken, payload, {
            req,
            res,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
        });
    }
    removeRefreshToken(req, res) {
        (0, cookies_next_1.setCookie)(enums_1.CookieKeyMap.RefreshToken, 1, {
            req,
            res,
            maxAge: -1,
        });
    }
})();
