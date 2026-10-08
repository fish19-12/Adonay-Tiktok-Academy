const mongoose = require("mongoose");

const webinarAttendanceSchema = new mongoose.Schema(
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
    registrationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WebinarRegistration",
      default: null,
    },
    joinedAt: {
      type: Date,
      default: null,
    },
    leftAt: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["joined", "left", "present", "absent"],
      default: "joined",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("WebinarAttendance", webinarAttendanceSchema);
