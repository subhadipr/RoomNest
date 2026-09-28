const mongoose = require("mongoose");

// =========================================================
// ROOM SCHEMA
// =========================================================
const roomSchema = new mongoose.Schema(
    {
        // -------------------------------------------------
        // PROPERTY
        // -------------------------------------------------
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
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
        // ROOM INFORMATION
        // -------------------------------------------------
        roomNumber: {
            type: String,
            required: true,
            trim: true
        },

        roomType: {
            type: String,
            enum: [
                "Single",
                "Double",
                "Triple",
                "Shared"
            ],
            required: true
        },

        floor: {
            type: String,
            trim: true,
            default: ""
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
        // CAPACITY
        // -------------------------------------------------
        capacity: {
            type: Number,
            required: true,
            min: 1
        },

        currentOccupants: {
            type: Number,
            default: 0,
            min: 0
        },

        // -------------------------------------------------
        // ROOM STATUS
        // -------------------------------------------------
        status: {
            type: String,
            enum: [
                "available",
                "occupied",
                "reserved",
                "maintenance"
            ],
            default: "available"
        },

        // -------------------------------------------------
        // ROOM DETAILS
        // -------------------------------------------------
        description: {
            type: String,
            trim: true,
            default: ""
        },

        amenities: [
            {
                type: String,
                trim: true
            }
        ],

        images: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true
    }
);


// =========================================================
// INDEXES
// =========================================================
roomSchema.index({
    property: 1
});

roomSchema.index({
    owner: 1
});

roomSchema.index({
    status: 1
});


// =========================================================
// MODEL
// =========================================================
const Room = mongoose.model(
    "Room",
    roomSchema
);

module.exports = Room;