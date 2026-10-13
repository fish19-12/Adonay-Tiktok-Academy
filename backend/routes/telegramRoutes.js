const express = require("express");
const {
  getPrograms,
  verifyIdentity,
} = require("../controllers/telegramController");
const {
  getChatDiagnostics,
  sendTelegramBroadcast,
} = require("../controllers/telegramAdminController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/programs", getPrograms);
router.post("/identity", verifyIdentity);
router.get("/admin/chat-diagnostics", protect, getChatDiagnostics);
router.post("/admin/broadcast", protect, sendTelegramBroadcast);

module.exports = router;
