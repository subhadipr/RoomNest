const express = require("express");

const {
    createInquiry,
    getStudentInquiries,
    getOwnerInquiries,
    getInquiry,
    replyToInquiry,
    updateInquiryStatus,
    cancelInquiry,
    deleteInquiry
} = require("../controllers/inquiryController");

const {
    protect
} = require("../middleware/authMiddleware");

const ownerMiddleware =
    require("../middleware/ownerMiddleware");

const router = express.Router();


// =========================================================
// STUDENT INQUIRY ROUTES
// =========================================================

// Create inquiry
router.post(
    "/",
    protect,
    createInquiry
);

// Get student's inquiries
router.get(
    "/student/my-inquiries",
    protect,
    getStudentInquiries
);

// Cancel inquiry
router.patch(
    "/:id/cancel",
    protect,
    cancelInquiry
);


// =========================================================
// OWNER INQUIRY ROUTES
// =========================================================

// Get owner's inquiries
router.get(
    "/owner/my-inquiries",
    protect,
    ownerMiddleware,
    getOwnerInquiries
);

// Reply to inquiry
router.patch(
    "/:id/reply",
    protect,
    ownerMiddleware,
    replyToInquiry
);

// Update inquiry status
router.patch(
    "/:id/status",
    protect,
    ownerMiddleware,
    updateInquiryStatus
);


// =========================================================
// COMMON ROUTES
// =========================================================

// Get single inquiry
router.get(
    "/:id",
    protect,
    getInquiry
);

// Delete inquiry
router.delete(
    "/:id",
    protect,
    deleteInquiry
);


module.exports = router;