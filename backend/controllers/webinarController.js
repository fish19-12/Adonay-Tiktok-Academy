const mongoose = require("mongoose");
const { createHash, randomBytes } = require("node:crypto");

const Webinar = require("../models/Webinar");
const WebinarRegistration = require("../models/WebinarRegistration");
const WebinarAttendance = require("../models/WebinarAttendance");
const WebinarQuestion = require("../models/WebinarQuestion");
const WebinarPoll = require("../models/WebinarPoll");
const WebinarPollVote = require("../models/WebinarPollVote");
const WebinarMessage = require("../models/WebinarMessage");
const WebinarResource = require("../models/WebinarResource");
const WebinarRecording = require("../models/WebinarRecording");
const WebinarAuditLog = require("../models/WebinarAuditLog");
const { sendWebinarVerificationEmail } = require("../services/emailService");
const {
  buildSlug,
  generateUniqueSlug,
  provisionMeeting,
  syncMeeting,
  deleteMeeting,
} = require("../services/webinarService");

const PUBLIC_WEBINAR_STATUSES = ["scheduled", "live", "ended"];
const ACCESS_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const WEBINAR_SELECT = "_id title slug description status scheduledAt startedAt endedAt durationMinutes timezone accessType capacity thumbnailUrl createdAt updatedAt";

function createWebinarAccessToken(webinar) {
  const token = randomBytes(32).toString("hex");
  const scheduledExpiry = webinar.scheduledAt
    ? new Date(webinar.scheduledAt).getTime() + 24 * 60 * 60 * 1000
    : 0;

  return {
    token,
    tokenHash: createHash("sha256").update(token).digest("hex"),
    expiresAt: new Date(Math.max(Date.now() + ACCESS_TOKEN_TTL_MS, scheduledExpiry)),
  };
}

function getVerificationUrl(webinar, token) {
  const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:5173")
    .split(",")[0]
    .trim();
  const url = new URL(`/webinars/${encodeURIComponent(webinar.slug)}`, frontendUrl);
  url.searchParams.set("registration_token", token);
  return url.toString();
}

async function appendAuditLog(webinarId, action, metadata = {}, actorId = null) {
  await WebinarAuditLog.create({ webinarId, actorId, action, metadata });
}

const getIdentifierQuery = (identifier) => {
  if (!identifier) {
    return {};
  }

  if (mongoose.Types.ObjectId.isValid(identifier)) {
    return { _id: identifier };
  }

  return { slug: identifier };
};

exports.getWebinars = async (req, res) => {
  try {
    const { status, courseId } = req.query;
    const filters = {
      status: { $in: PUBLIC_WEBINAR_STATUSES },
      accessType: { $ne: "private" },
    };

    if (status) {
      if (!PUBLIC_WEBINAR_STATUSES.includes(status)) {
        return res.status(200).json([]);
      }
      filters.status = status;
    }
    if (courseId) filters.courseId = courseId;

    const webinars = await Webinar.find(filters)
      .select(WEBINAR_SELECT)
      .sort({ scheduledAt: -1, createdAt: -1 });

    res.status(200).json(webinars);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch webinars", error: error.message });
  }
};

