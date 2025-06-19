const Enrollment = require('../models/Enrollment')

exports.enroll = async (req, res) => {
    const { studentId, courseId, tutorId } = req.body;
    try {
        const alreadyEnrolled = await Enrollment.findOne({ studentId, courseId });
        if (alreadyEnrolled) {
            return res.status(400).json({ msg: 'Already enrolled' });
        }
        const newEnroll = new Enrollment({ studentId, courseId, tutorId });
        await newEnroll.save();

        res.status(201).json({ msg: 'Enrolled successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', err });
    }
}

exports.studentEnrollments = async (req, res) => {
    const { studentId } = req.params;
    try {
        const enrollments = await Enrollment.find({ studentId }).populate('courseId');
        res.json(enrollments);
    } catch (err) {
        console.error("Error fetching student enrollments:", err);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
}

exports.tutorEmrollments = async (req, res) => {
    const { tutorId } = req.params;
    const enrollments = await Enrollment.find({ tutorId }).populate('studentId courseId');
    res.json(enrollments);
}