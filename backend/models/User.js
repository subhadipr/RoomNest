const mongoose = require("mongoose");

// =========================================================
// USER SCHEMA
// =========================================================
const userSchema = new mongoose.Schema(
    {
        // -------------------------------------------------
        // BASIC INFORMATION
        // -------------------------------------------------
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
            minlength: 2,
            maxlength: 100
        },

        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: [true, "Password is required."],
            minlength: 6,
            select: false
        },

        phone: {
            type: String,
            trim: true,
            default: ""
        },

        // -------------------------------------------------
        // ROLE
        // -------------------------------------------------
        role: {
            type: String,
            enum: [
                "student",
                "owner",
                "admin"
            ],
            default: "student"
        },

        // -------------------------------------------------
        // ACCOUNT STATUS
        // -------------------------------------------------
        status: {
            type: String,
            enum: [
                "active",
                "inactive",
                "blocked"
            ],
            default: "active"
        },

        // -------------------------------------------------
        // PROFILE INFORMATION
        // -------------------------------------------------
        profileImage: {
            type: String,
            default: ""
        },

        gender: {
            type: String,
            enum: [
                "male",
                "female",
                "other",
                ""
            ],
            default: ""
        },

        dateOfBirth: {
            type: Date,
            default: null
        },

        address: {
            type: String,
            trim: true,
            default: ""
        },

        city: {
            type: String,
            trim: true,
            default: ""
        },

        state: {
            type: String,
            trim: true,
            default: ""
        },

        // -------------------------------------------------
        // STUDENT INFORMATION
        // -------------------------------------------------
        college: {
            type: String,
            trim: true,
            default: ""
        },

        course: {
            type: String,
            trim: true,
            default: ""
        },

        // -------------------------------------------------
        // OWNER INFORMATION
        // -------------------------------------------------
        ownerType: {
            type: String,
            enum: [
                "individual",
                "business",
                ""
            ],
            default: ""
        },

        // -------------------------------------------------
        // ACCOUNT VERIFICATION
        // -------------------------------------------------
        isEmailVerified: {
            type: Boolean,
            default: false
        },

        emailVerificationToken: {
            type: String,
            default: null,
            select: false
        },

        emailVerificationExpires: {
            type: Date,
            default: null,
            select: false
        },

        // -------------------------------------------------
        // PASSWORD RESET
        // -------------------------------------------------
        passwordResetToken: {
            type: String,
            default: null,
            select: false
        },

        passwordResetExpires: {
            type: Date,
            default: null,
            select: false
        },

        // -------------------------------------------------
        // LAST LOGIN
        // -------------------------------------------------
        lastLogin: {
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
userSchema.index({
    role: 1
});

userSchema.index({
    status: 1
});




// =========================================================
// MODEL
// =========================================================
const User = mongoose.model(
    "User",
    userSchema
);

module.exports = User;