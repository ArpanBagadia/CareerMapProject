const express = require("express");
const { googleLogin, setRole, signup, login } = require("../controllers/authController");
const { courseUpload, getTutorCourses, updateCourse, deleteCourse, getAllCourses, getCourseById, updateCourseStatus } = require('../controllers/courseControllers')
const { enroll, studentEnrollments, tutorEmrollments } = require('../controllers/enrollment')
const upload = require('../utils/storage')
const router = express.Router();

router.post("/google-login", googleLogin);
router.post("/set-role", setRole);
router.post("/signup", signup);
router.post("/login", login);

const uploadSize = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 }
]);

router.post("/upload-course", uploadSize, courseUpload)
router.get("/courses", getTutorCourses)
router.put("/update-course/:id", uploadSize, updateCourse)
router.put("/update-course-status/:id", updateCourseStatus)
router.delete('/delete/:id/:tutorId', deleteCourse);
router.get('/all-courses', getAllCourses);
router.get("/get-course/:id", getCourseById);
router.post("/enroll", enroll);
router.get("/student-enrollments/:studentId", studentEnrollments)
router.get("/tutor-enrollments/:tutorId", tutorEmrollments)

module.exports = router;
