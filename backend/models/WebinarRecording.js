const mongoose = require("mongoose");

const webinarRecordingSchema = new mongoose.Schema(
  {
    webinarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Webinar",
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "Webinar recording",
      trim: true,
    },
    provider: {
      type: String,
      default: "zoom",
    },
    externalRecordingId: {
      type: String,
      default: "",
    },
    playbackUrl: {
      type: String,
      default: "",
    },
    durationSeconds: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["processing", "ready", "failed"],
      default: "processing",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("WebinarRecording", webinarRecordingSchema);
