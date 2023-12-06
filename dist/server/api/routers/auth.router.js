"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const trpc_1 = require("../trpc");
exports.authRouter = (0, trpc_1.createTRPCRouter)({
    getSession: auth_controller_1.default.getSession(),
    signIn: auth_controller_1.default.signIn(),
    logOut: auth_controller_1.default.logOut(),
});
