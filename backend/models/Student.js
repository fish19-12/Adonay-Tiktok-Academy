const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    age: Number,
    gender: String,
    course: String,
    address: String,
    education: String,
    emergencyName: String,
    emergencyPhone: String,

    idDocument: String,
    idDocumentPublicId: String, // ✅ add this

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Student", studentSchema);
