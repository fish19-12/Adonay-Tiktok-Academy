const multer = require("multer");
const createCloudinaryStorage = require("../utils/cloudinaryStorageEngine");

const storage = createCloudinaryStorage({
  folder: "teme-student-documents",
  allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"],
  resource_type: "auto",
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
