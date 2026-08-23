const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");

/* =========================
   Upload Image
========================= */

exports.uploadImage = async (req, res) => {
  try {
    const { carModel } = req.body;

    const newImage = await Gallery.create({
      imageUrl: req.file.path,
      public_id: req.file.filename,
      carModel: carModel,
    });

    res.status(201).json(newImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};

/* =========================
   Get All Images
========================= */

exports.getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images" });
  }
};

/* =========================
   Get Images By Car Model
========================= */

exports.getImagesByModel = async (req, res) => {
  try {
    const { model } = req.params;

    const images = await Gallery.find({
      carModel: { $regex: new RegExp(`^${model}$`, "i") },
    });

    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch model images" });
  }
};

/* =========================
   Delete Image
========================= */

exports.deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    await cloudinary.uploader.destroy(image.public_id);

    await image.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
