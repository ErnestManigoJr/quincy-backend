const express = require('express');
const dotenv = require('dotenv');
const uploadRoute = require('./routes/upload');
const lyricsRoute = require('./routes/lyrics');

dotenv.config();

const app = express();
app.use(express.json());

// Mount routes (always after middleware, always before .listen)
app.use('/upload', uploadRoute);
app.use('/lyrics', lyricsRoute);

// Health check
app.get('/', (req, res) => {
  res.send('Quincy Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

