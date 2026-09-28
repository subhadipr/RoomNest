/* =========================================================
   ROOMNEST — PROPERTY CONTROLLER
   File: backend/controllers/propertyController.js

   Handles:
   - Get all properties
   - Get single property
   - Owner properties
   - Create property
   - Update property
   - Delete property
   - Search / filter properties
========================================================= */

const Property = require("../models/Property");


/* =========================================================
   01. GET ALL PROPERTIES
========================================================= */

const getProperties = async (req, res, next) => {

    try {

        const {
            search,
            city,
            type,
            status,
            minRent,
            maxRent,
            sort
        } = req.query;


        const filter = {};


        /* Search */

        if (search) {

            filter.$or = [

                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    location: {
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


        /* City */

        if (city) {
            filter.city = {
                $regex: city,
                $options: "i"
            };
        }


        /* Property type */

        if (type) {
            filter.type = type;
        }


        /* Status */

        if (status) {
            filter.status = status;
        }


        /* Rent */

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


        /* Sorting */

        let sortOption = {
            createdAt: -1
        };


        if (sort === "price-low") {
            sortOption = {
                rent: 1
            };
        }


        if (sort === "price-high") {
            sortOption = {
                rent: -1
            };
        }


        if (sort === "oldest") {
            sortOption = {
                createdAt: 1
            };
        }


        const properties =
            await Property.find(filter)
                .populate(
                    "owner",
                    "name email phone avatar"
                )
                .sort(sortOption);


        return res.status(200).json({

            success: true,

            count:
                properties.length,

            properties

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   02. GET SINGLE PROPERTY
========================================================= */

const getProperty = async (
    req,
    res,
    next
) => {

    try {

        const property =
            await Property.findById(
                req.params.id
            )
            .populate(
                "owner",
                "name email phone avatar"
            );


        if (!property) {

            return res.status(404).json({
                success: false,
                message:
                    "Property not found."
            });
        }


        return res.status(200).json({

            success: true,

            property

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   03. GET OWNER PROPERTIES
========================================================= */

const getOwnerProperties = async (
    req,
    res,
    next
) => {

    try {

        const properties =
            await Property.find({
                owner: req.user.id
            })
            .sort({
                createdAt: -1
            });


        return res.status(200).json({

            success: true,

            count:
                properties.length,

            properties

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   04. CREATE PROPERTY
========================================================= */

const createProperty = async (
    req,
    res,
    next
) => {

    try {

        const {
            title,
            description,
            type,
            address,
            location,
            city,
            state,
            pincode,
            rent,
            deposit,
            amenities,
            rules,
            latitude,
            longitude,
            totalRooms
        } = req.body;


        if (
            !title ||
            !description ||
            !type ||
            !address ||
            !city ||
            !rent
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Title, description, type, address, city and rent are required."

            });
        }


        const property =
            await Property.create({

                title:
                    title.trim(),

                description:
                    description.trim(),

                type,

                address:
                    address.trim(),

                location:
                    location
                        ? location.trim()
                        : "",

                city:
                    city.trim(),

                state:
                    state
                        ? state.trim()
                        : "",

                pincode:
                    pincode
                        ? pincode.trim()
                        : "",

                rent:
                    Number(rent),

                deposit:
                    deposit
                        ? Number(deposit)
                        : 0,

                amenities:
                    Array.isArray(amenities)
                        ? amenities
                        : [],

                rules:
                    Array.isArray(rules)
                        ? rules
                        : [],

                latitude:
                    latitude !== undefined
                        ? Number(latitude)
                        : null,

                longitude:
                    longitude !== undefined
                        ? Number(longitude)
                        : null,

                totalRooms:
                    totalRooms !== undefined
                        ? Number(totalRooms)
                        : 0,

                owner:
                    req.user.id,

                status:
                    "pending"

            });


        return res.status(201).json({

            success: true,

            message:
                "Property created successfully and sent for approval.",

            property

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   05. UPDATE PROPERTY
========================================================= */

const updateProperty = async (
    req,
    res,
    next
) => {

    try {

        const property =
            await Property.findById(
                req.params.id
            );


        if (!property) {

            return res.status(404).json({

                success: false,

                message:
                    "Property not found."

            });
        }


        if (
            property.owner.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not allowed to update this property."

            });
        }


        const allowedFields = [

            "title",
            "description",
            "type",
            "address",
            "location",
            "city",
            "state",
            "pincode",
            "rent",
            "deposit",
            "amenities",
            "rules",
            "latitude",
            "longitude",
            "totalRooms",
            "images"

        ];


        allowedFields.forEach(
            field => {

                if (
                    req.body[field] !==
                    undefined
                ) {

                    property[field] =
                        req.body[field];

                }

            }
        );


        const updatedProperty =
            await property.save();


        return res.status(200).json({

            success: true,

            message:
                "Property updated successfully.",

            property:
                updatedProperty

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   06. DELETE PROPERTY
========================================================= */

const deleteProperty = async (
    req,
    res,
    next
) => {

    try {

        const property =
            await Property.findById(
                req.params.id
            );


        if (!property) {

            return res.status(404).json({

                success: false,

                message:
                    "Property not found."

            });
        }


        if (
            property.owner.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not allowed to delete this property."

            });
        }


        await Property.findByIdAndDelete(
            req.params.id
        );


        return res.status(200).json({

            success: true,

            message:
                "Property deleted successfully."

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   EXPORT
========================================================= */

module.exports = {

    getProperties,
    getProperty,
    getOwnerProperties,
    createProperty,
    updateProperty,
    deleteProperty

};