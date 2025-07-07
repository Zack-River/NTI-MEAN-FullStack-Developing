const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

userSchema.index({ name: 1 });

module.exports = mongoose.model("User" , userSchema)