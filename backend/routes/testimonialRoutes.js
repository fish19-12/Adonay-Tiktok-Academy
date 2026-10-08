const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/testimonialUpload");

const {
  createTestimonial,
  getTestimonials,
  deleteTestimonial,
} = require("../controllers/testimonialController");

/* ===============================
ROUTES
=============================== */

router.post(
  "/",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createTestimonial,
);

router.get("/", getTestimonials);

/* ✅ DELETE ROUTE */
router.delete("/:id", protect, deleteTestimonial);

module.exports = router;
