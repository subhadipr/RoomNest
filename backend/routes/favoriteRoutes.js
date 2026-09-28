const express = require("express");

const {
    addFavorite,
    getStudentFavorites,
    getFavorite,
    removeFavorite,
    removeFavoriteByProperty,
    checkFavorite
} = require("../controllers/favoriteController");

const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();


// =========================================================
// FAVORITE ROUTES
// =========================================================

// Add property to favorites
router.post(
    "/",
    protect,
    addFavorite
);

// Get student's favorites
router.get(
    "/",
    protect,
    getStudentFavorites
);

// Check if property is favorite
router.get(
    "/check/:propertyId",
    protect,
    checkFavorite
);

// Remove favorite by property ID
router.delete(
    "/property/:propertyId",
    protect,
    removeFavoriteByProperty
);

// Get single favorite
router.get(
    "/:id",
    protect,
    getFavorite
);

// Remove favorite
router.delete(
    "/:id",
    protect,
    removeFavorite
);


module.exports = router;