const mongoose = require("mongoose");

const descQASchema = new mongoose.Schema({
  desc_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Description",
    required: true,
  },
  qa_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question_Answer",
    required: true,
  },
});

const Desc_QA = mongoose.model("Desc_QA", descQASchema);

module.exports = Desc_QA;
