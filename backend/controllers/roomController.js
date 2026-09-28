/* =========================================================
   ROOMNEST — ROOM CONTROLLER
   File: backend/controllers/roomController.js

   Handles:
   - Get all rooms
   - Get property rooms
   - Get owner rooms
   - Get single room
   - Create room
   - Update room
   - Update room status
   - Delete room
========================================================= */

const Room = require("../models/Room");
const Property = require("../models/Property");


/* =========================================================
   01. GET ALL ROOMS
========================================================= */

const getRooms = async (req, res, next) => {

    try {

        const {
            property,
            status,
            type
        } = req.query;

        const filter = {};

        if (property) {
            filter.property = property;
        }

        if (status) {
            filter.status = status;
        }

        if (type) {
            filter.type = type;
        }

        const rooms =
            await Room.find(filter)
                .populate(
                    "property",
                    "title city address"
                )
                .sort({
                    createdAt: -1
                });

        return res.status(200).json({

            success: true,

            count: rooms.length,

            rooms

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   02. GET SINGLE ROOM
========================================================= */

const getRoom = async (
    req,
    res,
    next
) => {

    try {

        const room =
            await Room.findById(
                req.params.id
            )
            .populate(
                "property",
                "title city address owner"
            )
            .populate(
                "currentOccupants",
                "name email phone"
            );


        if (!room) {

            return res.status(404).json({

                success: false,

                message:
                    "Room not found."

            });
        }


        return res.status(200).json({

            success: true,

            room

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   03. GET PROPERTY ROOMS
========================================================= */

const getPropertyRooms = async (
    req,
    res,
    next
) => {

    try {

        const property =
            await Property.findById(
                req.params.propertyId
            );


        if (!property) {

            return res.status(404).json({

                success: false,

                message:
                    "Property not found."

            });
        }


        const rooms =
            await Room.find({

                property:
                    req.params.propertyId

            })
            .populate(
                "currentOccupants",
                "name email phone"
            )
            .sort({
                roomNumber: 1
            });


        return res.status(200).json({

            success: true,

            property: {
                id: property._id,
                title: property.title
            },

            count:
                rooms.length,

            rooms

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   04. GET OWNER ROOMS
========================================================= */

const getOwnerRooms = async (
    req,
    res,
    next
) => {

    try {

        const properties =
            await Property.find({
                owner: req.user.id
            }).select("_id");


        const propertyIds =
            properties.map(
                property =>
                    property._id
            );


        const rooms =
            await Room.find({

                property: {
                    $in: propertyIds
                }

            })
            .populate(
                "property",
                "title city address"
            )
            .populate(
                "currentOccupants",
                "name email phone"
            )
            .sort({
                createdAt: -1
            });


        return res.status(200).json({

            success: true,

            count:
                rooms.length,

            rooms

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   05. CREATE ROOM
========================================================= */

const createRoom = async (
    req,
    res,
    next
) => {

    try {

        const {
            property,
            roomNumber,
            roomType,
            type,
            rent,
            capacity,
            floor,
            amenities,
            description
        } = req.body;


        if (
            !property ||
            !roomNumber ||
            rent === undefined
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Property, room number and rent are required."

            });
        }


        /* ---------------------------------------------
           Verify property ownership
        --------------------------------------------- */

        const propertyData =
            await Property.findById(
                property
            );


        if (!propertyData) {

            return res.status(404).json({

                success: false,

                message:
                    "Property not found."

            });
        }


        if (
            propertyData.owner.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not allowed to add a room to this property."

            });
        }


        /* ---------------------------------------------
           Duplicate room
        --------------------------------------------- */

        const existingRoom =
            await Room.findOne({

                property,
                roomNumber:
                    roomNumber.trim()

            });


        if (existingRoom) {

            return res.status(409).json({

                success: false,

                message:
                    "This room number already exists in this property."

            });
        }


        /* ---------------------------------------------
           Create
        --------------------------------------------- */

        const room =
            await Room.create({

                property,

                roomNumber:
                    roomNumber.trim(),

                roomType:
                    roomType ||
                    type ||
                    "single",

                rent:
                    Number(rent),

                capacity:
                    capacity !== undefined
                        ? Number(capacity)
                        : 1,

                floor:
                    floor !== undefined
                        ? Number(floor)
                        : 0,

                amenities:
                    Array.isArray(amenities)
                        ? amenities
                        : [],

                description:
                    description
                        ? description.trim()
                        : "",

                status:
                    "available",

                currentOccupants:
                    []

            });


        return res.status(201).json({

            success: true,

            message:
                "Room created successfully.",

            room

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   06. UPDATE ROOM
========================================================= */

const updateRoom = async (
    req,
    res,
    next
) => {

    try {

        const room =
            await Room.findById(
                req.params.id
            );


        if (!room) {

            return res.status(404).json({

                success: false,

                message:
                    "Room not found."

            });
        }


        const property =
            await Property.findById(
                room.property
            );


        if (!property) {

            return res.status(404).json({

                success: false,

                message:
                    "Associated property not found."

            });
        }


        if (
            property.owner.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not allowed to update this room."

            });
        }


        const allowedFields = [

            "roomNumber",
            "roomType",
            "type",
            "rent",
            "capacity",
            "floor",
            "amenities",
            "description",
            "images"

        ];


        allowedFields.forEach(
            field => {

                if (
                    req.body[field] !==
                    undefined
                ) {

                    room[field] =
                        req.body[field];

                }

            }
        );


        if (
            req.body.roomNumber
        ) {

            room.roomNumber =
                req.body.roomNumber
                    .trim();

        }


        const updatedRoom =
            await room.save();


        return res.status(200).json({

            success: true,

            message:
                "Room updated successfully.",

            room:
                updatedRoom

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   07. UPDATE ROOM STATUS
========================================================= */

const updateRoomStatus = async (
    req,
    res,
    next
) => {

    try {

        const {
            status
        } = req.body;


        const validStatuses = [

            "available",
            "occupied",
            "maintenance"

        ];


        if (
            !validStatuses.includes(
                status
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid room status."

            });
        }


        const room =
            await Room.findById(
                req.params.id
            );


        if (!room) {

            return res.status(404).json({

                success: false,

                message:
                    "Room not found."

            });
        }


        const property =
            await Property.findById(
                room.property
            );


        if (
            !property ||
            property.owner.toString() !==
                req.user.id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not allowed to change this room status."

            });
        }


        room.status =
            status;


        if (
            status === "available"
        ) {
            room.currentOccupants =
                [];
        }


        const updatedRoom =
            await room.save();


        return res.status(200).json({

            success: true,

            message:
                "Room status updated successfully.",

            room:
                updatedRoom

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   08. DELETE ROOM
========================================================= */

const deleteRoom = async (
    req,
    res,
    next
) => {

    try {

        const room =
            await Room.findById(
                req.params.id
            );


        if (!room) {

            return res.status(404).json({

                success: false,

                message:
                    "Room not found."

            });
        }


        const property =
            await Property.findById(
                room.property
            );


        if (
            !property ||
            property.owner.toString() !==
                req.user.id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not allowed to delete this room."

            });
        }


        await Room.findByIdAndDelete(
            req.params.id
        );


        return res.status(200).json({

            success: true,

            message:
                "Room deleted successfully."

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   EXPORT
========================================================= */

module.exports = {

    getRooms,
    getRoom,
    getPropertyRooms,
    getOwnerRooms,
    createRoom,
    updateRoom,
    updateRoomStatus,
    deleteRoom

};