const hash = require("../utils/hash");
const User = require("../models/user.Model");
const jwt = require('../utils/jwt');
const { sendEmail } = require("../utils/sendEmail");
const cookieHelper = require('../utils/cookie');

exports.register = async function (req, res) {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const normalizedEmail = email.toLowerCase();

    if (await User.findOne({ email: normalizedEmail })) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    if (await User.findOne({ username })) {
      return res.status(400).json({ message: "Username already in use!" });
    }

    const hashedPassword = await hash.hashPassword(password);

    const newUser = new User({
      name,
      username,
      email: normalizedEmail,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User Created Successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async function (req, res) {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    if (accessToken) {
      try {
        jwt.verifyToken(accessToken, "access");
        return res.status(200).json({ message: "Already logged in.", loggedIn: true });
      } catch (err) {
        console.error('Access token invalid:', err);
        return res.status(401).json({ message: 'Session expired, please log in again.' });
      }
    }

    if (refreshToken) {
      try {
        jwt.verifyToken(refreshToken, 'refresh');
        return res.status(200).json({ message: "Already logged in.", loggedIn: true });
      } catch (err) { 
        console.error('Refresh token invalid:', err);
        return res.status(401).json({ message: 'Session expired, please log in again.' });
      }
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email or Username and Password are required!" });
    }

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: email }]
    }).select("+password");

    if (!user || !(await hash.comparePassword(password, user.password))) {
      return res.status(400).json({ message: "Wrong Email / Username or Password!" });
    }

    const newAccessToken = jwt.generateAccessToken(user);
    const newRefreshToken = jwt.generateRefreshToken(user);

    cookieHelper.setAccessTokenCookie(res, newAccessToken);
    cookieHelper.setRefreshTokenCookie(res, newRefreshToken);

    user.refreshToken = newRefreshToken;
    user.lastLogin = Date.now();
    await user.save();

    res.status(200).json({
      message: "Logged In successfully.",
      accessToken: newAccessToken,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.forgetPassword = async function (req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Invalid Email" });
  }

  const normalizedEmail = email.toLowerCase();

  const user = await User.findOne({
    $or: [{ username: normalizedEmail }, { email: normalizedEmail }]
  }).select("+email");

  if (!user || !user.email) {
    return res.status(404).json({ message: "User Not Found or Invalid Email" });
  }

  const resetToken = jwt.generateResetToken(user);
  const resetLink = `http://localhost:3000/user/reset-password?resetToken=${resetToken}`;

  cookieHelper.setResetCookie(res, resetToken);

  const title = "Reset Your Password";
  const html = `
    <h1>Hello, ${user.name}!</h1>
    <p>You requested to reset your password.</p>
    <p><a href="${resetLink}">Click here to reset your password</a></p>
    <p>This link will expire in 10 minutes.</p>
  `;

  await sendEmail(user.email, title, html);

  res.status(200).json({
    message: `Reset link sent to email: ${user.email}`,
    token: resetToken,
    link: resetLink
  });
};

exports.resetPassword = async function (req, res) {
  const { password } = req.body;
  const token = req.query?.resetToken || req.cookies?.resetToken || req.body.resetToken;

  if (!token || !password) {
    return res.status(400).json({ message: "Token and new password are required!" });
  }

  try {
    const decoded = jwt.verifyToken(token,'reset');

    const user = await User.findById(decoded.id).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (await hash.comparePassword(password, user.password)) {
      return res.status(400).json({ message: "New password must be different from the old password!" });
    }

    user.password = await hash.hashPassword(password);
    await user.save();

    cookieHelper.clearResetCookie(res);

    res.json({ message: "Password reset successfully!" });

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid or expired token!" });
  }
};

exports.refreshAccessToken = async function (req, res) {
  const token = req.cookies.refreshToken || req.body.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token!" });

  try {
    const decoded = jwt.verifyToken(token, 'refresh');
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found!" });

    const newAccessToken = jwt.generateAccessToken(user);

    cookieHelperHelper.setAccessTokenCookie(res, newAccessToken);

    res.json({ accessToken: newAccessToken });

  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Invalid or expired refresh token!" });
  }
};

exports.showProfile = function (req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated!' });
    }

    res.status(200).json({
      message: 'User profile fetched successfully.',
      user: {
        id: req.user._id,
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role,
        createdAt: req.user.createdAt,
        lastLogin: req.user.lastLogin,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong while fetching profile.' });
  }
};

exports.logout = async function (req, res) {
  try {
    cookieHelper.clearAuthCookies(res);

    return res.status(200).json({ message: 'Logged out successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong while logging out.' });
  }
};