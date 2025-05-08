import multer from "multer";
import path from "path";

// Configure storage for uploading files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the folder where files should be uploaded
    cb(null, "uploads/"); // Make sure the 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    // Set the filename for the uploaded file
    cb(null, Date.now() + path.extname(file.originalname)); // Adds a timestamp to the filename
  },
});

export const multer4server = () => {
  function fileFilter(req, file, cb) {
    // Check if the file is an image
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 500 * 1024 * 1024, // Limit to 500 MB (adjust as needed)
    },
  });

  return upload;
};
