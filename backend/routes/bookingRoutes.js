const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createBooking,
  getBookings,
  getBookingById,
  updatePaymentStatus,
  deleteBooking,
} = require("../controllers/bookingController");

const upload = require("../middleware/upload");

/* ================= PUBLIC ================= */
// ✅ MUST use multer here
router.post("/", upload.single("paymentScreenshot"), createBooking);

/* ================= ADMIN ================= */
router.get("/", protect, getBookings);
router.get("/:id", protect, getBookingById);
router.put("/:id", protect, updatePaymentStatus);
router.delete("/:id", protect, deleteBooking);

module.exports = router;
