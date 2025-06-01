const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// This creates a real test_output.mp3 file in /outputs
router.get('/create-test-file', (req, res) => {
  const outputDir = path.join(__dirname, '../../outputs');
  const filePath = path.join(outputDir, 'test_output.mp3');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFileSync(filePath, 'REAL Quincy test file');

  res.status(200).json({
    success: true,
    message: 'test_output.mp3 created in /outputs/',
    filePath
  });
});

module.exports = router;

