const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
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

    hasTikTok: {
      type: Boolean,
      required: true,
    },

    tiktokUsername: {
      type: String,
      trim: true,
      default: null,
    },

    tiktokProfileLink: {
      type: String,
      trim: true,
      default: null,
    },

    followers: {
      type: Number,
      min: 0,
      default: null,
    },

    realEstateCompany: {
      type: String,
      required: true,
      trim: true,
    },

    trainingType: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Registration", registrationSchema);
