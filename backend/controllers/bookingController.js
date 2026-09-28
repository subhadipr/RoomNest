/* =========================================================
   ROOMNEST — BOOKING CONTROLLER
   File: backend/controllers/bookingController.js

   Handles:
   - Create booking
   - Get student bookings
   - Get owner bookings
   - Get single booking
   - Confirm booking
   - Cancel booking
   - Update booking status
   - Delete booking
========================================================= */

const Booking = require("../models/Booking");
const Room = require("../models/Room");
const Property = require("../models/Property");


/* =========================================================
   01. CREATE BOOKING
========================================================= */

const createBooking = async (
    req,
    res,
    next
) => {

    try {

        const {
            property,
            room,
            startDate,
            endDate,
            message
        } = req.body;


        if (
            !property ||
            !room ||
            !startDate
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Property, room and start date are required."

            });
        }


        /* ---------------------------------------------
           Check property
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


        /* ---------------------------------------------
           Check room
        --------------------------------------------- */

        const roomData =
            await Room.findById(
                room
            );


        if (!roomData) {

            return res.status(404).json({

                success: false,

                message:
                    "Room not found."

            });
        }


        if (
            roomData.property.toString() !==
            property.toString()
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Room does not belong to this property."

            });
        }


        /* ---------------------------------------------
           Room availability
        --------------------------------------------- */

        if (
            roomData.status !==
            "available"
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "This room is currently not available."

            });
        }


        /* ---------------------------------------------
           Prevent duplicate active booking
        --------------------------------------------- */

        const existingBooking =
            await Booking.findOne({

                student:
                    req.user.id,

                room,

                status: {
                    $in: [
                        "pending",
                        "confirmed"
                    ]
                }

            });


        if (existingBooking) {

            return res.status(409).json({

                success: false,

                message:
                    "You already have an active booking for this room."

            });
        }


        /* ---------------------------------------------
           Create booking
        --------------------------------------------- */

        const booking =
            await Booking.create({

                student:
                    req.user.id,

                owner:
                    propertyData.owner,

                property,

                room,

                startDate:
                    new Date(startDate),

                endDate:
                    endDate
                        ? new Date(endDate)
                        : null,

                rent:
                    roomData.rent,

                message:
                    message
                        ? message.trim()
                        : "",

                status:
                    "pending"

            });


        const populatedBooking =
            await Booking.findById(
                booking._id
            )
            .populate(
                "student",
                "name email phone avatar"
            )
            .populate(
                "owner",
                "name email phone avatar"
            )
            .populate(
                "property",
                "title city address rent images"
            )
            .populate(
                "room",
                "roomNumber roomType rent capacity"
            );


        return res.status(201).json({

            success: true,

            message:
                "Booking request sent successfully.",

            booking:
                populatedBooking

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   02. GET STUDENT BOOKINGS
========================================================= */

const getStudentBookings = async (
    req,
    res,
    next
) => {

    try {

        const bookings =
            await Booking.find({

                student:
                    req.user.id

            })
            .populate(
                "owner",
                "name email phone avatar"
            )
            .populate(
                "property",
                "title city address rent type images"
            )
            .populate(
                "room",
                "roomNumber roomType rent capacity"
            )
            .sort({
                createdAt: -1
            });


        return res.status(200).json({

            success: true,

            count:
                bookings.length,

            bookings

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   03. GET OWNER BOOKINGS
========================================================= */

const getOwnerBookings = async (
    req,
    res,
    next
) => {

    try {

        const bookings =
            await Booking.find({

                owner:
                    req.user.id

            })
            .populate(
                "student",
                "name email phone avatar"
            )
            .populate(
                "property",
                "title city address rent type images"
            )
            .populate(
                "room",
                "roomNumber roomType rent capacity"
            )
            .sort({
                createdAt: -1
            });


        return res.status(200).json({

            success: true,

            count:
                bookings.length,

            bookings

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   04. GET SINGLE BOOKING
========================================================= */

const getBooking = async (
    req,
    res,
    next
) => {

    try {

        const booking =
            await Booking.findById(
                req.params.id
            )
            .populate(
                "student",
                "name email phone avatar"
            )
            .populate(
                "owner",
                "name email phone avatar"
            )
            .populate(
                "property",
                "title city address rent type images"
            )
            .populate(
                "room",
                "roomNumber roomType rent capacity"
            );


        if (!booking) {

            return res.status(404).json({

                success: false,

                message:
                    "Booking not found."

            });
        }


        const isStudent =
            booking.student._id.toString() ===
            req.user.id.toString();

        const isOwner =
            booking.owner._id.toString() ===
            req.user.id.toString();


        if (
            !isStudent &&
            !isOwner
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not allowed to view this booking."

            });
        }


        return res.status(200).json({

            success: true,

            booking

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   05. CONFIRM BOOKING
========================================================= */

const confirmBooking = async (
    req,
    res,
    next
) => {

    try {

        const booking =
            await Booking.findById(
                req.params.id
            );


        if (!booking) {

            return res.status(404).json({

                success: false,

                message:
                    "Booking not found."

            });
        }


        if (
            booking.owner.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Only the property owner can confirm this booking."

            });
        }


        if (
            booking.status !==
            "pending"
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Only pending bookings can be confirmed."

            });
        }


        const room =
            await Room.findById(
                booking.room
            );


        if (!room) {

            return res.status(404).json({

                success: false,

                message:
                    "Room not found."

            });
        }


        if (
            room.status !==
            "available"
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "This room is no longer available."

            });
        }


        booking.status =
            "confirmed";


        await booking.save();


        /*
           Mark room occupied.
        */

        room.status =
            "occupied";


        if (
            !Array.isArray(
                room.currentOccupants
            )
        ) {
            room.currentOccupants =
                [];
        }


        if (
            !room.currentOccupants.some(
                occupant =>
                    occupant.toString() ===
                    booking.student.toString()
            )
        ) {

            room.currentOccupants.push(
                booking.student
            );
        }


        await room.save();


        const updatedBooking =
            await Booking.findById(
                booking._id
            )
            .populate(
                "student",
                "name email phone avatar"
            )
            .populate(
                "owner",
                "name email phone avatar"
            )
            .populate(
                "property",
                "title city address"
            )
            .populate(
                "room",
                "roomNumber roomType rent capacity"
            );


        return res.status(200).json({

            success: true,

            message:
                "Booking confirmed successfully.",

            booking:
                updatedBooking

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   06. CANCEL BOOKING
========================================================= */

const cancelBooking = async (
    req,
    res,
    next
) => {

    try {

        const booking =
            await Booking.findById(
                req.params.id
            );


        if (!booking) {

            return res.status(404).json({

                success: false,

                message:
                    "Booking not found."

            });
        }


        const isStudent =
            booking.student.toString() ===
            req.user.id.toString();

        const isOwner =
            booking.owner.toString() ===
            req.user.id.toString();


        if (
            !isStudent &&
            !isOwner
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not allowed to cancel this booking."

            });
        }


        if (
            booking.status ===
            "cancelled"
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Booking is already cancelled."

            });
        }


        booking.status =
            "cancelled";


        await booking.save();


        /*
           If confirmed booking is cancelled,
           make the room available again.
        */

        if (
            booking.status ===
            "cancelled"
        ) {

            const room =
                await Room.findById(
                    booking.room
                );


            if (room) {

                room.currentOccupants =
                    (
                        room.currentOccupants ||
                        []
                    ).filter(
                        occupant =>
                            occupant.toString() !==
                            booking.student.toString()
                    );


                if (
                    room.currentOccupants.length ===
                    0
                ) {

                    room.status =
                        "available";
                }


                await room.save();
            }
        }


        return res.status(200).json({

            success: true,

            message:
                "Booking cancelled successfully."

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   07. UPDATE BOOKING STATUS
========================================================= */

const updateBookingStatus = async (
    req,
    res,
    next
) => {

    try {

        const {
            status
        } = req.body;


        const validStatuses = [

            "pending",
            "confirmed",
            "cancelled",
            "completed"

        ];


        if (
            !validStatuses.includes(
                status
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid booking status."

            });
        }


        const booking =
            await Booking.findById(
                req.params.id
            );


        if (!booking) {

            return res.status(404).json({

                success: false,

                message:
                    "Booking not found."

            });
        }


        const isOwner =
            booking.owner.toString() ===
            req.user.id.toString();

        const isStudent =
            booking.student.toString() ===
            req.user.id.toString();


        if (
            !isOwner &&
            !isStudent
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not allowed to update this booking."

            });
        }


        /*
           Student can cancel.
           Owner controls other status changes.
        */

        if (
            status !== "cancelled" &&
            !isOwner
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Only the owner can set this booking status."

            });
        }


        booking.status =
            status;


        await booking.save();


        return res.status(200).json({

            success: true,

            message:
                "Booking status updated successfully.",

            booking

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   08. DELETE BOOKING
========================================================= */

const deleteBooking = async (
    req,
    res,
    next
) => {

    try {

        const booking =
            await Booking.findById(
                req.params.id
            );


        if (!booking) {

            return res.status(404).json({

                success: false,

                message:
                    "Booking not found."

            });
        }


        if (
            booking.student.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Only the student can delete this booking."

            });
        }


        await Booking.findByIdAndDelete(
            req.params.id
        );


        return res.status(200).json({

            success: true,

            message:
                "Booking deleted successfully."

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   EXPORT
========================================================= */

module.exports = {

    createBooking,
    getStudentBookings,
    getOwnerBookings,
    getBooking,
    confirmBooking,
    cancelBooking,
    updateBookingStatus,
    deleteBooking

};