const mongoose = require("mongoose");

// =========================================================
// REVIEW SCHEMA
// =========================================================
const reviewSchema = new mongoose.Schema(
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
        // BOOKING
        // -------------------------------------------------
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            default: null
        },

        // -------------------------------------------------
        // RATING
        // -------------------------------------------------
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        // -------------------------------------------------
        // COMMENT
        // -------------------------------------------------
        comment: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000
        },

        // -------------------------------------------------
        // OWNER REPLY
        // -------------------------------------------------
        reply: {
            type: String,
            trim: true,
            default: ""
        },

        repliedAt: {
            type: Date,
            default: null
        },

        // -------------------------------------------------
        // REVIEW STATUS
        // -------------------------------------------------
        status: {
            type: String,
            enum: [
                "pending",
                "approved",
                "rejected"
            ],
            default: "approved"
        }
    },
    {
        timestamps: true
    }
);


// =========================================================
// INDEXES
// =========================================================
reviewSchema.index({
    property: 1
});

reviewSchema.index({
    student: 1
});

reviewSchema.index({
    owner: 1
});

reviewSchema.index({
    booking: 1
});

reviewSchema.index({
    status: 1
});


// =========================================================
// MODEL
// =========================================================
const Review = mongoose.model(
    "Review",
    reviewSchema
);

module.exports = Review;