const express = require("express");

const {
    getRooms,
    getRoom,
    getPropertyRooms,
    getOwnerRooms,
    createRoom,
    updateRoom,
    updateRoomStatus,
    deleteRoom
} = require("../controllers/roomController");

const {
    protect
} = require("../middleware/authMiddleware");

const ownerMiddleware =
    require("../middleware/ownerMiddleware");

const router = express.Router();


// =========================================================
// PUBLIC ROOM ROUTES
// =========================================================

// Get all rooms
router.get(
    "/",
    getRooms
);

// Get single room
router.get(
    "/:id",
    getRoom
);

// Get rooms of a property
router.get(
    "/property/:propertyId",
    getPropertyRooms
);


// =========================================================
// OWNER ROOM ROUTES
// =========================================================

// Get owner's rooms
router.get(
    "/owner/my-rooms",
    protect,
    ownerMiddleware,
    getOwnerRooms
);

// Create room
router.post(
    "/",
    protect,
    ownerMiddleware,
    createRoom
);

// Update room
router.put(
    "/:id",
    protect,
    ownerMiddleware,
    updateRoom
);

// Update room status
router.patch(
    "/:id/status",
    protect,
    ownerMiddleware,
    updateRoomStatus
);

// Delete room
router.delete(
    "/:id",
    protect,
    ownerMiddleware,
    deleteRoom
);


module.exports = router;