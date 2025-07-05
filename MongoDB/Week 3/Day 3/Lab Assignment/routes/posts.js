const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');

// POST /posts - Add a new post
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const newPost = new Post({ title, content, author });
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get /posts - Get all posts with author name
router.get('/' , async (req,res) => {
    try {
        const useLean = req.query.lean === 'true';
        let query = Post.find().populate('author', 'name');

        if(useLean) {
            query = query.lean();
        }

        const posts = await query;
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// GET /posts/export - Export all posts to posts.txt
router.get('/export', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../posts.txt');
    const writeStream = fs.createWriteStream(filePath);

    const cursor = Post.find().populate('author', 'name').cursor();

    cursor.on('data', (post) => {
      const line = `Title: ${post.title}, Author: ${post.author.name}\n`;
      writeStream.write(line);
    });

    cursor.on('end', () => {
      writeStream.end();
      res.send('Export finished, file saved as posts.txt');
    });

    cursor.on('error', (err) => {
      res.status(500).json({ error: err.message });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;