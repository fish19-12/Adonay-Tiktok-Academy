const BusinessInquiry = require("../models/BusinessInquiry");

const allowedBusinessTypes = new Set([
  "Real Estate Agent",
  "Personal Trainer",
  "Beauty Professional",
  "Sales Consultant",
  "Event Planner",
  "Other Service Business",
]);

const createBusinessInquiry = async (req, res) => {
  const name = String(req.body.name || "").trim();
  const phone = String(req.body.phone || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const businessType = String(req.body.businessType || "").trim();
  const tiktokUsername = String(req.body.tiktokUsername || "")
    .trim()
    .replace(/^@/, "");
  const tiktokProfileLink = String(req.body.tiktokProfileLink || "").trim();
  const goals = String(req.body.goals || "").trim();

  if (!name || name.length > 120) {
    return res.status(400).json({
      success: false,
      message: "Please provide your full name (up to 120 characters).",
    });
  }

  if (phone.length < 7 || phone.length > 32) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid phone number.",
    });
  }

  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  if (!allowedBusinessTypes.has(businessType)) {
    return res.status(400).json({
      success: false,
      message: "Please select a valid business type.",
    });
  }

  if (tiktokUsername.length > 24 || (tiktokUsername && !/^[\w.]+$/.test(tiktokUsername))) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid TikTok username.",
    });
  }

  if (tiktokProfileLink) {
    let profileUrl;
    try {
      profileUrl = new URL(tiktokProfileLink);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid TikTok profile link.",
      });
    }

    const isTikTokHost =
      profileUrl.hostname === "tiktok.com" ||
      profileUrl.hostname.endsWith(".tiktok.com");
    if (
      !["http:", "https:"].includes(profileUrl.protocol) ||
      !isTikTokHost ||
      !profileUrl.pathname.startsWith("/@")
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid TikTok profile link.",
      });
    }
  }

  if (goals.length > 1000) {
    return res.status(400).json({
      success: false,
      message: "Your goals must be 1,000 characters or fewer.",
    });
  }

  try {
    await BusinessInquiry.create({
      name,
      phone,
      email,
      businessType,
      tiktokUsername,
      tiktokProfileLink,
      goals,
    });

    return res.status(201).json({
      success: true,
      message: "Application received. Our team will contact you about next steps.",
    });
  } catch (error) {
    console.error("CREATE BUSINESS INQUIRY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "We could not save your application. Please try again.",
    });
  }
};

module.exports = { createBusinessInquiry };
