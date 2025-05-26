// quincy-backend/server/routes/drive.js

const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load credentials from .env
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const drive = google.drive({ version: 'v3', auth: oAuth2Client });

router.post('/', async (req, res) => {
  try {
    const { fileName, mimeType } = req.body;
    const filePath = path.join(__dirname, '../../outputs', fileName);

    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType,
      },
      media: {
        mimeType,
        body: fs.createReadStream(filePath),
      },
    });

    res.status(200).json({ success: true, fileId: response.data.id });
  } catch (error) {
    console.error('Drive upload error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

