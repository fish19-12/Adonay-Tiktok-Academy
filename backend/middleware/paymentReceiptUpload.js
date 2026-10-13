const multer = require("multer");

const configuredSizeMb = Number(process.env.MAX_RECEIPT_SIZE_MB || 5);
const maxSizeMb =
  Number.isFinite(configuredSizeMb) && configuredSizeMb > 0
    ? Math.min(configuredSizeMb, 10)
    : 5;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxSizeMb * 1024 * 1024,
    files: 1,
  },
  fileFilter(_req, file, callback) {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
      callback(new Error("Upload a JPG, PNG, or WEBP payment screenshot."));
      return;
    }
    callback(null, true);
  },
}).single("paymentScreenshot");

module.exports = (req, res, next) => {
  upload(req, res, (error) => {
    if (!error) return next();

    const tooLarge = error.code === "LIMIT_FILE_SIZE";
    return res.status(400).json({
      success: false,
      message: tooLarge
        ? `Payment screenshot must be ${maxSizeMb} MB or smaller.`
        : error.message || "Payment screenshot could not be uploaded.",
    });
  });
};
