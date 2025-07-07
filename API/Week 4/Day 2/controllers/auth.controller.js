const User = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/hash');
const sendEmail = require('../utils/sendemail');
const { generateAccessToken, generateRefreshToken, generateResetToken , verifyToken } = require('../utils/token');


exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing)
    return res.status(409).json({ message: 'Email already in use' });

  const hashed = await hashPassword(password);
  const newUser = await User.create({ email, password: hashed });

  const accessToken = generateAccessToken({ id: newUser._id });
  const refreshToken = generateRefreshToken({ id: newUser._id });

  newUser.refreshToken = refreshToken;
  await newUser.save();

  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });
  res.status(201).json({ accessToken });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) return res.status(401).json({ message: 'Invalid email or password.' });

  const match = await comparePassword(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid email or password.' });

  const accessToken = generateAccessToken({ id: user._id });
  const refreshToken = generateRefreshToken({ id: user._id });
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });
  res.json({ accessToken });
};

exports.logout = async (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const resetToken = generateResetToken({ id: user._id }); // short-lived
  console.log(`Reset Token: ${resetToken}`);

  const receiver = "zackriver.dev@gmail.com"; // user.email
  const title = "Request to Change Password";
  const text = `
    <h1>Welcome, ${user.name}!</h1>
    <p>Thanks for signing up. <b>We’re glad you’re here.</b></p>
    <p><a href="http://localhost:3000/user/reset-password/${resetToken}">Click here to reset your password</a></p>
  `
  sendEmail( receiver, title , text);

  res.json({ message: `Reset link sent to email: http://localhost:3000/user/reset-password/${resetToken}` });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const payload = verifyToken(token, process.env.RESET_TOKEN_SECRET);
    const user = await User.findById(payload.id).select('+password');;
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashed = await hashPassword(password);
    
    console.log(`Old Password: ${user.password}`);
    
    user.password = hashed;
    await user.save();

    console.log(`New Password: ${user.password}`);
    
    res.json({ message: 'Password updated' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};