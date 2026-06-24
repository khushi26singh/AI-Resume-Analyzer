const express = require('express');
const router = express.Router();
const { analyzeResume } = require('../controllers/analyzeController');
const upload = require('../middleware/uploadMiddleware');

// Route: POST /api/analyze
// 'resume' must match the key name in your form-data file upload
router.post('/', upload.single('resume'), analyzeResume);

module.exports = router;