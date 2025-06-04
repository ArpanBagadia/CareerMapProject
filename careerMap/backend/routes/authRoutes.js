const express = require("express");
const { googleLogin, setRole, signup, login } = require("../controllers/authController");
const router = express.Router();

router.post("/google-login", googleLogin);
router.post("/set-role", setRole);
router.post("/signup", signup);
router.post("/login", login);


module.exports = router;
