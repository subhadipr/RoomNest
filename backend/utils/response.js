// =========================================================
// SUCCESS RESPONSE
// =========================================================
const successResponse = (
    res,
    statusCode = 200,
    message = "Success",
    data = {}
) => {

    return res.status(statusCode).json({
        success: true,
        message,
        ...data
    });
};


// =========================================================
// ERROR RESPONSE
// =========================================================
const errorResponse = (
    res,
    statusCode = 500,
    message = "Something went wrong.",
    errors = null
) => {

    const response = {
        success: false,
        message
    };

    if (errors) {
        response.errors = errors;
    }

    return res
        .status(statusCode)
        .json(response);
};


// =========================================================
// PAGINATED RESPONSE
// =========================================================
const paginatedResponse = (
    res,
    {
        data = [],
        total = 0,
        page = 1,
        limit = 10,
        message = "Data fetched successfully."
    }
) => {

    const totalPages =
        Math.ceil(
            total / Number(limit)
        );

    return res.status(200).json({
        success: true,
        message,

        data,

        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages,

            hasNextPage:
                Number(page) <
                totalPages,

            hasPreviousPage:
                Number(page) > 1
        }
    });
};


// =========================================================
// EXPORT
// =========================================================
module.exports = {
    successResponse,
    errorResponse,
    paginatedResponse
};