exports.getWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findOne({
      ...getIdentifierQuery(req.params.identifier || req.params.id),
      status: { $in: PUBLIC_WEBINAR_STATUSES },
      accessType: { $ne: "private" },
    }).lean();

    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    const [registrationsCount, questionsCount, pollsCount, messagesCount] = await Promise.all([
      WebinarRegistration.countDocuments({ webinarId: webinar._id }),
      WebinarQuestion.countDocuments({ webinarId: webinar._id }),
      WebinarPoll.countDocuments({ webinarId: webinar._id }),
      WebinarMessage.countDocuments({ webinarId: webinar._id }),
    ]);

    const publicWebinar = { ...webinar };
    const videoProvider = publicWebinar.videoProvider;
    delete publicWebinar.videoProvider;
    delete publicWebinar.recording;
    delete publicWebinar.createdBy;
    res.status(200).json({
      ...publicWebinar,
      videoProvider: { provider: videoProvider?.provider || "zoom" },
      analytics: {
        registrationsCount,
        questionsCount,
        pollsCount,
        messagesCount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch webinar", error: error.message });
  }
};

exports.createWebinar = async (req, res) => {
  try {
    const {
      title,
      description,
      scheduledAt,
      durationMinutes,
      timezone,
      accessType,
      courseId,
      capacity,
      thumbnailUrl,
      settings,
      resources,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const baseSlug = buildSlug(title);
    const existingSlugs = await Webinar.find({}, { slug: 1 }).lean();
    const slug = generateUniqueSlug(baseSlug, existingSlugs.map((item) => item.slug));

    const meeting = scheduledAt
      ? await provisionMeeting({
          title,
          scheduledAt: new Date(scheduledAt),
          durationMinutes: Number(durationMinutes || 60),
          timezone: timezone || "UTC",
        })
      : null;

    const webinar = await Webinar.create({
      title,
      slug,
      description,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      durationMinutes: Number(durationMinutes || 60),
      timezone: timezone || "UTC",
      accessType: accessType || "registered",
      courseId: courseId || null,
      capacity: capacity ? Number(capacity) : null,
      thumbnailUrl: thumbnailUrl || "",
      settings: {
        chatEnabled: true,
        questionsEnabled: true,
        pollsEnabled: true,
        recordingEnabled: true,
        screenSharingEnabled: true,
        ...(settings || {}),
      },
      resources: Array.isArray(resources) ? resources : [],
      videoProvider: meeting || {
        provider: "zoom",
        externalMeetingId: "",
        externalMeetingNumber: "",
        joinUrl: "",
      },
      status: scheduledAt ? "scheduled" : "draft",
      createdBy: req.user?._id || null,
    });

    await appendAuditLog(webinar._id, "webinar_created", { title }, req.user?._id || null);

    res.status(201).json({
      success: true,
      webinar,
      message: "Webinar created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create webinar", error: error.message });
  }
};

exports.updateWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findOne(getIdentifierQuery(req.params.identifier || req.params.id));

    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    const editableFields = [
      "title",
      "description",
      "scheduledAt",
      "durationMinutes",
      "timezone",
      "accessType",
      "capacity",
      "thumbnailUrl",
      "settings",
      "resources",
      "status",
    ];
    const requestBody = req.body || {};
    const updates = Object.fromEntries(
      editableFields
        .filter((field) => Object.hasOwn(requestBody, field))
        .map((field) => [field, requestBody[field]]),
    );

    if (updates.title) {
      updates.slug = generateUniqueSlug(buildSlug(updates.title), await Webinar.find({}, { slug: 1 }).lean().then((items) => items.map((item) => item.slug).filter((slug) => slug !== webinar.slug)));
    }

    const scheduledAt = Object.hasOwn(updates, "scheduledAt")
      ? updates.scheduledAt
      : webinar.scheduledAt;
    const meeting = webinar.videoProvider;
    if (updates.status === "cancelled" || !scheduledAt) {
      await deleteMeeting(meeting);
      updates.videoProvider = {
        provider: meeting?.provider || "zoom",
        externalMeetingId: "",
        externalMeetingNumber: "",
        joinUrl: "",
      };
      if (!scheduledAt && updates.status !== "cancelled") updates.status = "draft";
    } else if (meeting?.externalMeetingId) {
      await syncMeeting({
        provider: meeting.provider,
        externalMeetingId: meeting.externalMeetingId,
        title: updates.title || webinar.title,
        scheduledAt,
        durationMinutes: updates.durationMinutes || webinar.durationMinutes,
        timezone: updates.timezone || webinar.timezone,
      });
    } else {
      updates.videoProvider = await provisionMeeting({
        title: updates.title || webinar.title,
        scheduledAt: new Date(scheduledAt),
        durationMinutes: Number(updates.durationMinutes || webinar.durationMinutes),
        timezone: updates.timezone || webinar.timezone,
      });
    }

    Object.assign(webinar, updates);
    await webinar.save();

    await appendAuditLog(webinar._id, "webinar_updated", updates, req.user?._id || null);

    res.status(200).json({
      success: true,
      webinar,
      message: "Webinar updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update webinar", error: error.message });
  }
};

