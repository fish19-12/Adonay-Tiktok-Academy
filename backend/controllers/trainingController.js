const Training = require("../models/Training");
const cloudinary = require("../config/cloudinary");

/* ===============================
UTILITY CLOUDINARY UPLOAD STREAM
=============================== */

const uploadBufferToCloudinary = (
  fileBuffer,
  folder,
  resource_type = "auto",
) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) return resolve("");

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type,
        transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
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
CREATE TRAINING COURSE
=============================== */

exports.createTraining = async (req, res, next) => {
  try {
    const { title, description, duration, level } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    let videoUrl = "";
    let thumbnailUrl = "";

    /* ===============================
    VIDEO UPLOAD
    =============================== */

    if (req.files?.video) {
      videoUrl = await uploadBufferToCloudinary(
        req.files.video[0].buffer,
        "teme_training/videos",
        "video",
      );
    }

    /* ===============================
    THUMBNAIL UPLOAD
    =============================== */

    if (req.files?.thumbnail) {
      thumbnailUrl = await uploadBufferToCloudinary(
        req.files.thumbnail[0].buffer,
        "teme_training/thumbnails",
        "image",
      );
    }

    const training = await Training.create({
      title,
      description,
      duration,
      level,
      video: videoUrl,
      thumbnail: thumbnailUrl,
    });

    res.status(201).json({
      success: true,
      training,
      message: "Training course created",
    });
  } catch (error) {
    next(error);
  }
};

/* ===============================
GET TRAININGS
=============================== */

exports.getTrainings = async (req, res, next) => {
  try {
    const trainings = await Training.find().sort({ createdAt: -1 });

    res.status(200).json(trainings);
  } catch (error) {
    next(error);
  }
};

/* ===============================
GET SINGLE TRAINING
=============================== */

exports.getSingleTraining = async (req, res, next) => {
  try {
    const training = await Training.findById(req.params.id);

    if (!training) {
      return res.status(404).json({
        message: "Training not found",
      });
    }

    res.status(200).json(training);
  } catch (error) {
    next(error);
  }
};

/* ===============================
DELETE TRAINING
=============================== */

exports.deleteTraining = async (req, res, next) => {
  try {
    const training = await Training.findById(req.params.id);

    if (!training) {
      return res.status(404).json({
        message: "Training not found",
      });
    }

    await training.deleteOne();

    res.status(200).json({
      success: true,
      message: "Training deleted",
    });
  } catch (error) {
    next(error);
  }
};
