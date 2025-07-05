// 📦 Packages
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();

// 🌐 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected To MongoDB!"))
  .catch((error) => console.error("❌ Connection Error:", error));

// 🧠 Schema & Model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "GUEST"
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 55
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ['admin', 'user']
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Fix Redundancy
userSchema.statics.exist = async function (name,email) {
    let exist = false;
    const user = await this.findOne({$or: [{ name }, { email }]});
    
    if(user) exist = true;

    return exist;
}

const User = mongoose.model('User', userSchema);

// 👤 Create & Save User
async function createUser(name, age, email, role) {
  try {
    if(!await User.exist(name,email)){
        const user = new User({ name, age, email, role });
        await user.save();
        console.log("✅ User Saved!");
    }
    else
        console.log("❌ User Already Exists!");
    
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}


// Main App Run
createUser("newuser2", 18, "abc3@gmail.com", "admin");

