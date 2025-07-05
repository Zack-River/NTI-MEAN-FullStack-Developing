const User = require('./User');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: [true, "Content is required"]
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

postSchema.index({ title: 1 });

module.exports = mongoose.model('Post', postSchema);
