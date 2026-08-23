const Student = require("../models/Student");
const cloudinary = require("../config/cloudinary");

/* =========================
   CREATE REGISTRATION
========================= */
exports.createRegistration = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      age,
      gender,
      course,
      address,
      education,
      emergencyName,
      emergencyPhone,
    } = req.body;

    if (!name || !email || !phone || !age || !course) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    if (Number(age) < 18) {
      return res.status(400).json({
        message: "Student must be 18 years or older.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "ID document is required.",
      });
    }

    const student = await Student.create({
      name,
      email,
      phone,
      age,
      gender,
      course,
      address,
      education,
      emergencyName,
      emergencyPhone,
      idDocument: req.file.path, // URL
      idDocument: req.file.secure_url, // Cloudinary public_id
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Registration submitted successfully.",
      student,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   GET ALL STUDENTS
========================= */
exports.getStudents = async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

/* =========================
   ✅ GET SINGLE STUDENT
========================= */
exports.getSingleStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found.",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

/* =========================
   UPDATE STATUS
========================= */
exports.updateStudentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["approved", "pending", "rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value.",
      });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully.",
      student,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found.",
      });
    }

    // Delete document from Cloudinary
    if (student.idDocumentPublicId) {
      await cloudinary.uploader.destroy(student.idDocumentPublicId);
    }

    await student.deleteOne();

    res.status(200).json({
      success: true,
      message: "Student deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error while deleting student",
    });
  }
};
