const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middlewares/logger.middleware');
const postRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes');
dotenv.config();

const app = express();

app.use(express.json()); // MiddleWare bodyparser (json => JS object)
app.use(logger);

app.use('/users' , userRoutes);
app.use('/posts' , postRoutes);

module.exports = app;