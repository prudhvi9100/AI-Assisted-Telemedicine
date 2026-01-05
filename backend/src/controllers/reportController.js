const Report = require('../models/Report');

// @desc    Create new report/prescription
// @route   POST /api/reports
// @access  Private
exports.createReport = async (req, res, next) => {
    try {
        const { title, type, description, doctorId, patientId } = req.body;

        // If I am a doctor creating a prescription, 'patientId' comes from body, 'doctor' is ME.
        // If I am a patient uploading a record, 'patient' is ME.

        let reportData = {
            title,
            type,
            description,
            patient: req.user.role === 'patient' ? req.user.id : patientId,
            doctor: req.user.role === 'doctor' ? req.user.id : doctorId
        };

        // Remove undefined fields
        Object.keys(reportData).forEach(key => reportData[key] === undefined && delete reportData[key]);

        const report = await Report.create(reportData);

        res.status(201).json({
            success: true,
            data: report
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get reports
// @route   GET /api/reports
// @access  Private
exports.getReports = async (req, res, next) => {
    try {
        let query;

        if (req.user.role === 'patient') {
            query = { patient: req.user.id };
        } else if (req.user.role === 'doctor') {
            query = { doctor: req.user.id };

            // Allow filtering by specific patient
            if (req.query.patientId) {
                query.patient = req.query.patientId;
            }
        } else {
            query = {};
        }

        const reports = await Report.find(query)
            .populate('doctor', 'name specialization')
            .populate('patient', 'name')
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: reports.length,
            data: reports
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
