// server/app.js
const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

// Load environment variables from .env
dotenv.config();

// Create express app
const app = express();
app.use(express.json());

// Set up Multer to store uploads in the outputs directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../outputs'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Routes
const uploadRoute = require('./routes/upload');
const lyricsRoute = require('./routes/lyrics');
const renderRoute = require('./routes/render');
const driveRoute = require('./routes/drive');
const testRoute = require('./routes/test');

// Dynamic upload route
app.post('/api/upload', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }
  res.status(200).json({ success: true, fileName: req.file.filename });
});

// Mount under /api
app.use('/api/upload', uploadRoute);
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
