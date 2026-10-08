const mongoose = require("mongoose");

const webinarRegistrationSchema = new mongoose.Schema(
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
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["registered", "attended", "waitlisted", "cancelled"],
      default: "registered",
    },
    emailVerifiedAt: {
      type: Date,
      default: null,
    },
    accessTokenHash: {
      type: String,
      default: null,
      select: false,
    },
    accessTokenExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },
    joinedAt: {
      type: Date,
      default: null,
    },
    leftAt: {
      type: Date,
      default: null,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true },
);

webinarRegistrationSchema.index({ webinarId: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("WebinarRegistration", webinarRegistrationSchema);
