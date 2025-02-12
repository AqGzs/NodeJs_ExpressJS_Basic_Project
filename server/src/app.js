const express = require('express');
const helmet = require("helmet");
const routes = require('./routes');
const connectDB = require('./config/database');
const apiLimiter = require("./middlewares/rateLimitMiddleware");
const { preventXSS, preventNoSQLInjection } = require("./middlewares/securityMiddleware");
const enableCORS = require("./middlewares/corsMiddleware");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use("/api", apiLimiter);
app.use(preventNoSQLInjection);
app.use(preventXSS);
app.use(enableCORS);
app.use(helmet());
app.use('/api', routes);
app.disable("x-powered-by");
connectDB();

module.exports = app;
