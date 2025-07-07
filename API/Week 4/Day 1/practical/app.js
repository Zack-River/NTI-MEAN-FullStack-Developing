const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.route');
const dbConnection = require('./config/dbConnection');

dotenv.config();

const app = express();

dbConnection();

app.use(express.json());
app.use("/user", userRoutes);

module.exports = app;
