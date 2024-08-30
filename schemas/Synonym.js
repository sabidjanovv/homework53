const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const synonymSchema = new Schema({
  desc_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Description",
    required: true,
  },
  dict_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dictionary", 
    required: true,
  },
});

module.exports = mongoose.model("Synonym", synonymSchema);
