const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =========================================================
// AUTHENTICATION MIDDLEWARE
// =========================================================
const protect = async (req, res, next) => {
    try {
        let token;

        // -------------------------------------------------
        // Get token from Authorization header
        // Format: Bearer <token>
        // -------------------------------------------------
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token =
                req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. Please login first."
            });
        }

        // -------------------------------------------------
        // Verify token
        // -------------------------------------------------
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // -------------------------------------------------
        // Get user from database
        // -------------------------------------------------
        const user = await User.findById(
            decoded.id
        ).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists."
            });
        }

        // -------------------------------------------------
        // Check account status
        // -------------------------------------------------
        if (user.status === "blocked") {
            return res.status(403).json({
                success: false,
                message: "Your account has been blocked."
            });
        }

        if (user.status === "inactive") {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive."
            });
        }

        // -------------------------------------------------
        // Attach user to request
        // -------------------------------------------------
        req.user = user;

        next();

    } catch (error) {
        console.error(
            "Auth Middleware Error:",
            error.message
        );

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid authentication token."
            });
        }

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Authentication token has expired."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Authentication failed."
        });
    }
};


// =========================================================
// OPTIONAL AUTHENTICATION
// =========================================================
const optionalAuth = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token =
                req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            req.user = null;
            return next();
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(
            decoded.id
        ).select("-password");

        req.user = user || null;

        next();

    } catch (error) {
        req.user = null;
        next();
    }
};


// =========================================================
// EXPORT
// =========================================================
module.exports = {
    protect,
    optionalAuth
};