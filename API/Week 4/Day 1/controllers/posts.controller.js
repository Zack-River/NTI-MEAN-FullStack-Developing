const postModel = require("../models/post.model");


async function getPosts (req,res) {
    const posts = await postModel.find().populate('author','name');
    res.json(posts);
}

async function createPost (req,res) {
    const newPost = new postModel(req.body);
    await newPost.save();
    res.json(newPost);
}

module.exports = {getPosts , createPost};