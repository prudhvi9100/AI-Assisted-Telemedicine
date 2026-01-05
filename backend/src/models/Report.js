const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    type: {
        type: String,
        enum: ['report', 'prescription'],
        default: 'report'
    },
    description: {
        type: String,
        required: [true, 'Please add a description or content']
    },
    patient: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false // Optional, because a patient might upload their own old records
    },
    status: {
        type: String,
        default: 'confirmed'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Report', reportSchema);
