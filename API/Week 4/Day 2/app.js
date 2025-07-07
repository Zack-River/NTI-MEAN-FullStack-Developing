const express = require('express');
const app = express();
const dbConnection = require('./config/db');
const userRouter = require('./routes/user.route');
const cookieParser = require('cookie-parser');

dbConnection();
app.use(express.json());
app.use(cookieParser());

app.use('/user' , userRouter);

module.exports = app;