const mongoose = require("mongoose");

const webinarQuestionSchema = new mongoose.Schema(
  {
    webinarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Webinar",
      required: true,
      index: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    authorName: {
      type: String,
      default: "Guest",
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "answered", "moderated"],
      default: "pending",
    },
    answer: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("WebinarQuestion", webinarQuestionSchema);
