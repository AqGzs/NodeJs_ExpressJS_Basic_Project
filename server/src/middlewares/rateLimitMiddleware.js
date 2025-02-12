const rateLimit = require("express-rate-limit");

// Cấu hình giới hạn request
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 100, // Giới hạn mỗi IP tối đa 100 request/15 phút
    message: { message: "Too many requests, please try again later." }
});

module.exports = apiLimiter;
