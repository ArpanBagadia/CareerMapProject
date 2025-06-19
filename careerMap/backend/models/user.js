const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String },
  googleId: String,
  imageUrl: String,
  role: { type: String, enum: ["student", "tutor", "company"], default: null },
});
  
module.exports = mongoose.model("User", userSchema);
