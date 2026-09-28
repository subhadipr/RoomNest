const Property = require("../models/Property");


// =========================================================
// GET PROPERTY BY ID
// =========================================================
const getPropertyById = async (
    propertyId
) => {

    const property =
        await Property.findById(
            propertyId
        )
            .populate(
                "owner",
                "name email phone profileImage"
            );

    if (!property) {
        throw new Error(
            "Property not found."
        );
    }

    return property;
};


// =========================================================
// GET APPROVED PROPERTIES
// =========================================================
const getApprovedProperties = async ({
    page = 1,
    limit = 12,
    city,
    type,
    minRent,
    maxRent,
    search
} = {}) => {

    const filter = {
        status: "approved"
    };

    // City filter
    if (city) {
        filter.city = {
            $regex: city,
            $options: "i"
        };
    }

    // Property type
    if (type) {
        filter.type = type;
    }

    // Rent range
    if (
        minRent !== undefined ||
        maxRent !== undefined
    ) {

        filter.rent = {};

        if (minRent !== undefined) {
            filter.rent.$gte =
                Number(minRent);
        }

        if (maxRent !== undefined) {
            filter.rent.$lte =
                Number(maxRent);
        }
    }

    // Search
    if (search) {
        filter.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                area: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                city: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    const skip =
        (Number(page) - 1) *
        Number(limit);

    const [
        properties,
        total
    ] = await Promise.all([
        Property.find(filter)
            .populate(
                "owner",
                "name email phone"
            )
            .sort({
                createdAt: -1
            })
            .skip(skip)
            .limit(Number(limit)),

        Property.countDocuments(
            filter
        )
    ]);

    return {
        properties,
        total,
        page: Number(page),
        pages: Math.ceil(
            total / Number(limit)
        )
    };
};


// =========================================================
// INCREMENT PROPERTY VIEWS
// =========================================================
const incrementPropertyViews = async (
    propertyId
) => {

    return Property.findByIdAndUpdate(
        propertyId,
        {
            $inc: {
                views: 1
            }
        },
        {
            new: true
        }
    );
};


// =========================================================
// UPDATE PROPERTY STATUS
// =========================================================
const updatePropertyStatus = async (
    propertyId,
    status,
    rejectionReason = ""
) => {

    const allowedStatuses = [
        "pending",
        "approved",
        "rejected",
        "inactive"
    ];

    if (
        !allowedStatuses.includes(
            status
        )
    ) {
        throw new Error(
            "Invalid property status."
        );
    }

    const property =
        await Property.findById(
            propertyId
        );

    if (!property) {
        throw new Error(
            "Property not found."
        );
    }

    property.status = status;

    if (status === "rejected") {
        property.rejectionReason =
            rejectionReason;
    } else {
        property.rejectionReason = "";
    }

    await property.save();

    return property;
};


// =========================================================
// DELETE PROPERTY
// =========================================================
const deleteProperty = async (
    propertyId
) => {

    const property =
        await Property.findById(
            propertyId
        );

    if (!property) {
        throw new Error(
            "Property not found."
        );
    }

    await Property.findByIdAndDelete(
        propertyId
    );

    return true;
};


// =========================================================
// EXPORT
// =========================================================
module.exports = {
    getPropertyById,
    getApprovedProperties,
    incrementPropertyViews,
    updatePropertyStatus,
    deleteProperty
};