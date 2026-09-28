const express = require("express");

const {
    register,
    login,
    getMe,
    logout
} = require("../controllers/authController");

const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();


// =========================================================
// AUTH ROUTES
// =========================================================

// Register
router.post(
    "/register",
    register
);

// Login
router.post(
    "/login",
    login
);

// Current logged-in user
router.get(
    "/me",
    protect,
    getMe
);

// Logout
router.post(
    "/logout",
    protect,
    logout
);


module.exports = router;