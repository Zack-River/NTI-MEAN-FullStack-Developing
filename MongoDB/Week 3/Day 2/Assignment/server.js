const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const booksRoute = require('./routes/books');

dotenv.config();

const app = express();
app.use(express.json());

// Route prefix
app.use('/books', booksRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ DB Connection Error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
