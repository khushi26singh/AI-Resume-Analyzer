const express = require('express');
const router = express.Router();
const { getAllResumes, getResume, deleteResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getAllResumes);
router.get('/:id', getResume);
router.delete('/:id', deleteResume);

module.exports = router;
