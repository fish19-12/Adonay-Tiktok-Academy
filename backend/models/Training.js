const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    video: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
    },

    duration: {
      type: String,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Training", trainingSchema);
