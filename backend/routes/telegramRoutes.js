const express = require("express");
const {
  getPrograms,
  verifyIdentity,
} = require("../controllers/telegramController");

const router = express.Router();

router.get("/programs", getPrograms);
router.post("/identity", verifyIdentity);

module.exports = router;
