const mongoose = require("mongoose");

const Registration = require("../models/Registration");

const {
  sendRegistrationReceivedEmail,
  sendRegistrationApprovedEmail,
  sendRegistrationRejectedEmail,
} = require("../services/emailService");

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

function normalizeBoolean(value) {
  if (typeof value === "boolean") {
    return value;
  }

  if (value === "true" || value === "yes" || value === 1 || value === "1") {
    return true;
  }

  if (value === "false" || value === "no" || value === 0 || value === "0") {
    return false;
  }

  return null;
}

function cleanString(value) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

/*
|--------------------------------------------------------------------------
| CREATE REGISTRATION
|--------------------------------------------------------------------------
|
| POST /api/register
|
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
    | BASIC VALIDATION
    |--------------------------------------------------------------------------
    */

    const normalizedName = cleanString(name);
    const normalizedPhone = cleanString(phone);
    const normalizedEmail = cleanString(email).toLowerCase();
    const normalizedCompany = cleanString(realEstateCompany);
    const normalizedTrainingType =
      cleanString(trainingType) || "In-person / Face-to-face";

    const normalizedHasTikTok = normalizeBoolean(hasTikTok);

    if (!normalizedName) {
      return res.status(400).json({
        success: false,
        message: "Full name is required.",
      });
    }

    if (!normalizedPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required.",
      });
    }

    if (!normalizedEmail) {
      return res.status(400).json({
        success: false,
        message: "Email address is required.",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (!normalizedCompany) {
      return res.status(400).json({
        success: false,
        message: "Real estate company or agency is required.",
      });
    }

    if (normalizedHasTikTok === null) {
      return res.status(400).json({
        success: false,
        message: "Please specify whether you have a TikTok account.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | TIKTOK VALIDATION
    |--------------------------------------------------------------------------
    */

    let normalizedUsername = null;
    let normalizedProfileLink = null;
    let normalizedFollowers = null;

    if (normalizedHasTikTok) {
      normalizedUsername = cleanString(tiktokUsername).replace(/^@/, "");
      normalizedProfileLink = cleanString(tiktokProfileLink);

      if (!normalizedUsername) {
        return res.status(400).json({
          success: false,
          message: "TikTok username is required.",
        });
      }

      if (!normalizedProfileLink) {
        return res.status(400).json({
          success: false,
          message: "TikTok profile link is required.",
        });
      }

      const followerNumber = Number(followers);

      if (
        followers === undefined ||
        followers === null ||
        followers === "" ||
        !Number.isInteger(followerNumber) ||
        followerNumber < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid TikTok follower count.",
        });
      }

      normalizedFollowers = followerNumber;
    }

    /*
    |--------------------------------------------------------------------------
    | DUPLICATE PROTECTION
    |--------------------------------------------------------------------------
    */

    const existingRegistration = await Registration.findOne({
      email: normalizedEmail,
      status: {
        $in: ["pending", "approved"],
      },
    }).sort({
      createdAt: -1,
    });

    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        message:
          existingRegistration.status === "approved"
            ? "This email already has an approved registration."
            : "A registration with this email is already pending review.",
        registration: existingRegistration,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE REGISTRATION
    |--------------------------------------------------------------------------
    */

    const registration = await Registration.create({
      name: normalizedName,
      phone: normalizedPhone,
      email: normalizedEmail,
      hasTikTok: normalizedHasTikTok,
      tiktokUsername: normalizedUsername,
      tiktokProfileLink: normalizedProfileLink,
      followers: normalizedFollowers,
      realEstateCompany: normalizedCompany,
      trainingType: normalizedTrainingType,
      status: "pending",
    });

    /*
    |--------------------------------------------------------------------------
    | SEND CONFIRMATION EMAIL
    |--------------------------------------------------------------------------
    */

    try {
      await sendRegistrationReceivedEmail(registration);
    } catch (emailError) {
      console.error("[Registration] Confirmation email failed:", emailError);
    }

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    return res.status(201).json({
      success: true,
      message:
        "Registration received successfully. Your application is now pending review.",
      registration,
    });
  } catch (error) {
    console.error("[createRegistration]", error);

    return res.status(500).json({
      success: false,
      message: "Registration could not be completed. Please try again.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| REGISTRATION STATS
|--------------------------------------------------------------------------
|
| GET /api/register/stats
|
*/

const getRegistrationStats = async (req, res) => {
  try {
    const [registeredStudents, approved, pending, rejected] = await Promise.all(
      [
        Registration.countDocuments(),

        Registration.countDocuments({
          status: "approved",
        }),

        Registration.countDocuments({
          status: "pending",
        }),

        Registration.countDocuments({
          status: "rejected",
        }),
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
    console.error("[getRegistrationStats]", error);

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
|
| GET /api/register
|
*/

const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    console.error("[getRegistrations]", error);

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
|
| GET /api/register/:id
|
*/

const getRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration ID.",
      });
    }

    const registration = await Registration.findById(id);

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
    console.error("[getRegistration]", error);

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
|
| PUT /api/register/:id/approve
|
*/

const approveRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration ID.",
      });
    }

    const registration = await Registration.findById(id);

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
      return res.status(200).json({
        success: true,
        message: "Registration is already approved.",
        registration,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | APPROVE
    |--------------------------------------------------------------------------
    */

    registration.status = "approved";

    await registration.save();

    /*
    |--------------------------------------------------------------------------
    | SEND APPROVAL EMAIL
    |--------------------------------------------------------------------------
    */

    try {
      await sendRegistrationApprovedEmail(registration);
    } catch (emailError) {
      console.error("[Approval] Approval email failed:", emailError);
    }

    return res.status(200).json({
      success: true,
      message: "Registration approved successfully.",
      registration,
    });
  } catch (error) {
    console.error("[approveRegistration]", error);

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
|
| PUT /api/register/:id/reject
|
| Optional body:
|
| {
|   "reason": "The current training intake is full."
| }
|
*/

const rejectRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration ID.",
      });
    }

    const registration = await Registration.findById(id);

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
      return res.status(200).json({
        success: true,
        message: "Registration is already rejected.",
        registration,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | REASON
    |--------------------------------------------------------------------------
    */

    const reason = cleanString(req.body?.reason);

    /*
    |--------------------------------------------------------------------------
    | REJECT
    |--------------------------------------------------------------------------
    */

    registration.status = "rejected";

    await registration.save();

    /*
    |--------------------------------------------------------------------------
    | SEND REJECTION EMAIL
    |--------------------------------------------------------------------------
    */

    try {
      await sendRegistrationRejectedEmail(registration, reason);
    } catch (emailError) {
      console.error("[Rejection] Rejection email failed:", emailError);
    }

    return res.status(200).json({
      success: true,
      message: "Registration rejected successfully.",
      registration,
    });
  } catch (error) {
    console.error("[rejectRegistration]", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reject registration.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE REGISTRATION
|--------------------------------------------------------------------------
|
| DELETE /api/register/:id
|
| Permanently deletes a registration.
|
*/

const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    /*
    |--------------------------------------------------------------------------
    | VALIDATE ID
    |--------------------------------------------------------------------------
    */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration ID.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | FIND AND DELETE
    |--------------------------------------------------------------------------
    */

    const registration = await Registration.findByIdAndDelete(id);

    /*
    |--------------------------------------------------------------------------
    | NOT FOUND
    |--------------------------------------------------------------------------
    */

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found. It may have already been deleted.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | SUCCESS
    |--------------------------------------------------------------------------
    */

    return res.status(200).json({
      success: true,
      message: `${registration.name}'s registration was deleted successfully.`,
      registration,
    });
  } catch (error) {
    console.error("[deleteRegistration]", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete registration. Please try again.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| EXPORTS
|--------------------------------------------------------------------------
*/

module.exports = {
  createRegistration,
  getRegistrationStats,
  getRegistrations,
  getRegistration,
  approveRegistration,
  rejectRegistration,
  deleteRegistration,
};
