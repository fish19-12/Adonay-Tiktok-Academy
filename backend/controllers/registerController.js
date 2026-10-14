const mongoose = require("mongoose");
const crypto = require("crypto");
const streamifier = require("streamifier");

const Registration = require("../models/Registration");
const cloudinary = require("../config/cloudinary");
const getPaymentOptions = require("../config/paymentOptions");
const telegramBot = require("../bot");
const { verifyTelegramInitData } = require("../utils/telegramInitData");

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
      paymentMethod,
      telegramInitData,
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
    const normalizedPaymentMethod = cleanString(paymentMethod).toLowerCase();
    const paymentOptions = getPaymentOptions();

    const normalizedHasTikTok = normalizeBoolean(hasTikTok);
    let telegramUserId = null;

    if (telegramInitData) {
      try {
        telegramUserId = verifyTelegramInitData(
          telegramInitData,
          process.env.TELEGRAM_BOT_TOKEN,
        ).id;
      } catch (identityError) {
        return res.status(401).json({
          success: false,
          message: identityError.message,
        });
      }
    }

    if (!paymentOptions.configured) {
      return res.status(503).json({
        success: false,
        message:
          "Payment details are not configured. Please contact academy support.",
      });
    }

    if (!paymentOptions.methods[normalizedPaymentMethod]?.configured) {
      return res.status(400).json({
        success: false,
        message: "Choose CBE or Telebirr as your payment method.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Upload a screenshot of your payment to continue.",
      });
    }

    if (!telegramBot.canReviewPayments()) {
      return res.status(503).json({
        success: false,
        message:
          "Telegram payment review is not available. Please contact academy support.",
      });
    }

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

    const receiptUpload = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder:
            process.env.PAYMENT_RECEIPTS_FOLDER ||
            "adonay-tiktok-academy/payment-receipts",
          resource_type: "image",
          access_mode: "authenticated",
        },
        (uploadError, result) => {
          if (uploadError) return reject(uploadError);
          resolve(result);
        },
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    /*
    |--------------------------------------------------------------------------
    | CREATE REGISTRATION
    |--------------------------------------------------------------------------
    */

    const statusToken = crypto.randomBytes(32).toString("base64url");
    const statusTokenHash = crypto
      .createHash("sha256")
      .update(statusToken)
      .digest("hex");

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
      paymentMethod: normalizedPaymentMethod,
      paymentAmountEtb: paymentOptions.amountEtb,
      paymentReceipt: {
        url: receiptUpload.secure_url,
        public_id: receiptUpload.public_id,
      },
      paymentStatus: "pending",
      status: "pending",
      telegramUserId,
      statusTokenHash,
    });

    try {
      await telegramBot.notifyPaymentReview(
        registration,
        req.file.buffer,
        req.file.mimetype,
      );
    } catch (notificationError) {
      await Promise.allSettled([
        Registration.deleteOne({ _id: registration._id }),
        receiptUpload.public_id
          ? cloudinary.uploader.destroy(receiptUpload.public_id)
          : Promise.resolve(),
      ]);
      console.error(
        "[Registration] Telegram payment notification failed:",
        notificationError,
      );
      return res.status(503).json({
        success: false,
        message:
          "Academy support could not receive your payment proof. Please contact support before submitting again.",
      });
    }

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
      registration: {
        _id: registration._id,
        status: registration.status,
        trainingType: registration.trainingType,
        createdAt: registration.createdAt,
      },
      statusToken,
    });
  } catch (error) {
    console.error("[createRegistration]", error);

    return res.status(500).json({
      success: false,
      message: "Registration could not be completed. Please try again.",
    });
  }
};

const getRegistrationStatusByToken = async (req, res) => {
  const { token } = req.params;
  if (typeof token !== "string" || !/^[A-Za-z0-9_-]{43}$/.test(token)) {
    return res
      .status(404)
      .json({ success: false, message: "Registration status not found." });
  }

  try {
    const statusTokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const registration = await Registration.findOne({ statusTokenHash }).select(
      "status trainingType createdAt approvedAt telegramUserId communityInvites",
    );

    if (!registration) {
      return res
        .status(404)
        .json({ success: false, message: "Registration status not found." });
    }

    if (registration.status === "approved" && !registration.approvedAt) {
      registration.approvedAt = new Date();
      await registration.save();
    }

    let communityInvites = null;
    if (registration.status === "approved") {
      try {
        communityInvites =
          await telegramBot.createApprovedCommunityInvites(registration);
      } catch (inviteError) {
        console.error(
          "[Registration] Could not prepare approved community invites:",
          inviteError?.message || "unknown error",
        );
      }
    }

    return res.json({
      success: true,
      status: registration.status,
      trainingType: registration.trainingType,
      createdAt: registration.createdAt,
      approvedAt: registration.approvedAt,
      communityInvites,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Registration status is temporarily unavailable.",
    });
  }
};

const linkRegistrationTelegramIdentity = async (req, res) => {
  const { token } = req.params;
  if (typeof token !== "string" || !/^[A-Za-z0-9_-]{43}$/.test(token)) {
    return res.status(404).json({
      success: false,
      message: "Registration status not found.",
    });
  }

  let telegramUser;
  try {
    telegramUser = verifyTelegramInitData(
      req.body?.initData,
      process.env.TELEGRAM_BOT_TOKEN,
    );
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }

  try {
    const statusTokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const registration = await Registration.findOne({ statusTokenHash });
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration status not found.",
      });
    }

    if (
      registration.telegramUserId &&
      registration.telegramUserId !== telegramUser.id
    ) {
      return res.status(409).json({
        success: false,
        message: "This registration is linked to a different Telegram account.",
      });
    }

    if (!registration.telegramUserId) {
      registration.telegramUserId = telegramUser.id;
      await registration.save();
    }

    return res.json({ success: true, linked: true });
  } catch (error) {
    console.error("[linkRegistrationTelegramIdentity]", error);
    return res.status(500).json({
      success: false,
      message: "Telegram account could not be linked right now.",
    });
  }
};

const getPublicPaymentOptions = (_req, res) => {
  const reviewStatus = telegramBot.paymentReviewStatus();
  return res.json({
    success: true,
    ...getPaymentOptions(),
    reviewReady: reviewStatus === "ready",
    reviewStatus,
  });
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

    if (registration.paymentStatus !== "approved") {
      return res.status(409).json({
        success: false,
        message:
          "Payment must be verified by Telegram support before approval.",
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
    registration.approvedAt = new Date();

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
  linkRegistrationTelegramIdentity,
  getPublicPaymentOptions,
  getRegistrationStatusByToken,
  getRegistrationStats,
  getRegistrations,
  getRegistration,
  approveRegistration,
  rejectRegistration,
  deleteRegistration,
};
