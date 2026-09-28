const express = require("express");

const {
    createReview,
    getPropertyReviews,
    getOwnerReviews,
    getReview,
    updateReview,
    deleteReview,
    replyToReview
} = require("../controllers/reviewController");

const {
    protect
} = require("../middleware/authMiddleware");

const ownerMiddleware =
    require("../middleware/ownerMiddleware");

const router = express.Router();


// =========================================================
// STUDENT REVIEW ROUTES
// =========================================================

// Create review
router.post(
    "/",
    protect,
    createReview
);

// Get reviews for a property
router.get(
    "/property/:propertyId",
    getPropertyReviews
);

// Get single review
router.get(
    "/:id",
    getReview
);

// Update own review
router.put(
    "/:id",
    protect,
    updateReview
);

// Delete own review
router.delete(
    "/:id",
    protect,
    deleteReview
);


// =========================================================
// OWNER REVIEW ROUTES
// =========================================================

// Get owner's reviews
router.get(
    "/owner/my-reviews",
    protect,
    ownerMiddleware,
    getOwnerReviews
);

// Reply to review
router.patch(
    "/:id/reply",
    protect,
    ownerMiddleware,
    replyToReview
);


module.exports = router;