exports.deleteWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findOne(getIdentifierQuery(req.params.identifier || req.params.id));

    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    await deleteMeeting(webinar.videoProvider);
    await WebinarRegistration.deleteMany({ webinarId: webinar._id });
    await WebinarAttendance.deleteMany({ webinarId: webinar._id });
    await WebinarQuestion.deleteMany({ webinarId: webinar._id });
    await WebinarPoll.deleteMany({ webinarId: webinar._id });
    await WebinarPollVote.deleteMany({ webinarId: webinar._id });
    await WebinarMessage.deleteMany({ webinarId: webinar._id });
    await WebinarResource.deleteMany({ webinarId: webinar._id });
    await WebinarRecording.deleteMany({ webinarId: webinar._id });
    await WebinarAuditLog.deleteMany({ webinarId: webinar._id });
    await webinar.deleteOne();

    res.status(200).json({ success: true, message: "Webinar deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete webinar", error: error.message });
  }
};

exports.registerForWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findOne(getIdentifierQuery(req.params.identifier || req.params.id));

    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    if (webinar.accessType === "private") {
      return res.status(404).json({ message: "Webinar not found" });
    }

    if (!["scheduled", "live"].includes(webinar.status)) {
      return res.status(409).json({ message: "This webinar is not accepting registrations." });
    }

    const { name, email } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }

    let registration = await WebinarRegistration.findOne({
      webinarId: webinar._id,
      email: normalizedEmail,
    }).select("+accessTokenHash +accessTokenExpiresAt");

    if (registration?.emailVerifiedAt) {
      return res.status(409).json({ message: "This email is already verified for the webinar." });
    }

    if (!registration) {
      const currentRegistrations = await WebinarRegistration.countDocuments({
        webinarId: webinar._id,
        status: { $in: ["registered", "attended"] },
      });
      const status =
        webinar.capacity && currentRegistrations >= webinar.capacity
          ? "waitlisted"
          : "registered";

      registration = new WebinarRegistration({
        webinarId: webinar._id,
        userId: req.user?._id || null,
        name,
        email: normalizedEmail,
        status,
        metadata: { source: "webinar-registration" },
      });
    } else {
      registration.name = name;
      if (registration.status === "cancelled") {
        const currentRegistrations = await WebinarRegistration.countDocuments({
          webinarId: webinar._id,
          status: { $in: ["registered", "attended"] },
        });
        registration.status =
          webinar.capacity && currentRegistrations >= webinar.capacity
            ? "waitlisted"
            : "registered";
      }
    }

    const accessToken = createWebinarAccessToken(webinar);
    registration.accessTokenHash = accessToken.tokenHash;
    registration.accessTokenExpiresAt = accessToken.expiresAt;
    await registration.save();

    const emailResult = await sendWebinarVerificationEmail({
      registration,
      webinar,
      verificationUrl: getVerificationUrl(webinar, accessToken.token),
    });

    if (!emailResult.success) {
      return res.status(503).json({
        success: false,
        message: "Registration was saved, but the verification email could not be sent. Please try again.",
      });
    }

    await appendAuditLog(
      webinar._id,
      "webinar_registered",
      { registrationId: registration._id },
      req.user?._id || null,
    );

    res.status(201).json({
      success: true,
      registration: {
        _id: registration._id,
        name: registration.name,
        email: registration.email,
        status: registration.status,
      },
      message:
        registration.status === "waitlisted"
          ? "You are on the waitlist. Verify your email to confirm your place."
          : "Check your inbox and verify your email to receive the webinar access link.",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to register for webinar", error: error.message });
  }
};

