// quincy-backend/server/routes/index.js

const express = require('express');
const multer = require('multer');
const router = express.Router();

// Controllers (rename these if needed to match your file names)
const uploadRoutes = require('./upload');
const lyricsRoutes = require('./lyrics');
const renderRoutes = require('./render');

// File upload config
const upload = multer({ dest: 'uploads/' });

// Mount sub-route files (modular)
router.use('/upload', uploadRoutes);
router.use('/lyrics', lyricsRoutes);
router.use('/render', renderRoutes);

// Example future routes (for when you add these later)
try {
  router.use('/save-to-drive', require('./drive'));
  router.use('/bandlab-export', require('./bandlab'));
  router.use('/render-vocals', require('./vocals'));
} catch (err) {
  console.warn("Optional routes (drive, bandlab, vocals) not yet implemented.");
}

module.exports = router;

