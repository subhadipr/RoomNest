const express = require("express");

const {
    getDashboardStats,
    getAllUsers,
    getUserById,
    updateUserStatus,
    deleteUser,
    getAllOwners,
    getAllProperties,
    approveProperty,
    rejectProperty,
    deleteProperty,
    getAllBookings,
    getAllInquiries,
    getAllReviews,
    deleteReview
} = require("../controllers/adminController");

const {
    protect
} = require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");

const router = express.Router();


// =========================================================
// ADMIN AUTHORIZATION
// =========================================================

router.use(
    protect,
    adminMiddleware
);


// =========================================================
// ADMIN DASHBOARD
// =========================================================

router.get(
    "/dashboard",
    getDashboardStats
);


// =========================================================
// USER MANAGEMENT
// =========================================================

// Get all users
router.get(
    "/users",
    getAllUsers
);

// Get single user
router.get(
    "/users/:id",
    getUserById
);

// Update user status
router.patch(
    "/users/:id/status",
    updateUserStatus
);

// Delete user
router.delete(
    "/users/:id",
    deleteUser
);


// =========================================================
// OWNER MANAGEMENT
// =========================================================

router.get(
    "/owners",
    getAllOwners
);


// =========================================================
// PROPERTY MANAGEMENT
// =========================================================

// Get all properties
router.get(
    "/properties",
    getAllProperties
);

// Approve property
router.patch(
    "/properties/:id/approve",
    approveProperty
);

// Reject property
router.patch(
    "/properties/:id/reject",
    rejectProperty
);

// Delete property
router.delete(
    "/properties/:id",
    deleteProperty
);


// =========================================================
// BOOKING MANAGEMENT
// =========================================================

router.get(
    "/bookings",
    getAllBookings
);


// =========================================================
// INQUIRY MANAGEMENT
// =========================================================

router.get(
    "/inquiries",
    getAllInquiries
);


// =========================================================
// REVIEW MANAGEMENT
// =========================================================

router.get(
    "/reviews",
    getAllReviews
);

// Delete review
router.delete(
    "/reviews/:id",
    deleteReview
);


module.exports = router;