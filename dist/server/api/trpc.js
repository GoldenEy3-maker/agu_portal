"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProcedure = exports.publicProcedure = exports.middleware = exports.createTRPCRouter = exports.createTRPCContext = void 0;
const server_1 = require("@trpc/server");
const superjson_1 = __importDefault(require("superjson"));
const zod_1 = require("zod");
const token_service_1 = __importDefault(require("../../services/token.service"));
const db_1 = require("../db");
const exeptions_1 = __importDefault(require("../exeptions"));
const redis_1 = require("../redis");
const createInnerTRPCContext = (_opts) => {
    return {
        db: db_1.db,
        subRedisClient: redis_1.subRedisClient,
        pubRedisClient: redis_1.pubRedisClient,
        redisClient: redis_1.redisClient,
    };
};
const createTRPCContext = (_opts) => {
    return { ...createInnerTRPCContext(), req: _opts.req, res: _opts.res };
};
exports.createTRPCContext = createTRPCContext;
const t = server_1.initTRPC.context().create({
    transformer: superjson_1.default,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.cause instanceof zod_1.ZodError ? error.cause.flatten() : null,
            },
        };
    },
});
exports.createTRPCRouter = t.router;
exports.middleware = t.middleware;
const isApi = (0, exports.middleware)((opts) => {
    if (!opts.ctx.req || !opts.ctx.res)
        throw exeptions_1.default.BadRequest("Context lost!");
    return opts.next({
        ctx: {
            req: opts.ctx.req,
            res: opts.ctx.res,
        },
    });
});
const isAuth = (0, exports.middleware)(async (opts) => {
    var _a;
    const accessToken = (_a = opts.ctx.req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!accessToken)
        throw exeptions_1.default.Unauthorized();
    const accessTokenPayload = token_service_1.default.verifyAccessToken(accessToken);
    if (!accessTokenPayload)
        throw exeptions_1.default.Unauthorized();
    const user = await opts.ctx.db.user.findUnique({
        where: {
            login: accessTokenPayload.login,
        },
    });
    if (!user)
        throw exeptions_1.default.Unauthorized();
    return opts.next({
        ctx: { user },
    });
});
exports.publicProcedure = t.procedure.use(isApi);
exports.authProcedure = t.procedure.use(isAuth);
