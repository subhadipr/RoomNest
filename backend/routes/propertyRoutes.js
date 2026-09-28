const express = require("express");

const {
    getProperties,
    getProperty,
    getOwnerProperties,
    createProperty,
    updateProperty,
    deleteProperty
} = require("../controllers/propertyController");

const {
    protect
} = require("../middleware/authMiddleware");

const ownerMiddleware =
    require("../middleware/ownerMiddleware");

const {
    uploadPropertyImages
} = require("../middleware/uploadMiddleware");

const router = express.Router();


// =========================================================
// PUBLIC PROPERTY ROUTES
// =========================================================

// Get all properties
router.get(
    "/",
    getProperties
);


// Get single property
router.get(
    "/:id",
    getProperty
);


// =========================================================
// OWNER PROPERTY ROUTES
// =========================================================

// Get owner's properties
router.get(
    "/owner/my-properties",
    protect,
    ownerMiddleware,
    getOwnerProperties
);


// Create property
router.post(
    "/",
    protect,
    ownerMiddleware,
    uploadPropertyImages,
    createProperty
);


// Update property
router.put(
    "/:id",
    protect,
    ownerMiddleware,
    uploadPropertyImages,
    updateProperty
);


// Delete property
router.delete(
    "/:id",
    protect,
    ownerMiddleware,
    deleteProperty
);


module.exports = router;