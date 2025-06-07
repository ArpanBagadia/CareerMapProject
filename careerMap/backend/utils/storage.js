const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const isVideo = file.fieldname === "video";
    return {
      folder: isVideo ? "videos" : "images",
      resource_type: isVideo ? "video" : "image",
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage }); // ✅ Wrap storage with Multer

module.exports = upload; // ✅ Now it's the Multer instance, not just storage
