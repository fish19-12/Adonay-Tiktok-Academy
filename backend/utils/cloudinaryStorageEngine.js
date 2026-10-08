function createCloudinaryStorage(params, cloudinary = require("../config/cloudinary")) {
  return {
    _handleFile(req, file, callback) {
      let finished = false;
      const finish = (error, result) => {
        if (finished) return;
        finished = true;

        if (error) {
          callback(error);
          return;
        }

        callback(null, {
          path: result.secure_url,
          filename: result.public_id,
        });
      };

      const uploadStream = cloudinary.uploader.upload_stream(params, finish);
      file.stream.once("error", finish);
      file.stream.pipe(uploadStream);
    },

    _removeFile(req, file, callback) {
      if (!file.filename) {
        callback(null);
        return;
      }

      cloudinary.uploader
        .destroy(file.filename)
        .then(() => callback(null))
        .catch(callback);
    },
  };
}

module.exports = createCloudinaryStorage;
