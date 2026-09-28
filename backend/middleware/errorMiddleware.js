// =========================================================
// NOT FOUND MIDDLEWARE
// =========================================================
const notFound = (req, res, next) => {
    const error = new Error(
        `Route Not Found - ${req.originalUrl}`
    );

    res.status(404);

    next(error);
};


// =========================================================
// GLOBAL ERROR HANDLER
// =========================================================
const errorHandler = (err, req, res, next) => {
    console.error("❌ Server Error:", err);

    const statusCode =
        res.statusCode &&
        res.statusCode !== 200
            ? res.statusCode
            : 500;

    res.status(statusCode).json({
        success: false,
        message:
            err.message ||
            "Internal Server Error.",

        ...(process.env.NODE_ENV === "development" && {
            stack: err.stack
        })
    });
};


// =========================================================
// MONGOOSE VALIDATION ERROR
// =========================================================
const validationErrorHandler = (
    err,
    req,
    res,
    next
) => {
    if (err.name !== "ValidationError") {
        return next(err);
    }

    const errors = Object.values(
        err.errors
    ).map(error => ({
        field: error.path,
        message: error.message
    }));

    res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors
    });
};


// =========================================================
// MONGOOSE DUPLICATE KEY ERROR
// =========================================================
const duplicateKeyErrorHandler = (
    err,
    req,
    res,
    next
) => {
    if (err.code !== 11000) {
        return next(err);
    }

    const field =
        Object.keys(
            err.keyValue || {}
        )[0];

    res.status(400).json({
        success: false,
        message: field
            ? `${field} already exists.`
            : "Duplicate value already exists."
    });
};


// =========================================================
// MONGOOSE CAST ERROR
// =========================================================
const castErrorHandler = (
    err,
    req,
    res,
    next
) => {
    if (err.name !== "CastError") {
        return next(err);
    }

    res.status(400).json({
        success: false,
        message: `Invalid ${err.path}.`
    });
};


// =========================================================
// FINAL ERROR HANDLER
// =========================================================
const finalErrorHandler = (
    err,
    req,
    res,
    next
) => {
    if (err.name === "ValidationError") {
        return validationErrorHandler(
            err,
            req,
            res,
            next
        );
    }

    if (err.code === 11000) {
        return duplicateKeyErrorHandler(
            err,
            req,
            res,
            next
        );
    }

    if (err.name === "CastError") {
        return castErrorHandler(
            err,
            req,
            res,
            next
        );
    }

    return errorHandler(
        err,
        req,
        res,
        next
    );
};


// =========================================================
// EXPORT
// =========================================================
module.exports = {
    notFound,
    errorHandler,
    validationErrorHandler,
    duplicateKeyErrorHandler,
    castErrorHandler,
    finalErrorHandler
};