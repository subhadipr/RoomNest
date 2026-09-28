const mongoose = require("mongoose");

// =========================================================
// INQUIRY SCHEMA
// =========================================================
const inquirySchema = new mongoose.Schema(
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
        // INQUIRY INFORMATION
        // -------------------------------------------------
        subject: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },

        message: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000
        },

        preferredDate: {
            type: Date,
            default: null
        },

        preferredTime: {
            type: String,
            trim: true,
            default: ""
        },

        // -------------------------------------------------
        // INQUIRY STATUS
        // -------------------------------------------------
        status: {
            type: String,
            enum: [
                "pending",
                "replied",
                "closed",
                "cancelled"
            ],
            default: "pending"
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
        }
    },
    {
        timestamps: true
    }
);


// =========================================================
// INDEXES
// =========================================================
inquirySchema.index({
    student: 1
});

inquirySchema.index({
    owner: 1
});

inquirySchema.index({
    property: 1
});

inquirySchema.index({
    status: 1
});


// =========================================================
// MODEL
// =========================================================
const Inquiry = mongoose.model(
    "Inquiry",
    inquirySchema
);

module.exports = Inquiry;