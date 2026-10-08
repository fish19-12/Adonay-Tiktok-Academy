const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/trainingUpload");

const {
  createTraining,
  getTrainings,
  getSingleTraining,
  deleteTraining,
} = require("../controllers/trainingController");

/* ===============================
ROUTES
=============================== */

router.post(
  "/",
  protect,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createTraining,
);

router.get("/", getTrainings);

router.get("/:id", getSingleTraining);

router.delete("/:id", protect, deleteTraining);

module.exports = router;
