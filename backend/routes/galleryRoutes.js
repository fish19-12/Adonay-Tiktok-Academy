const express = require("express");
const router = express.Router();
const upload = require("../utils/cloudinaryStorage");

const {
  uploadImage,
  getImages,
  getImagesByModel,
  deleteImage,
} = require("../controllers/galleryController");

const authMiddleware = require("../middleware/authMiddleware");

/* Upload (Protected) */
router.post("/", authMiddleware, upload.single("image"), uploadImage);

/* Get All Images */
router.get("/", getImages);

/* Get Images By Model */
router.get("/model/:model", getImagesByModel);

/* Delete (Protected) */
router.delete("/:id", authMiddleware, deleteImage);

module.exports = router;
