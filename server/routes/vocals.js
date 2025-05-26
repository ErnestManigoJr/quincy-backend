// quincy-backend/server/routes/vocals.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// POST /render-vocals
router.post('/', async (req, res) => {
  try {
    const { text, voiceId, outputFileName } = req.body;

    const response = await axios({
      method: 'POST',
      url: 'https://api.elevenlabs.io/v1/text-to-speech/' + voiceId,
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      data: {
        text,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      },
      responseType: 'stream',
    });

    const filePath = path.join(__dirname, '../../outputs', outputFileName);
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    writer.on('finish', () => res.status(200).json({ success: true, file: outputFileName }));
    writer.on('error', (error) => {
      console.error('File stream error:', error);
      res.status(500).json({ success: false, error: error.message });
    });
  } catch (error) {
    console.error('ElevenLabs error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

