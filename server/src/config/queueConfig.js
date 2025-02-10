const Queue = require("bull");
require("dotenv").config();

const emailQueue = new Queue("emailQueue", {
    redis: {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: process.env.REDIS_PORT || 6380
    }
});

const notificationQueue = new Queue("notificationQueue", {
    redis: {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: process.env.REDIS_PORT || 6380
    }
});

module.exports = { emailQueue, notificationQueue };
