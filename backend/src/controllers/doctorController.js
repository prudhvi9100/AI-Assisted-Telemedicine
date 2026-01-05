const User = require('../models/User');
const Appointment = require('../models/Appointment');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Private
exports.getDoctors = async (req, res, next) => {
    try {
        const doctors = await User.find({ role: 'doctor' }).select('-password');

        // Add dummy stats for UI since we don't have a Reviews model yet
        const enrichedDoctors = doctors.map(doc => ({
            ...doc._doc,
            rating: 4.8,
            reviews: 0,
            specialty: doc.specialization || "General Physician"
        }));

        res.status(200).json({
            success: true,
            data: enrichedDoctors
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get doctor dashboard stats
// @route   GET /api/doctors/stats
// @access  Private (Doctor only)
exports.getDoctorStats = async (req, res, next) => {
    try {
        const appointmentCount = await Appointment.countDocuments({ doctor: req.user.id });

        // Count unique patients
        const appointments = await Appointment.find({ doctor: req.user.id });
        const uniquePatients = new Set(appointments.map(a => a.patient.toString()));
        const patientCount = uniquePatients.size;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorow = new Date(today);
        tomorow.setDate(tomorow.getDate() + 1);

        const todayAppointments = await Appointment.countDocuments({
            doctor: req.user.id,
            date: { $gte: today, $lt: tomorow }
        });

        res.status(200).json({
            success: true,
            data: {
                totalPatients: patientCount,
                totalAppointments: appointmentCount,
                todayAppointments: todayAppointments,
                rating: 4.9 // Dummy for now
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}
