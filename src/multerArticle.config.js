import path from 'path';
import fs from 'fs';
import multer from "multer"


// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/article');
  },
  filename: function (req, file, cb) {
    const title = req.body.title;
    const filePath = path.join('./uploads/article', `${title}-${file.originalname}`);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    cb(null, `${title}-${file.originalname}`);
  },
});


const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

// Initialize multer with the storage engine and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit (optional)
});

module.exports = upload;
