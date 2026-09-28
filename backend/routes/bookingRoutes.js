const express = require("express");

const {
    createBooking,
    getStudentBookings,
    getOwnerBookings,
    getBooking,
    confirmBooking,
    cancelBooking,
    updateBookingStatus,
    deleteBooking
} = require("../controllers/bookingController");

const {
    protect
} = require("../middleware/authMiddleware");

const ownerMiddleware =
    require("../middleware/ownerMiddleware");

const router = express.Router();


// =========================================================
// STUDENT BOOKING ROUTES
// =========================================================

// Create booking
router.post(
    "/",
    protect,
    createBooking
);

// Get student's bookings
router.get(
    "/student/my-bookings",
    protect,
    getStudentBookings
);


// =========================================================
// OWNER BOOKING ROUTES
// =========================================================

// Get owner's bookings
router.get(
    "/owner/my-bookings",
    protect,
    ownerMiddleware,
    getOwnerBookings
);

// Confirm booking
router.patch(
    "/:id/confirm",
    protect,
    ownerMiddleware,
    confirmBooking
);

// Update booking status
router.patch(
    "/:id/status",
    protect,
    ownerMiddleware,
    updateBookingStatus
);


// =========================================================
// COMMON BOOKING ROUTES
// =========================================================

// Get single booking
router.get(
    "/:id",
    protect,
    getBooking
);

// Cancel booking
router.patch(
    "/:id/cancel",
    protect,
    cancelBooking
);

// Delete booking
router.delete(
    "/:id",
    protect,
    deleteBooking
);


module.exports = router;