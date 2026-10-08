const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  getWebinars,
  getWebinar,
  createWebinar,
  updateWebinar,
  deleteWebinar,
  registerForWebinar,
  verifyWebinarRegistration,
  getWebinarRegistrations,
  getWebinarAnalytics,
  createQuestion,
  createPoll,
  createMessage,
  getWebinarMessages,
  getWebinarQuestions,
  getWebinarPolls,
} = require("../controllers/webinarController");

const router = express.Router();

router.get("/", getWebinars);
router.post("/", protect, createWebinar);
router.get("/:identifier", getWebinar);
router.put("/:identifier", protect, updateWebinar);
router.delete("/:identifier", protect, deleteWebinar);
router.post("/:identifier/register", registerForWebinar);
router.post("/:identifier/verify-registration", verifyWebinarRegistration);
router.get("/:identifier/registrations", protect, getWebinarRegistrations);
router.get("/:identifier/analytics", protect, getWebinarAnalytics);
router.post("/:identifier/questions", createQuestion);
router.get("/:identifier/questions", getWebinarQuestions);
router.post("/:identifier/polls", protect, createPoll);
router.get("/:identifier/polls", getWebinarPolls);
router.post("/:identifier/messages", createMessage);
router.get("/:identifier/messages", getWebinarMessages);

module.exports = router;
