const Testimonial = require("../models/Testimonial");
const cloudinary = require("../config/cloudinary");

/* ===============================
UTILITY UPLOAD FUNCTION
=============================== */

const uploadBufferToCloudinary = (
  fileBuffer,
  folder,
  resource_type = "image",
) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) return resolve("");

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type,
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      },
    );

    stream.end(fileBuffer);
  });
};

/* ===============================
CREATE TESTIMONIAL
=============================== */

exports.createTestimonial = async (req, res, next) => {
  try {
    const { name, message, role } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        message: "Name and message are required",
      });
    }

    let imageUrl = "";
    let videoUrl = "";
    let thumbnailUrl = "";
    let type = "image";

    /* ===============================
    IMAGE UPLOAD
    =============================== */

    if (req.files?.image) {
      imageUrl = await uploadBufferToCloudinary(
        req.files.image[0].buffer,
        "teme_testimonials/images",
        "image",
      );

      type = "image";
    }

    /* ===============================
    VIDEO UPLOAD
    =============================== */

    if (req.files?.video) {
      videoUrl = await uploadBufferToCloudinary(
        req.files.video[0].buffer,
        "teme_testimonials/videos",
        "video",
      );

      type = "video";
    }

    /* ===============================
    THUMBNAIL UPLOAD
    =============================== */

    if (req.files?.thumbnail) {
      thumbnailUrl = await uploadBufferToCloudinary(
        req.files.thumbnail[0].buffer,
        "teme_testimonials/thumbnails",
        "image",
      );
    }

    /* ===============================
    CREATE DATABASE RECORD
    =============================== */

    const testimonial = await Testimonial.create({
      name,
      role,
      message,
      image: imageUrl,
      video: videoUrl,
      thumbnail: thumbnailUrl,
      type,
    });

    res.status(201).json({
      success: true,
      testimonial,
      message: "Testimonial created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* ===============================
GET TESTIMONIALS
=============================== */

exports.getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    res.status(200).json(testimonials);
  } catch (error) {
    next(error);
  }
};
/* ===============================
DELETE TESTIMONIAL
=============================== */

exports.deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        message: "Testimonial not found",
      });
    }

    await testimonial.deleteOne();

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
