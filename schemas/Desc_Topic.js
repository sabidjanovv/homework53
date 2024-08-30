const mongoose = require("mongoose");

const descTopicSchema = new mongoose.Schema({
  desc_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Description",
    required: true,
  },
  topic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
});

const Desc_Topic = mongoose.model("Desc_Topic", descTopicSchema);

module.exports = Desc_Topic;
