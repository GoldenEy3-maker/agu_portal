import Redis from "ioredis"

export const redisClient = new Redis(process.env.REDIS_URL ?? "")
export const pubRedisClient = new Redis(process.env.REDIS_URL ?? "")
export const subRedisClient = new Redis(process.env.REDIS_URL ?? "")
