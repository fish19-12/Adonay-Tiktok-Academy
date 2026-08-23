const Booking = require("../models/Booking");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

/* ================= CREATE BOOKING ================= */
exports.createBooking = async (req, res) => {
  try {
    const { name, phone, date, service } = req.body;

    if (!name || !phone || !date) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // parse service safely
    let parsedService = service;
    if (typeof service === "string") {
      parsedService = JSON.parse(service);
    }

    let paymentScreenshot = null;

    /* ================= CLOUDINARY UPLOAD ================= */
    if (req.file) {
      const uploadToCloudinary = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "napi-bookings",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await uploadToCloudinary();

      paymentScreenshot = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    /* ================= SAVE BOOKING ================= */
    const booking = await Booking.create({
      name,
      phone,
      date,
      service: parsedService,
      paymentScreenshot,
      paymentStatus: paymentScreenshot ? "pending" : "pending",
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("CREATE BOOKING ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ================= GET ALL BOOKINGS (ADMIN) ================= */
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= GET SINGLE BOOKING ================= */
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= UPDATE PAYMENT STATUS ================= */
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.paymentStatus = status;
    await booking.save();

    res.json({
      success: true,
      message: "Payment status updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= DELETE BOOKING ================= */
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await booking.deleteOne();

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