exports.verifyWebinarRegistration = async (req, res) => {
  try {
    const { token } = req.body || {};
    if (typeof token !== "string" || !token) {
      return res.status(400).json({ message: "A verification token is required." });
    }

    const webinar = await Webinar.findOne({
      ...getIdentifierQuery(req.params.identifier),
      status: { $in: PUBLIC_WEBINAR_STATUSES },
      accessType: { $ne: "private" },
    });
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found." });
    }

    const tokenHash = createHash("sha256").update(token).digest("hex");
    const registration = await WebinarRegistration.findOne({
      webinarId: webinar._id,
      accessTokenHash: tokenHash,
      accessTokenExpiresAt: { $gt: new Date() },
      status: { $in: ["registered", "attended", "waitlisted"] },
    });
    if (!registration) {
      return res.status(400).json({ message: "This verification link is invalid or expired." });
    }

    if (!registration.emailVerifiedAt) {
      registration.emailVerifiedAt = new Date();
      await registration.save();
    }

    const canJoin = ["registered", "attended"].includes(registration.status);
    const joinUrl =
      canJoin && ["scheduled", "live"].includes(webinar.status)
        ? webinar.videoProvider?.joinUrl || ""
        : "";

    res.status(200).json({
      success: true,
      verified: true,
      status: registration.status,
      joinUrl,
      message: !canJoin
        ? "Your email is verified, but your registration is waitlisted."
        : joinUrl
          ? "Your email is verified. You can join the webinar."
          : "Your email is verified. Webinar access is not available at this time.",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to verify webinar registration", error: error.message });
  }
};

exports.getWebinarRegistrations = async (req, res) => {
  try {
    const webinar = await Webinar.findOne(getIdentifierQuery(req.params.identifier || req.params.id));
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    const registrations = await WebinarRegistration.find({ webinarId: webinar._id }).sort({ createdAt: -1 });
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch registrations", error: error.message });
  }
};

exports.getWebinarAnalytics = async (req, res) => {
  try {
    const webinar = await Webinar.findOne(getIdentifierQuery(req.params.identifier || req.params.id));
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    const [registrations, attendance, questions, polls] = await Promise.all([
      WebinarRegistration.countDocuments({ webinarId: webinar._id }),
      WebinarAttendance.countDocuments({ webinarId: webinar._id }),
      WebinarQuestion.countDocuments({ webinarId: webinar._id }),
      WebinarPoll.countDocuments({ webinarId: webinar._id }),
    ]);

    res.status(200).json({
      webinarId: webinar._id,
      registrations,
      attendance,
      questions,
      polls,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch webinar analytics", error: error.message });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const webinar = await Webinar.findOne(getIdentifierQuery(req.params.identifier || req.params.id));
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    const { question, authorName } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const created = await WebinarQuestion.create({
      webinarId: webinar._id,
      authorId: req.user?._id || null,
      authorName: authorName || "Guest",
      question,
    });

    await appendAuditLog(webinar._id, "question_submitted", { questionId: created._id }, req.user?._id || null);

    res.status(201).json({ success: true, question: created });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit question", error: error.message });
  }
};

exports.createPoll = async (req, res) => {
  try {
    const webinar = await Webinar.findOne(getIdentifierQuery(req.params.identifier || req.params.id));
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    const { question, options } = req.body;
    if (!question || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ message: "A poll question and at least two options are required" });
    }

    const poll = await WebinarPoll.create({
      webinarId: webinar._id,
      createdBy: req.user?._id || null,
      question,
      options: options.map((option) => String(option).trim()).filter(Boolean),
    });

    await appendAuditLog(webinar._id, "poll_created", { pollId: poll._id }, req.user?._id || null);

    res.status(201).json({ success: true, poll });
  } catch (error) {
    res.status(500).json({ message: "Failed to create poll", error: error.message });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const webinar = await Webinar.findOne(getIdentifierQuery(req.params.identifier || req.params.id));
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    const { userName, message, type = "chat" } = req.body;
    if (!userName || !message) {
      return res.status(400).json({ message: "User name and message are required" });
    }

    const chatMessage = await WebinarMessage.create({
      webinarId: webinar._id,
      userId: req.user?._id || null,
      userName,
      message,
      type,
    });

    res.status(201).json({ success: true, message: chatMessage });
  } catch (error) {
    res.status(500).json({ message: "Failed to send chat message", error: error.message });
  }
};

exports.getWebinarMessages = async (req, res) => {
  try {
    const webinar = await Webinar.findOne(getIdentifierQuery(req.params.identifier || req.params.id));
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    const messages = await WebinarMessage.find({ webinarId: webinar._id }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chat messages", error: error.message });
  }
};

exports.getWebinarQuestions = async (req, res) => {
  try {
    const webinar = await Webinar.findOne(getIdentifierQuery(req.params.identifier || req.params.id));
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    const questions = await WebinarQuestion.find({ webinarId: webinar._id }).sort({ createdAt: -1 });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch questions", error: error.message });
  }
};

exports.getWebinarPolls = async (req, res) => {
  try {
    const webinar = await Webinar.findOne(getIdentifierQuery(req.params.identifier || req.params.id));
    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    const polls = await WebinarPoll.find({ webinarId: webinar._id }).sort({ createdAt: -1 });
    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch polls", error: error.message });
  }
};
