const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, "../public/images/");
    console.log("Destination Path:", destinationPath); // Log destination path
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log("Original Filename:", file.originalname); // Log original filename
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  console.log("Uploaded File Mimetype:", file.mimetype); // Log uploaded file mimetype
  
  if (file.mimetype.startsWith("image")) {
    console.log("File accepted:", file.originalname); // Log if file is accepted
    cb(null, true);
  } else {
    console.log("Unsupported file format:", file.originalname); // Log if file is unsupported
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

const resizeAndMove = async (files, destinationFolder) => {
  return Promise.all(
    files.map(async (file) => {
      try {
        const imagePath = file.path;
        console.log("Resizing image:", file.originalname); // Log resizing process
        const resizedImagePath = path.join(
          __dirname,
          `../public/images/${destinationFolder}/${file.filename}`
        );

        await sharp(imagePath)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(resizedImagePath);

        console.log("Resized image saved to:", resizedImagePath); // Log resized image path

        // Delete the original image after resizing
        fs.unlinkSync(imagePath);
        console.log("Original image deleted:", imagePath); // Log original image deletion
      } catch (error) {
        console.error('Error processing/resizing file:', error);
        // Handle the error (e.g., log, send an error response)
      }
    })
  );
};

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();

  console.log("Product images:", req.files.map(file => file.originalname)); // Log uploaded product images
  await resizeAndMove(req.files, 'products');
  next();
};

const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();

  console.log("Blog images:", req.files.map(file => file.originalname)); // Log uploaded blog images
  await resizeAndMove(req.files, 'blogs');
  next();
};

module.exports = { uploadPhoto, productImgResize };
