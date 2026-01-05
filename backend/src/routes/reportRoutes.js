const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createReport, getReports } = require('../controllers/reportController');

router.route('/')
    .get(protect, getReports)
    .post(protect, createReport);

module.exports = router;
