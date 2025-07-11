const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const port = process.env.PORT;
const db = process.env.MONGO_URI;
// Connect to MongoDB
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));

// Define Schema
const bookSchema = new mongoose.Schema({
    Code: {
        type: String,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Quantity: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
});

const Book = mongoose.model('Book', bookSchema);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3001']
}));

// POST /book
app.post('/book', async (req, res) => {
    try {
        const { Code, Name, Price, Quantity } = req.body;

        const newBook = await Book.create({
            Code,
            Name,
            Price,
            Quantity
        });

        console.log("New Book added:\n", newBook);
        res.status(201).json({ message: "Book Added Successfully", book: newBook });
    } catch (err) {
        console.error("Error adding book:", err);
        res.status(500).json({ message: "Failed to add book", error: err.message });
    }
});

app.get('/book' , async (req,res) => {
    const books = await Book.find();
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found' });
    }
    res.status(200).json(books);
});

app.get('/book/:Code' , async (req,res) => {
    const book = await Book.findOne({Code: req.params.Code});

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({
        Code: book.Code,
        Name: book.Name,
        Price: book.Price,
        Quantity: book.Quantity
    });
});

app.put('/book/:Code' , async(req,res) => {
    const {Code , Name ,Price , Quantity} = req.body
    const book = await Book.findOne({Code});
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.Code = Code;
    book.Name = Name;
    book.Price = Price;
    book.Quantity = Quantity;
    await book.save();

    res.status(201).json({
        Code: book.Code,
        Name: book.Name,
        Price: book.Price,
        Quantity: book.Quantity
    });
});

app.delete('/book/:Code', async (req, res) => {
  const { Code } = req.params;
  const book = await Book.findOne({ Code });
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  await Book.deleteOne({ Code });

  console.log("Book Deleted Successfully");

  res.status(200).json({
    message: "Book Deleted Successfully"
  });
});

// Start server
app.listen(port, () => {
    console.log("Server is running on port:", port);
});