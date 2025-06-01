// server/app.js

const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env
dotenv.config();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const outputPath = path.join(__dirname, '../outputs');
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath);
    }
    cb(null, outputPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Import all route files
const uploadRoute = require('./routes/upload');
const lyricsRoute = require('./routes/lyrics');
const renderRoute = require('./routes/render');
const driveRoute = require('./routes/drive');
const testRoute = require('./routes/test');

const app = express();
app.use(express.json());

// Mount under /api so all routes respond to /api/<route>
app.use('/api/upload', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded.' });
  }
  res.status(200).json({ success: true, message: 'File uploaded.', file: req.file.filename });
});
app.use('/api/lyrics', lyricsRoute);
app.use('/api/render', renderRoute);
app.use('/api/save-to-drive', driveRoute);
app.use('/api', testRoute);

// Health check
app.get('/', (req, res) => {
  res.send('Quincy Backend Running');
});

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Quincy Backend running on port ${PORT}`));
