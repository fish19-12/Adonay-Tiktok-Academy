const mongoose = require("mongoose");

const webinarMessageSchema = new mongoose.Schema(
  {
    webinarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Webinar",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["chat", "system", "moderator"],
      default: "chat",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("WebinarMessage", webinarMessageSchema);
