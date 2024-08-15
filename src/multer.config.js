import { join, extname as _extname } from 'path';
import { existsSync, unlinkSync } from 'fs';
import multer from "multer"


// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const username = req.body.username;
    const filePath = join('./uploads/article', `${username}-${file.originalname}`);

    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
    //if user didnt upload a file and there is alredy a file with the same name dont cb 
    if (!file.originalname) {
      return cb(null, false);
    }


    cb(null, `${username}-${file.originalname}`);
  },
});

// File filter to limit the upload to specific file types (optional)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extname = allowedFileTypes.test(
    _extname(file.originalname).toLowerCase()
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

export default upload;
