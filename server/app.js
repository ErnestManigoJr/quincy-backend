// server/app.js

const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

// Import all route files
const uploadRoute = require('./routes/upload');
const lyricsRoute = require('./routes/lyrics');
const renderRoute = require('./routes/render');
const driveRoute = require('./routes/drive'); // Google Drive upload

const app = express();
app.use(express.json());

// Mount under /api so all routes respond to /api/<route>
app.use('/api/upload', uploadRoute);
app.use('/api/lyrics', lyricsRoute);
app.use('/api/render', renderRoute);
app.use('/api/save-to-drive', driveRoute);

// Health check
app.get('/', (req, res) => {
  res.send('Quincy Backend Running');
});

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Quincy Backend running on port ${PORT}`));



