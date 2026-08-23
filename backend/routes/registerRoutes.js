const express = require("express");
const router = express.Router();
const upload = require("../middleware/studentUpload");

const {
  createRegistration,
  getStudents,
  getSingleStudent, // ✅ NEW
  updateStudentStatus,
  deleteStudent,
} = require("../controllers/registerController");

/* =========================
   ROUTES
========================= */

// Create registration
router.post("/", upload.single("idDocument"), createRegistration);

// Get all students
router.get("/", getStudents);

// ✅ Get single student
router.get("/:id", getSingleStudent);

// Update student status
router.patch("/:id/status", updateStudentStatus);

// Delete student
router.delete("/:id", deleteStudent);

module.exports = router;
