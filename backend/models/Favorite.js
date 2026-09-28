const mongoose = require("mongoose");

// =========================================================
// FAVORITE SCHEMA
// =========================================================
const favoriteSchema = new mongoose.Schema(
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
        // PROPERTY
        // -------------------------------------------------
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true
        }
    },
    {
        timestamps: true
    }
);


// =========================================================
// PREVENT DUPLICATE FAVORITES
// =========================================================
favoriteSchema.index(
    {
        student: 1,
        property: 1
    },
    {
        unique: true
    }
);


// =========================================================
// ADDITIONAL INDEXES
// =========================================================
favoriteSchema.index({
    student: 1
});

favoriteSchema.index({
    property: 1
});


// =========================================================
// MODEL
// =========================================================
const Favorite = mongoose.model(
    "Favorite",
    favoriteSchema
);

module.exports = Favorite;