const { getPosts, createPost } = require('../controllers/posts.controller');
const express = require("express");

const router = express.Router(); // to impelement seperated routes not full new express app

router.get('/', getPosts);

router.post('/' , createPost);

module.exports = router;