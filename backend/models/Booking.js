const mongoose = require("mongoose");

// =========================================================
// BOOKING SCHEMA
// =========================================================
const bookingSchema = new mongoose.Schema(
    {
        // -------------------------------------------------
        // STUDENT
        // -------------------------------------------------
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // -------------------------------------------------
        // OWNER
        // -------------------------------------------------
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // -------------------------------------------------
        // PROPERTY
        // -------------------------------------------------
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true
        },

        // -------------------------------------------------
        // ROOM
        // -------------------------------------------------
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true
        },

        // -------------------------------------------------
        // BOOKING DATES
        // -------------------------------------------------
        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            default: null
        },

        // -------------------------------------------------
        // RENT
        // -------------------------------------------------
        rent: {
            type: Number,
            required: true,
            min: 0
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
        // BOOKING STATUS
        // -------------------------------------------------
        status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "cancelled",
                "completed",
                "rejected"
            ],
            default: "pending"
        },

        // -------------------------------------------------
        // CANCELLATION / REJECTION REASON
        // -------------------------------------------------
        cancellationReason: {
            type: String,
            trim: true,
            default: ""
        },

        rejectionReason: {
            type: String,
            trim: true,
            default: ""
        },

        // -------------------------------------------------
        // PAYMENT INFORMATION
        // -------------------------------------------------
        paymentStatus: {
            type: String,
            enum: [
                "pending",
                "paid",
                "failed",
                "refunded"
            ],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);


// =========================================================
// INDEXES
// =========================================================
bookingSchema.index({
    student: 1
});

bookingSchema.index({
    owner: 1
});

bookingSchema.index({
    property: 1
});

bookingSchema.index({
    room: 1
});

bookingSchema.index({
    status: 1
});


// =========================================================
// MODEL
// =========================================================
const Booking = mongoose.model(
    "Booking",
    bookingSchema
);

module.exports = Booking;