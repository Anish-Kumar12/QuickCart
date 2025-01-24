import Redis from 'ioredis';

export const connectRedis = (url) => {
    const redis = new Redis(url);
    redis.on("connect", () => {
        console.log("Redis connected");
    });
    redis.on("error", (err) => {
        console.log(err);
    });
    return redis;
}