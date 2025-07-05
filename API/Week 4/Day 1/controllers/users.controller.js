const userModel = require('../models/user.model');
const capitalizeWords = require('../utils/capitalizeWords');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const generateToken = require('../utils/tokenGenerator');

dotenv.config();

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, Email and Password are required" });
    }

    const capitalizedName = capitalizeWords(name);
    const hashedPassword = await bcrypt.hash(password,12); // length of salt text;
    const newUser = new userModel({ 
      name: capitalizedName,
      email: email,
      password: hashedPassword
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function logIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }

    // Get user and include password
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate token with only safe fields
    const secret = process.env.SECRET || "fallback_secret";
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    const token = generateToken(payload);
    res.json({
      message: "Login successful",
      token
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getProfile (req,res) {
  const user = await userModel.findById(req.user.id);
  res.json({user});
}

module.exports = {register,logIn,getProfile};