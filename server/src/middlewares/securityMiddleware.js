const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

// Middleware bảo vệ chống NoSQL Injection
const preventNoSQLInjection = mongoSanitize();
const preventXSS = xss();
module.exports = { preventNoSQLInjection, preventXSS };
