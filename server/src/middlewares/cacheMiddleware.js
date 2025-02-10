const redisClient = require("../config/redisConfig");

const cacheMiddleware = async (req, res, next) => {
    try {
        const key = req.originalUrl; 
        const cachedData = await redisClient.get(key);

        if (cachedData) {
            console.log(`⚡ Cache hit for ${key}`);
            return res.json(JSON.parse(cachedData));
        }

        console.log(`💾 Cache miss for ${key}`);
        next();
    } catch (error) {
        console.error("❌ Redis cache error:", error.message);
        next();
    }
};

module.exports = cacheMiddleware;
