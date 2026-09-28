const ownerMiddleware = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        if (req.user.role !== "owner") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Owner privileges required."
            });
        }

        next();

    } catch (error) {
        console.error(
            "Owner Middleware Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Owner authorization failed."
        });
    }
};

module.exports = ownerMiddleware;