const assert = require("node:assert/strict");
const { PassThrough } = require("node:stream");
const test = require("node:test");
const createCloudinaryStorage = require("./cloudinaryStorageEngine");

test("streams uploads to Cloudinary and returns the existing file fields", async () => {
  let uploadParams;
  const cloudinary = {
    uploader: {
      upload_stream(params, callback) {
        uploadParams = params;
        const uploadStream = new PassThrough();
        uploadStream.on("finish", () => {
          callback(null, {
            secure_url: "https://res.cloudinary.com/example/image/upload/photo.jpg",
            public_id: "teme-upholstery-gallery/photo",
          });
        });
        return uploadStream;
      },
    },
  };
  const storage = createCloudinaryStorage(
    { folder: "teme-upholstery-gallery", resource_type: "image" },
    cloudinary,
  );
  const fileStream = new PassThrough();

  const file = await new Promise((resolve, reject) => {
    storage._handleFile({}, { stream: fileStream }, (error, uploadedFile) => {
      if (error) reject(error);
      else resolve(uploadedFile);
    });
    fileStream.end(Buffer.from("image data"));
  });

  assert.deepEqual(uploadParams, {
    folder: "teme-upholstery-gallery",
    resource_type: "image",
  });
  assert.deepEqual(file, {
    path: "https://res.cloudinary.com/example/image/upload/photo.jpg",
    filename: "teme-upholstery-gallery/photo",
  });
});

test("removes Cloudinary uploads through the storage engine", async () => {
  let deletedPublicId;
  const cloudinary = {
    uploader: {
      destroy(publicId) {
        deletedPublicId = publicId;
        return Promise.resolve({ result: "ok" });
      },
    },
  };
  const storage = createCloudinaryStorage({}, cloudinary);

  await new Promise((resolve, reject) => {
    storage._removeFile(
      {},
      { filename: "teme-upholstery-gallery/photo" },
      (error) => {
        if (error) reject(error);
        else resolve();
      },
    );
  });

  assert.equal(deletedPublicId, "teme-upholstery-gallery/photo");
});
