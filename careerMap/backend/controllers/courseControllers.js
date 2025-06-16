const Course = require('../models/Course')

exports.courseUpload = async (req, res) => {
    try {
        const { title, subtitle, category, description, level, price, tutorId } = req.body;
        const imageUrl = req.files['image']?.[0]?.path;
        const videoUrl = req.files['video']?.[0]?.path;
        const newCourse = new Course({
            title,
            subtitle,
            category,
            description,
            level,
            price,
            imageUrl,
            videoUrl,
            tutorId
        })
        await newCourse.save();
        res.status(201).json({
            success: true,
            course: newCourse
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            msg: "upload failed"
        })
    }
}

exports.getTutorCourses = async (req, res) => {
    const { tutorId } = req.query;
    try {
        if (!tutorId) {
            return res.status(400).json({
                success: false,
                msg: "Tutor ID is required"
            })
        }
        const courses = await Course.find({ tutorId })
        res.status(200).json({
            success: true,
            count: courses.length,
            courses
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            msg: "Failed to fetch courses"
        })
    }
}

exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const {
        title, subtitle, category, description,
        level, price, tutorId
    } = req.body;

    try {
        const existingCourse = await Course.findOne({ tutorId });
        console.log(id)
        console.log(existingCourse.tutorId)
        if (!existingCourse) {
            return res.status(404).json({ success: false, msg: "Course not found" });
        }

        if (existingCourse.tutorId.toString() !== tutorId.toString()) {
            return res.status(403).json({ success: false, msg: "Unauthorized access" });
        }

        existingCourse.title = title || existingCourse.title;
        existingCourse.subtitle = subtitle || existingCourse.subtitle;
        existingCourse.category = category || existingCourse.category;
        existingCourse.description = description || existingCourse.description;
        existingCourse.level = level || existingCourse.level;
        existingCourse.price = price || existingCourse.price;

        if (req.files['image']) {
            existingCourse.imageUrl = req.files['image'][0].path;
        }
        if (req.files['video']) {
            existingCourse.videoUrl = req.files['video'][0].path;
        }

        await existingCourse.save();

        res.status(200).json({ success: true, course: existingCourse });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Update failed" });
    }
};

exports.deleteCourse = async (req, res) => {
    const { id, tutorId } = req.params;

    try {
        const course = await Course.findOne({ _id: id });
        if (!course) {
            return res.status(404).json({ success: false, msg: "Course not found" });
        }

        // Add proper null checks
        if (!course.tutorId || !tutorId || course.tutorId.toString() !== tutorId.toString()) {
            return res.status(403).json({ success: false, msg: "Unauthorized access" });
        }

        await Course.deleteOne({ _id: id });

        return res.status(200).json({ success: true, msg: "Course deleted successfully" });

    } catch (err) {
        console.error("Delete error:", err);
        return res.status(500).json({ success: false, msg: "Failed to delete course" });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ status: true })
        res.status(200).json({ success: true, courses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Failed to fetch courses" });
    }
};

exports.getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id)
        if (!course) {
            return res.status(404).json({ success: false, msg: "Course not found" });
        }
        res.status(200).json({ success: true, course })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Failed to fetch course" })
    }
}

exports.updateCourseStatus = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, msg: "Course not found" });
        }
        if (req.body.status !== undefined) {
            course.status = req.body.status;
        }
        await course.save();
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Update failed" });
    }
}