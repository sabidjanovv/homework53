const mongoose = require("mongoose");

const authorSocialSchema = new mongoose.Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  social_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Social",
    required: true,
  },
  social_link: { type: String, required: true },
});

const Author_Social = mongoose.model("Author_Social", authorSocialSchema);

module.exports = Author_Social;
