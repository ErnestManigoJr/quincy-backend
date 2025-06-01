
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Define storage location and filename structure
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const outputDir = path.join(__dirname, '../../outputs');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    cb(null, outputDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// POST /api/upload
router.post('/', upload.single('audio'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../outputs', req.file.filename);
    res.status(200).json({
      success: true,
      message: `Uploaded: ${req.file.originalname}`,
      filePath
    });
  } catch (err) {
    console.error('Upload Error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
