const Registration = require("../models/Registration");

const {
  sendRegistrationReceivedEmail,
  sendRegistrationApprovedEmail,
  sendRegistrationRejectedEmail,
} = require("../services/emailService");

/*
|--------------------------------------------------------------------------
| CREATE REGISTRATION
|--------------------------------------------------------------------------
| POST /api/register
|--------------------------------------------------------------------------
*/

const createRegistration = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      hasTikTok,
      tiktokUsername,
      tiktokProfileLink,
      followers,
      realEstateCompany,
      trainingType,
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | VALIDATION
    |--------------------------------------------------------------------------
    */

    if (
      !name ||
      !phone ||
      !email ||
      typeof hasTikTok !== "boolean" ||
      !realEstateCompany ||
      !trainingType
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required registration fields.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CHECK DUPLICATE PENDING REGISTRATION
    |--------------------------------------------------------------------------
    */

    const existingPending = await Registration.findOne({
      email: email.toLowerCase().trim(),
      status: "pending",
    });

    if (existingPending) {
      return res.status(409).json({
        success: false,
        message:
          "You already have a registration under review. Our team will contact you soon.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE REGISTRATION
    |--------------------------------------------------------------------------
    */

    const registration = await Registration.create({
      name,
      phone,
      email: email.toLowerCase().trim(),
      hasTikTok,
      tiktokUsername: tiktokUsername || null,
      tiktokProfileLink: tiktokProfileLink || null,
      followers:
        followers !== undefined && followers !== "" ? Number(followers) : null,
      realEstateCompany,
      trainingType,
      status: "pending",
    });

    /*
    |--------------------------------------------------------------------------
    | SEND CONFIRMATION EMAIL
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    | We intentionally do NOT fail the registration if the email fails.
    | The database registration has already been successfully created.
    |
    */

    let emailResult = null;

    try {
      emailResult = await sendRegistrationReceivedEmail(registration);
    } catch (emailError) {
      console.error("Registration confirmation email failed:", emailError);
    }

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    return res.status(201).json({
      success: true,

      message:
        "Registration submitted successfully. Our team will review your application and contact you with the next steps.",

      registration: {
        id: registration._id,
        name: registration.name,
        email: registration.email,
        status: registration.status,
        trainingType: registration.trainingType,
      },

      emailSent: Boolean(emailResult?.success),
    });
  } catch (error) {
    console.error("Create registration error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while submitting your registration. Please try again.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET REGISTRATION STATS
|--------------------------------------------------------------------------
| GET /api/register/stats
|--------------------------------------------------------------------------
*/

const getRegistrationStats = async (req, res) => {
  try {
    const [registeredStudents, approved, pending, rejected] = await Promise.all(
      [
        Registration.countDocuments(),
        Registration.countDocuments({ status: "approved" }),
        Registration.countDocuments({ status: "pending" }),
        Registration.countDocuments({ status: "rejected" }),
      ],
    );

    return res.status(200).json({
      success: true,
      registeredStudents,
      approved,
      pending,
      rejected,
    });
  } catch (error) {
    console.error("Get registration stats error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load registration statistics.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL REGISTRATIONS
|--------------------------------------------------------------------------
| GET /api/register
|--------------------------------------------------------------------------
*/

const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      registrations,
    });
  } catch (error) {
    console.error("Get registrations error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load registrations.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET ONE REGISTRATION
|--------------------------------------------------------------------------
| GET /api/register/:id
|--------------------------------------------------------------------------
*/

const getRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    return res.status(200).json({
      success: true,
      registration,
    });
  } catch (error) {
    console.error("Get registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load registration.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| APPROVE REGISTRATION
|--------------------------------------------------------------------------
| PUT /api/register/:id/approve
|--------------------------------------------------------------------------
*/

const approveRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | ALREADY APPROVED
    |--------------------------------------------------------------------------
    */

    if (registration.status === "approved") {
      return res.status(400).json({
        success: false,
        message: "This registration is already approved.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE STATUS
    |--------------------------------------------------------------------------
    */

    registration.status = "approved";

    await registration.save();

    /*
    |--------------------------------------------------------------------------
    | SEND APPROVAL EMAIL
    |--------------------------------------------------------------------------
    */

    let emailSent = false;

    try {
      const result = await sendRegistrationApprovedEmail(registration);

      emailSent = Boolean(result?.success);
    } catch (emailError) {
      console.error("Approval email failed:", emailError);
    }

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    return res.status(200).json({
      success: true,

      message:
        "Registration approved successfully. The student has been notified by email.",

      emailSent,

      registration,
    });
  } catch (error) {
    console.error("Approve registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to approve registration.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| REJECT REGISTRATION
|--------------------------------------------------------------------------
| PUT /api/register/:id/reject
|--------------------------------------------------------------------------
*/

const rejectRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | ALREADY REJECTED
    |--------------------------------------------------------------------------
    */

    if (registration.status === "rejected") {
      return res.status(400).json({
        success: false,
        message: "This registration is already rejected.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE STATUS
    |--------------------------------------------------------------------------
    */

    registration.status = "rejected";

    await registration.save();

    /*
    |--------------------------------------------------------------------------
    | SEND REJECTION EMAIL
    |--------------------------------------------------------------------------
    */

    let emailSent = false;

    try {
      const result = await sendRegistrationRejectedEmail(registration);

      emailSent = Boolean(result?.success);
    } catch (emailError) {
      console.error("Rejection email failed:", emailError);
    }

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    return res.status(200).json({
      success: true,

      message:
        "Registration rejected successfully. The student has been notified by email.",

      emailSent,

      registration,
    });
  } catch (error) {
    console.error("Reject registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reject registration.",
    });
  }
};

module.exports = {
  createRegistration,
  getRegistrationStats,
  getRegistrations,
  getRegistration,
  approveRegistration,
  rejectRegistration,
};
