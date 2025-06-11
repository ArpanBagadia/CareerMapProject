const express = require("express");
const { googleLogin, setRole, signup, login } = require("../controllers/authController");
const { courseUpload, getTutorCourses, updateCourse, deleteCourse, getAllCourses } = require('../controllers/courseControllers')
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
router.put("/update-course", uploadSize, updateCourse)
router.delete('/delete/:id/:tutorId', deleteCourse);
router.get('/all-courses', getAllCourses);

module.exports = router;
