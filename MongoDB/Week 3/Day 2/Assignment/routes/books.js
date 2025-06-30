const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /books/genre/:genre (before /:id)
router.get('/genre/:genre', async (req, res) => {
  try {
    const books = await Book.findByGenre(req.params.genre);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving books by genre." });
  }
});

// POST /books
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// GET /books/:id
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found." });
    res.json(book);
  } catch {
    res.status(404).json({ message: "Book not found." });
  }
});

// PUT /books/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: "Book not found." });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /books/:id
router.delete('/:id', async (req, res) => {
  const deleted = await Book.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Book not found." });
  res.json({ message: `Deleted book: ${deleted.title}` });
});

module.exports = router;
