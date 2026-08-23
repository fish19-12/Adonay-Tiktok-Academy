const express = require("express");
const router = express.Router();

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
router.get("/", getBookings);
router.get("/:id", getBookingById);
router.put("/:id", updatePaymentStatus);
router.delete("/:id", deleteBooking);

module.exports = router;
