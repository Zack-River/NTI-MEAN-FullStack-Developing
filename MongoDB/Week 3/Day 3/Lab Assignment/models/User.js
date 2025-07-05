const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true
  },
});

userSchema.index({ name: 1 });

module.exports = mongoose.model('User', userSchema);