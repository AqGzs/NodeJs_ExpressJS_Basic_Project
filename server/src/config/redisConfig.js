const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: process.env.REDIS_PORT || 6380
    }
});

redisClient.on("error", (err) => console.error("Redis error:", err));

(async () => {
    await redisClient.connect();
    console.log("Redis connected...");
})();

module.exports = redisClient;
