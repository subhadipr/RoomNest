const express = require("express");

const {
    getProfile,
    updateProfile,
    changePassword,
    deleteAccount
} = require("../controllers/userController");

const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();


// =========================================================
// USER PROFILE ROUTES
// =========================================================

// Get current user profile
router.get(
    "/profile",
    protect,
    getProfile
);

// Update current user profile
router.put(
    "/profile",
    protect,
    updateProfile
);

// Change password
router.put(
    "/change-password",
    protect,
    changePassword
);

// Delete account
router.delete(
    "/account",
    protect,
    deleteAccount
);


module.exports = router;