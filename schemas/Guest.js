const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  guest_ip: { type: String, required: true },
  guest_os: { type: String, required: true },
  guest_device: { type: String, required: true },
  guest_browser: { type: String, required: true },
  guest_reg_date: { type: Date, default: Date.now },
});

const Guest = mongoose.model("Guest", guestSchema);

module.exports = Guest;
