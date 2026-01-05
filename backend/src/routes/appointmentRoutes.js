const express = require('express');
const { createAppointment, getMyAppointments, updateAppointmentStatus } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
    .post(createAppointment)
    .get(getMyAppointments);

router.route('/:id/status')
    .put(updateAppointmentStatus);

module.exports = router;
