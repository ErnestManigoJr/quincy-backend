const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No lyrics provided.' });
  }

  const rewritten = text
    .split('\n')
    .map(line => `🎵 ${line.trim()}... (remixed)`)
    .join('\n');

  res.status(200).json({ rewritten });
});

module.exports = router;
