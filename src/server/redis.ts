import Redis from "ioredis-rejson"

export const redisClient = new Redis(process.env.REDIS_URL ?? "")
export const pubRedisClient = new Redis(process.env.REDIS_URL ?? "")
export const subRedisClient = new Redis(process.env.REDIS_URL ?? "")
