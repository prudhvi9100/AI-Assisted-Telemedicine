const express = require('express');
const { analyzeSymptoms } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/analyze', protect, analyzeSymptoms);

module.exports = router;
