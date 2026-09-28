const mongoose = require("mongoose");

// =========================================================
// NOTIFICATION SCHEMA
// =========================================================
const notificationSchema = new mongoose.Schema(
    {
        // -------------------------------------------------
        // USER
        // -------------------------------------------------
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // -------------------------------------------------
        // NOTIFICATION TYPE
        // -------------------------------------------------
        type: {
            type: String,
            enum: [
                "booking",
                "inquiry",
                "message",
                "review",
                "property",
                "system"
            ],
            default: "system"
        },

        // -------------------------------------------------
        // TITLE
        // -------------------------------------------------
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },

        // -------------------------------------------------
        // MESSAGE
        // -------------------------------------------------
        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000
        },

        // -------------------------------------------------
        // RELATED DATA
        // -------------------------------------------------
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            default: null
        },

        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            default: null
        },

        inquiry: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Inquiry",
            default: null
        },

        review: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
            default: null
        },

        // -------------------------------------------------
        // READ STATUS
        // -------------------------------------------------
        isRead: {
            type: Boolean,
            default: false
        },

        readAt: {
            type: Date,
            default: null
        },

        // -------------------------------------------------
        // ACTION URL
        // -------------------------------------------------
        link: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        timestamps: true
    }
);


// =========================================================
// INDEXES
// =========================================================
notificationSchema.index({
    user: 1,
    isRead: 1
});

notificationSchema.index({
    user: 1,
    createdAt: -1
});

notificationSchema.index({
    type: 1
});


// =========================================================
// MODEL
// =========================================================
const Notification = mongoose.model(
    "Notification",
    notificationSchema
);

module.exports = Notification;