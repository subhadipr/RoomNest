// =========================================================
// EMAIL VALIDATOR
// =========================================================
const isValidEmail = (email) => {
    if (!email) {
        return false;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        String(email).trim()
    );
};


// =========================================================
// PASSWORD VALIDATOR
// =========================================================
const isValidPassword = (password) => {
    if (!password) {
        return false;
    }

    return String(password).length >= 6;
};


// =========================================================
// PHONE VALIDATOR
// =========================================================
const isValidPhone = (phone) => {
    if (!phone) {
        return false;
    }

    return /^[6-9]\d{9}$/.test(
        String(phone).trim()
    );
};


// =========================================================
// OBJECT ID VALIDATOR
// =========================================================
const isValidObjectId = (id) => {
    return /^[a-fA-F0-9]{24}$/.test(
        String(id)
    );
};


// =========================================================
// REQUIRED FIELD VALIDATOR
// =========================================================
const validateRequiredFields = (
    data,
    fields = []
) => {

    const errors = {};

    fields.forEach((field) => {
        const value = data?.[field];

        if (
            value === undefined ||
            value === null ||
            String(value).trim() === ""
        ) {
            errors[field] =
                `${field} is required.`;
        }
    });

    return {
        isValid:
            Object.keys(errors).length === 0,
        errors
    };
};


// =========================================================
// REGISTRATION VALIDATOR
// =========================================================
const validateRegistration = ({
    name,
    email,
    password,
    role
}) => {

    const errors = {};

    if (
        !name ||
        String(name).trim().length < 2
    ) {
        errors.name =
            "Name must contain at least 2 characters.";
    }

    if (!isValidEmail(email)) {
        errors.email =
            "Please provide a valid email address.";
    }

    if (!isValidPassword(password)) {
        errors.password =
            "Password must contain at least 6 characters.";
    }

    if (
        role &&
        ![
            "student",
            "owner"
        ].includes(role)
    ) {
        errors.role =
            "Invalid user role.";
    }

    return {
        isValid:
            Object.keys(errors).length === 0,
        errors
    };
};


// =========================================================
// BOOKING DATE VALIDATOR
// =========================================================
const validateBookingDates = (
    startDate,
    endDate
) => {

    const errors = {};

    if (!startDate) {
        errors.startDate =
            "Start date is required.";
    }

    if (
        startDate &&
        isNaN(new Date(startDate).getTime())
    ) {
        errors.startDate =
            "Invalid start date.";
    }

    if (
        endDate &&
        isNaN(new Date(endDate).getTime())
    ) {
        errors.endDate =
            "Invalid end date.";
    }

    if (
        startDate &&
        endDate &&
        new Date(endDate) <
            new Date(startDate)
    ) {
        errors.endDate =
            "End date cannot be before start date.";
    }

    return {
        isValid:
            Object.keys(errors).length === 0,
        errors
    };
};


// =========================================================
// RENT VALIDATOR
// =========================================================
const isValidRent = (rent) => {

    if (
        rent === undefined ||
        rent === null ||
        rent === ""
    ) {
        return false;
    }

    const value = Number(rent);

    return (
        Number.isFinite(value) &&
        value >= 0
    );
};


// =========================================================
// RATING VALIDATOR
// =========================================================
const isValidRating = (rating) => {

    const value = Number(rating);

    return (
        Number.isFinite(value) &&
        value >= 1 &&
        value <= 5
    );
};


// =========================================================
// EXPORT
// =========================================================
module.exports = {
    isValidEmail,
    isValidPassword,
    isValidPhone,
    isValidObjectId,
    validateRequiredFields,
    validateRegistration,
    validateBookingDates,
    isValidRent,
    isValidRating
};