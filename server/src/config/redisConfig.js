const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || "redis_container",
        port: process.env.REDIS_PORT || 6379,
        reconnectStrategy: retries => Math.min(retries * 50, 500)
    }
});

redisClient.on("error", (err) => {
    console.error("❌ Redis error:", err);
});

redisClient.connect().then(() => {
    console.log("✅ Redis connected successfully!");
}).catch((err) => {
    console.error("❌ Failed to connect to Redis:", err.message);
});

module.exports = redisClient;
