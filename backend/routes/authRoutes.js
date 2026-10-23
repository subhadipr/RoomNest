
const express = require("express");

const {
    register,
    login,
    googleLogin,
    getMe,
    logout
} = require("../controllers/authController");

const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();

// Normal registration
router.post("/register", register);

// Normal login
router.post("/login", login);

// Google Sign-In
router.post("/google", googleLogin);

// Current logged-in user
router.get("/me", protect, getMe);

// Logout
router.post("/logout", protect, logout);

module.exports = router;
