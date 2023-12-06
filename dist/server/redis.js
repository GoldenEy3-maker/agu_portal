"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.subRedisClient = exports.pubRedisClient = exports.redisClient = void 0;
const ioredis_rejson_1 = __importDefault(require("ioredis-rejson"));
exports.redisClient = new ioredis_rejson_1.default((_a = process.env.REDIS_URL) !== null && _a !== void 0 ? _a : "");
exports.pubRedisClient = new ioredis_rejson_1.default((_b = process.env.REDIS_URL) !== null && _b !== void 0 ? _b : "");
exports.subRedisClient = new ioredis_rejson_1.default((_c = process.env.REDIS_URL) !== null && _c !== void 0 ? _c : "");
