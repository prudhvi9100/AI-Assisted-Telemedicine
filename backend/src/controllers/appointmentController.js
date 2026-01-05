const Appointment = require('../models/Appointment');
const User = require('../models/User');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res, next) => {
    try {
        const { doctorId, date, timeSlot, type } = req.body;

        const appointment = await Appointment.create({
            patient: req.user.id,
            doctor: doctorId,
            date,
            timeSlot,
            type
        });

        res.status(201).json({
            success: true,
            data: appointment
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get my appointments
// @route   GET /api/appointments
// @access  Private
exports.getMyAppointments = async (req, res, next) => {
    try {
        let query;

        if (req.user.role === 'patient') {
            query = { patient: req.user.id };
        } else if (req.user.role === 'doctor') {
            query = { doctor: req.user.id };
        } else {
            // Admin sees all? Or just empty for now
            query = {};
        }

        const appointments = await Appointment.find(query)
            .populate('doctor', 'name specialization')
            .populate('patient', 'name')
            .sort({ date: 1 });

        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
// @desc    Update appointment status (Accept/Reject)
// @route   PUT /api/appointments/:id/status
// @access  Private (Doctor only)
exports.updateAppointmentStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        let appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        // Make sure user is the doctor OR patient of this appointment
        // Doctor can change to any status (confirmed, cancelled, completed)
        // Patient might only be allowed to change to 'cancelled' or 'completed' (when call ends)
        const isDoctor = appointment.doctor.toString() === req.user.id;
        const isPatient = appointment.patient.toString() === req.user.id;

        if (!isDoctor && !isPatient && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to update this appointment' });
        }

        appointment.status = status;
        await appointment.save();

        res.status(200).json({
            success: true,
            data: appointment
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
