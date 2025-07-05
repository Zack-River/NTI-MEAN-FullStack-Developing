const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /users - Add a new user
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;

    const newUser = new User({ name, email });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
