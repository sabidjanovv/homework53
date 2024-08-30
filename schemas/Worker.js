const { Schema, model } = require("mongoose");

const workerSchema = new Schema(
  {
    FISH: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      min: 16,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
  },
  {
    versionKey: false,
  }
);
module.exports = model("Worker", workerSchema);
