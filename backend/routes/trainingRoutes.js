const express = require("express");
const router = express.Router();
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
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createTraining,
);

router.get("/", getTrainings);

router.get("/:id", getSingleTraining);

router.delete("/:id", deleteTraining);

module.exports = router;
