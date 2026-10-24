const mongoose = require("mongoose");

const businessInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
      maxlength: 254,
    },
    businessType: {
      type: String,
      required: true,
      enum: [
        "Real Estate Agent",
        "Personal Trainer",
        "Beauty Professional",
        "Sales Consultant",
        "Event Planner",
        "Other Service Business",
      ],
    },
    tiktokUsername: {
      type: String,
      trim: true,
      default: "",
      maxlength: 24,
    },
    tiktokProfileLink: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },
    goals: {
      type: String,
      trim: true,
      default: "",
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("BusinessInquiry", businessInquirySchema);
