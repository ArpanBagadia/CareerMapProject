const jwt = require("jsonwebtoken");
const admin = require("../firebase/firebase");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;

// Google login/signup
exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { name, email, picture, uid } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
      // New user
      user = await User.create({
        name,
        email,
        googleId: uid,
        imageUrl: picture,
        role: null, // set later
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid Google token" });
  }
};

// Set role after first Google login
exports.setRole = async (req, res) => {
  const { userId, role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Role updated", user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Email/Password Signup
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Signup error" });
  }
};

// Email/Password Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Login error" });
  }
};
