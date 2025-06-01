// server/routes/upload.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Ensure the outputs directory exists
const outputDir = path.join(__dirname, '../../outputs');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, outputDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Upload endpoint
router.post('/', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  res.status(200).json({
    success: true,
    message: `${req.file.originalname} uploaded successfully`,
    filePath: path.join('outputs', req.file.originalname)
  });
});

module.exports = router;
