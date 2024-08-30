const mongoose = require("mongoose");

const SocialSchema = new mongoose.Schema({
  social_name: {
    type: String,
    required: true,
  },
  social_icon_file: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Social", SocialSchema);
