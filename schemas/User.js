const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  user_email: { type: String, required: true, unique: true },
  user_password: { type: String, required: true },
  user_info: { type: String, required: true },
  user_photo: { type: String, required: true },
  user_is_active: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", userSchema);
