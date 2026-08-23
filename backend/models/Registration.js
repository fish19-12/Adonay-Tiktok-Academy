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
      default: "In-person / Face-to-face",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

/*
|--------------------------------------------------------------------------
| INDEX
|--------------------------------------------------------------------------
|
| Helps the admin registration queries remain fast.
|
*/

registrationSchema.index({
  email: 1,
});

registrationSchema.index({
  status: 1,
  createdAt: -1,
});

module.exports = mongoose.model("Registration", registrationSchema);
