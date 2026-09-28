const express = require("express");

const {
    sendMessage,
    getConversations,
    getConversation,
    markMessageAsRead,
    markConversationAsRead,
    deleteMessage
} = require("../controllers/messageController");

const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();


// =========================================================
// MESSAGE ROUTES
// =========================================================

// Send message
router.post(
    "/",
    protect,
    sendMessage
);

// Get all conversations
router.get(
    "/conversations",
    protect,
    getConversations
);

// Get conversation with a user
router.get(
    "/conversation/:userId",
    protect,
    getConversation
);

// Mark single message as read
router.patch(
    "/:id/read",
    protect,
    markMessageAsRead
);

// Mark complete conversation as read
router.patch(
    "/conversation/:userId/read",
    protect,
    markConversationAsRead
);

// Delete message
router.delete(
    "/:id",
    protect,
    deleteMessage
);


module.exports = router;