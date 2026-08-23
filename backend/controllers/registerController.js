const Registration = require("../models/Registration");

/*
|--------------------------------------------------------------------------
| CREATE REGISTRATION
|--------------------------------------------------------------------------
*/

const createRegistration = async (req, res, next) => {
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

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Please enter your full name.",
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        message: "Please enter your phone number.",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        message: "Please enter your email address.",
      });
    }

    if (typeof hasTikTok !== "boolean") {
      return res.status(400).json({
        message: "Please specify whether you have a TikTok account.",
      });
    }

    if (!realEstateCompany || !realEstateCompany.trim()) {
      return res.status(400).json({
        message: "Please enter your real estate company or agency.",
      });
    }

    if (!trainingType || !trainingType.trim()) {
      return res.status(400).json({
        message: "Training type is required.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | TIKTOK VALIDATION
    |--------------------------------------------------------------------------
    */

    if (hasTikTok) {
      if (!tiktokUsername || !tiktokUsername.trim()) {
        return res.status(400).json({
          message: "Please enter your TikTok username.",
        });
      }

      if (!tiktokProfileLink || !tiktokProfileLink.trim()) {
        return res.status(400).json({
          message: "Please enter your TikTok profile link.",
        });
      }

      if (
        followers === null ||
        followers === undefined ||
        !Number.isInteger(Number(followers)) ||
        Number(followers) < 0
      ) {
        return res.status(400).json({
          message: "Please enter your exact TikTok follower count.",
        });
      }
    }

    /*
    |--------------------------------------------------------------------------
    | CHECK IF EMAIL IS ALREADY REGISTERED
    |--------------------------------------------------------------------------
    */

    const existingRegistration = await Registration.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingRegistration) {
      return res.status(409).json({
        message: "This email address is already registered.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE REGISTRATION
    |--------------------------------------------------------------------------
    */

    const registration = await Registration.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),

      hasTikTok,

      tiktokUsername: hasTikTok ? tiktokUsername.trim() : null,

      tiktokProfileLink: hasTikTok ? tiktokProfileLink.trim() : null,

      followers: hasTikTok ? Number(followers) : null,

      realEstateCompany: realEstateCompany.trim(),

      trainingType: trainingType.trim(),

      status: "pending",
    });

    return res.status(201).json({
      message: "Registration completed successfully.",
      registration,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| REGISTRATION STATS
|--------------------------------------------------------------------------
|
| Your registration page already calls:
|
| GET /api/registration/stats
|
| It expects:
|
| {
|   registeredStudents: number
| }
|
*/

const getRegistrationStats = async (req, res, next) => {
  try {
    const registeredStudents = await Registration.countDocuments();

    const approved = await Registration.countDocuments({
      status: "approved",
    });

    const pending = await Registration.countDocuments({
      status: "pending",
    });

    const rejected = await Registration.countDocuments({
      status: "rejected",
    });

    return res.status(200).json({
      registeredStudents,
      approved,
      pending,
      rejected,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL REGISTRATIONS
|--------------------------------------------------------------------------
*/

const getRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });

    return res.status(200).json({
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| GET SINGLE REGISTRATION
|--------------------------------------------------------------------------
*/

const getRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found.",
      });
    }

    return res.status(200).json({
      registration,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| APPROVE REGISTRATION
|--------------------------------------------------------------------------
*/

const approveRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found.",
      });
    }

    registration.status = "approved";

    await registration.save();

    return res.status(200).json({
      message: "Registration approved successfully.",
      registration,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| REJECT REGISTRATION
|--------------------------------------------------------------------------
*/

const rejectRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found.",
      });
    }

    registration.status = "rejected";

    await registration.save();

    return res.status(200).json({
      message: "Registration rejected successfully.",
      registration,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| EXPORT
|--------------------------------------------------------------------------
*/

module.exports = {
  createRegistration,
  getRegistrationStats,
  getRegistrations,
  getRegistration,
  approveRegistration,
  rejectRegistration,
};
