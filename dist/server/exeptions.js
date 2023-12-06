"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@trpc/server");
class ApiError extends server_1.TRPCError {
    constructor(code, message) {
        super({ code, message });
    }
    static BadRequest(message) {
        return new ApiError("BAD_REQUEST", message);
    }
    static ServerError(message) {
        return new ApiError("INTERNAL_SERVER_ERROR", message);
    }
    static Unauthorized(message) {
        return new ApiError("UNAUTHORIZED", message !== null && message !== void 0 ? message : "Неавторизованный пользователь!");
    }
}
exports.default = ApiError;
