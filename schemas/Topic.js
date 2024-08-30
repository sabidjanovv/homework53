const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  topic_title: { type: String, required: true },
  topic_text: { type: String, required: true },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
  is_checked: { type: Boolean, default: false },
  is_approved: { type: Boolean, default: false },
  expert_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
