const express = require("express");
const { googleLogin, setRole, signup, login } = require("../controllers/authController");
const { courseUpload, getTutorCourses, updateCourse, deleteCourse, getAllCourses, getCourseById, updateCourseStatus, getCoursesByTutor } = require('../controllers/courseControllers')
const { enroll, studentEnrollments, tutorEmrollments, getQualifiedStudents } = require('../controllers/enrollment')
const { createCheckoutSession, enrollAfterPayment } = require('../controllers/paymentController')
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
router.get("/by-tutor/:tutorId",getCoursesByTutor)

//payment

router.post('/create-checkout-session', createCheckoutSession);
router.post('/enroll-after-payment', enrollAfterPayment);

//compnay

router.get('/qualified-students', getQualifiedStudents);

module.exports = router;
