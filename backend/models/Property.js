const mongoose = require("mongoose");

// =========================================================
// PROPERTY SCHEMA
// =========================================================
const propertySchema = new mongoose.Schema(
    {
        // -------------------------------------------------
        // OWNER
        // -------------------------------------------------
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // -------------------------------------------------
        // BASIC INFORMATION
        // -------------------------------------------------
        title: {
            type: String,
            required: [true, "Property title is required."],
            trim: true,
            maxlength: 150
        },

        description: {
            type: String,
            trim: true,
            default: ""
        },

        // -------------------------------------------------
        // PROPERTY TYPE
        // -------------------------------------------------
        type: {
            type: String,
            enum: [
                "PG",
                "Room",
                "Hostel",
                "Flat",
                "Apartment",
                "House"
            ],
            required: true
        },

        // -------------------------------------------------
        // LOCATION
        // -------------------------------------------------
        address: {
            type: String,
            required: true,
            trim: true
        },

        area: {
            type: String,
            trim: true,
            default: ""
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        state: {
            type: String,
            trim: true,
            default: "West Bengal"
        },

        pincode: {
            type: String,
            trim: true,
            default: ""
        },

        latitude: {
            type: Number,
            default: null
        },

        longitude: {
            type: Number,
            default: null
        },

        // -------------------------------------------------
        // RENT & PROPERTY DETAILS
        // -------------------------------------------------
        rent: {
            type: Number,
            required: true,
            min: 0
        },

        securityDeposit: {
            type: Number,
            default: 0,
            min: 0
        },

        availableRooms: {
            type: Number,
            default: 0,
            min: 0
        },

        totalRooms: {
            type: Number,
            default: 0,
            min: 0
        },

        // -------------------------------------------------
        // AMENITIES
        // -------------------------------------------------
        amenities: [
            {
                type: String,
                trim: true
            }
        ],

        // -------------------------------------------------
        // PROPERTY IMAGES
        // -------------------------------------------------
        images: [
            {
                type: String
            }
        ],

        // -------------------------------------------------
        // PROPERTY STATUS
        // -------------------------------------------------
        status: {
            type: String,
            enum: [
                "pending",
                "approved",
                "rejected",
                "inactive"
            ],
            default: "pending"
        },

        rejectionReason: {
            type: String,
            default: ""
        },

        // -------------------------------------------------
        // ADDITIONAL INFORMATION
        // -------------------------------------------------
        genderPreference: {
            type: String,
            enum: [
                "male",
                "female",
                "any"
            ],
            default: "any"
        },

        foodAvailable: {
            type: Boolean,
            default: false
        },

        wifiAvailable: {
            type: Boolean,
            default: false
        },

        parkingAvailable: {
            type: Boolean,
            default: false
        },

        // -------------------------------------------------
        // PROPERTY STATS
        // -------------------------------------------------
        views: {
            type: Number,
            default: 0
        },

        featured: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);


// =========================================================
// INDEXES
// =========================================================
propertySchema.index({
    owner: 1
});

propertySchema.index({
    city: 1
});

propertySchema.index({
    type: 1
});

propertySchema.index({
    status: 1
});

propertySchema.index({
    rent: 1
});


// =========================================================
// MODEL
// =========================================================
const Property = mongoose.model(
    "Property",
    propertySchema
);

module.exports = Property;