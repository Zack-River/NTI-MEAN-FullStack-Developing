const express = require("express");
const morgan = require("morgan");
const { createClient } = require("redis");
const logger = require("./utils/logger");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(morgan("dev", {stream: {write: (message) => logger.info(message.trim())}}));

const redisClient = createClient();

redisClient.on("error", (err) => {
  logger.error(`Redis Client Error: ${err}`);
});

(async () => {
  try {
    await redisClient.connect();
    logger.info("Redis connected");
  } catch (err) {
    logger.error(`Redis connection failed: ${err}`);
  }
})();

const API_URL = "https://jsonplaceholder.typicode.com/photos";

app.get("/photos", async (req, res) => {
  try {
    const cacheResult = await redisClient.get("photos");
    if (cacheResult) {
      logger.info("Serving /photos from cache");
      return res.json(JSON.parse(cacheResult));
    }

    const response = await fetch(API_URL);
    const data = await response.json();

    await redisClient.setEx("photos", 30, JSON.stringify(data));
    logger.info("Fetched /photos from API and cached");
    res.json(data);
  } catch (err) {
    logger.error(`Error in /photos: ${err}`);
    res.status(500).json({ error: "Failed to get photos" });
  }
});

app.get("/clear", async (req, res) => {
  await redisClient.del("photos");
  logger.info("Cache for 'photos' cleared");
  res.send("Cache cleared");
});

app.get('/error' , async (req,res) => {
    try {
        throw new Error('Test error');
    } catch (err) {
        logger.error(err);
    }
});

app.get('/reject' , (req,res) => {
    mongoose.connect('kadhlskda');
    mongoose.on('error' , (err) => {
        logger.error(err);
    });
});

app.listen(3000, () => {
  logger.info("Server started on port 3000");
  console.log("Server running on http://localhost:3000");
});