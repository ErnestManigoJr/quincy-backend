const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { filename } = req.body;

  if (!filename) {
    return res.status(400).json({ error: 'Missing filename in request.' });
  }

  const outputPath = `/outputs/${Date.now()}-${filename.replace(/\\s+/g, '_')}.zip`;

  res.status(200).json({
    message: 'Song rendered successfully',
    output: outputPath
  });
});

module.exports = router;
