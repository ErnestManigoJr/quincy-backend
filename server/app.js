const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Load .env variables
dotenv.config();

const app = express();
app.use(express.json());

// ROUTES
const uploadAudioRoute = require('./routes/upload');       // NEW: user audio uploads via Multer
const lyricsRoute = require('./routes/lyrics');
const renderRoute = require('./routes/render');
const driveRoute = require('./routes/drive');              // Google Drive uploader
const testRoute = require('./routes/test');                // test file generator

// REGISTER ROUTES
app.use('/api/upload', uploadAudioRoute);                  // POST /api/upload (multipart form: audio file)
app.use('/api/lyrics', lyricsRoute);
app.use('/api/render', renderRoute);
app.use('/api/save-to-drive', driveRoute);
app.use('/api', testRoute);

// STATIC FILE SERVE (OPTIONAL)
app.use('/outputs', express.static(path.join(__dirname, '../outputs'))); // Allows streaming access

// HEALTH CHECK
app.get('/', (req, res) => {
  res.send('Quincy Backend Running');
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Quincy Backend running on port ${PORT}`);
});



