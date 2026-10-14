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
      trim: true,
      default: "",
    },

    trainingType: {
      type: String,
      required: true,
      trim: true,
      default: "In-person / Face-to-face",
    },

    paymentMethod: {
      type: String,
      enum: ["cbe", "telebirr", null],
      default: null,
    },

    paymentAmountEtb: {
      type: Number,
      min: 1,
      default: null,
    },

    paymentReceipt: {
      url: { type: String, default: null },
      public_id: { type: String, default: null },
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    telegramUserId: {
      type: Number,
      default: null,
      index: true,
    },

    communityInvites: {
      studentGroup: {
        url: { type: String, default: null },
        expiresAt: { type: Date, default: null },
        requiresJoinApproval: { type: Boolean, default: false },
      },
      announcementsChannel: {
        url: { type: String, default: null },
        expiresAt: { type: Date, default: null },
        requiresJoinApproval: { type: Boolean, default: false },
      },
    },

    statusTokenHash: {
      type: String,
      select: false,
      default: null,
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
