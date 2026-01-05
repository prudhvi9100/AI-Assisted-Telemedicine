const express = require('express');
const { getDoctors, getDoctorStats } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/stats', getDoctorStats);
router.get('/', getDoctors);

module.exports = router;
