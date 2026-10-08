const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    thumbnailUrl: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["draft", "scheduled", "live", "ended", "cancelled"],
      default: "draft",
    },
    scheduledAt: {
      type: Date,
      default: null,
    },
    startedAt: {
      type: Date,
      default: null,
    },
    endedAt: {
      type: Date,
      default: null,
    },
    durationMinutes: {
      type: Number,
      default: 60,
      min: 15,
    },
    timezone: {
      type: String,
      default: "UTC",
    },
    capacity: {
      type: Number,
      default: null,
      min: 1,
    },
    accessType: {
      type: String,
      enum: ["public", "registered", "course", "private"],
      default: "registered",
    },
    settings: {
      chatEnabled: { type: Boolean, default: true },
      questionsEnabled: { type: Boolean, default: true },
      pollsEnabled: { type: Boolean, default: true },
      recordingEnabled: { type: Boolean, default: true },
      screenSharingEnabled: { type: Boolean, default: true },
    },
    videoProvider: {
      provider: { type: String, default: "zoom" },
      externalMeetingId: { type: String, default: "" },
      externalMeetingNumber: { type: String, default: "" },
      joinUrl: { type: String, default: "" },
    },
    recording: {
      status: { type: String, default: "none" },
      externalRecordingId: { type: String, default: "" },
      playbackUrl: { type: String, default: "" },
      durationSeconds: { type: Number, default: 0 },
    },
    resources: [
      {
        title: { type: String, required: true },
        type: { type: String, default: "document" },
        url: { type: String, required: true },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Webinar", webinarSchema);
