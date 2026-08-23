const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
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

    date: {
      type: String,
      required: true,
    },

    service: {
      title: String,
      price: String,
      items: [String],
      category: String, // ✅ optional improvement (from your service page)
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "rejected"],
      default: "pending",
    },

    paymentScreenshot: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
