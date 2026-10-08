const multer = require("multer");
const createCloudinaryStorage = require("./cloudinaryStorageEngine");

const upload = multer({
  storage: createCloudinaryStorage({
    folder: "teme-upholstery-gallery",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    resource_type: "image",
  }),
});

module.exports = upload;
