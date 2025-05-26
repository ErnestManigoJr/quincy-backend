const express = require('express');
const dotenv = require('dotenv');
const uploadRoute = require('./routes/upload');
const lyricsRoute = require('./routes/lyrics');
const renderRoute = require('./routes/render');
const driveRoute = require('./routes/drive'); // ✅ NEW: Google Drive upload route

dotenv.config();

const app = express();
app.use(express.json());

// Mount routes (always after middleware, always before .listen)
app.use('/upload', uploadRoute);
app.use('/lyrics', lyricsRoute);
app.use('/render', renderRoute);
app.use('/save-to-drive', driveRoute); // ✅ NEW: Mounts /save-to-drive

// Health check
app.get('/', (req, res) => {
  res.send('Quincy Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


