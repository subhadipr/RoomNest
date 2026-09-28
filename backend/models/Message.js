const mongoose = require("mongoose");

// =========================================================
// MESSAGE SCHEMA
// =========================================================
const messageSchema = new mongoose.Schema(
    {
        // -------------------------------------------------
        // SENDER
        // -------------------------------------------------
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // -------------------------------------------------
        // RECEIVER
        // -------------------------------------------------
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // -------------------------------------------------
        // MESSAGE
        // -------------------------------------------------
        message: {
            type: String,
            trim: true,
            default: ""
        },

        // -------------------------------------------------
        // RELATED PROPERTY
        // -------------------------------------------------
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            default: null
        },

        // -------------------------------------------------
        // RELATED BOOKING
        // -------------------------------------------------
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            default: null
        },

        // -------------------------------------------------
        // RELATED INQUIRY
        // -------------------------------------------------
        inquiry: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Inquiry",
            default: null
        },

        // -------------------------------------------------
        // ATTACHMENT
        // -------------------------------------------------
        attachment: {
            type: String,
            default: ""
        },

        // -------------------------------------------------
        // READ STATUS
        // -------------------------------------------------
        read: {
            type: Boolean,
            default: false
        },

        readAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);


// =========================================================
// INDEXES
// =========================================================
messageSchema.index({
    sender: 1,
    receiver: 1
});

messageSchema.index({
    receiver: 1,
    read: 1
});

messageSchema.index({
    property: 1
});

messageSchema.index({
    booking: 1
});

messageSchema.index({
    inquiry: 1
});

messageSchema.index({
    createdAt: -1
});


// =========================================================
// MODEL
// =========================================================
const Message = mongoose.model(
    "Message",
    messageSchema
);

module.exports = Message;