const express = require('express');
const routes = require('./routes');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api', routes);
connectDB();

module.exports = app;
