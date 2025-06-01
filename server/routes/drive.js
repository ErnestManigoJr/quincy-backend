const express = require('express');
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const router = express.Router();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({ version: 'v3', auth: oAuth2Client });

router.post('/', async (req, res) => {
  try {
    const { fileName, mimeType } = req.body;
    const outputsDir = path.join(__dirname, '../../outputs');
    const filePath = path.join(outputsDir, fileName);

    // ✅ Ensure the outputs/ directory exists
    if (!fs.existsSync(outputsDir)) {
      fs.mkdirSync(outputsDir, { recursive: true });
      console.log('Created outputs/ directory');
    }

    // ✅ Validate file existence before upload
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        error: `File not found: ${fileName} in outputs/`,
      });
    }

    const fileMetadata = {
      name: fileName,
      parents: process.env.GOOGLE_DRIVE_FOLDER_ID
        ? [process.env.GOOGLE_DRIVE_FOLDER_ID]
        : undefined,
    };

    const media = {
      mimeType,
      body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: 'id, webViewLink',
    });

    res.status(200).json({
      success: true,
      fileId: response.data.id,
      link: response.data.webViewLink,
    });
  } catch (err) {
    console.error('Google Drive upload error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;



