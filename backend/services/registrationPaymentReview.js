const Registration = require("../models/Registration");
const {
  sendRegistrationApprovedEmail,
  sendRegistrationRejectedEmail,
} = require("./emailService");

async function reviewRegistrationPayment(registrationId, decision) {
  if (!["approved", "rejected"].includes(decision)) {
    throw new Error("Payment decision must be approved or rejected.");
  }

  const registration = await Registration.findOneAndUpdate(
    {
      _id: registrationId,
      paymentStatus: "pending",
      "paymentReceipt.url": { $exists: true, $ne: null },
    },
    {
      $set: {
        paymentStatus: decision,
        status: decision,
        approvedAt: decision === "approved" ? new Date() : null,
      },
    },
    { new: true },
  );

  if (!registration) {
    const current = await Registration.findById(registrationId);
    if (!current) return { result: "not_found" };
    return {
      result: "already_reviewed",
      registration: current,
    };
  }

  try {
    if (decision === "approved") {
      await sendRegistrationApprovedEmail(registration);
    } else {
      await sendRegistrationRejectedEmail(
        registration,
        "Payment proof could not be verified.",
      );
    }
  } catch (emailError) {
    console.error("[Payment review] Applicant email failed:", emailError);
  }

  return { result: "reviewed", registration };
}

module.exports = reviewRegistrationPayment;
