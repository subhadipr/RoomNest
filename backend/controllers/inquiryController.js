/* =========================================================
   ROOMNEST — INQUIRY CONTROLLER
   File: backend/controllers/inquiryController.js

   Handles:
   - Create inquiry
   - Get student inquiries
   - Get owner inquiries
   - Get single inquiry
   - Reply to inquiry
   - Update inquiry status
   - Cancel inquiry
   - Delete inquiry
========================================================= */

const Inquiry = require("../models/Inquiry");
const Property = require("../models/Property");


/* =========================================================
   01. CREATE INQUIRY
========================================================= */

const createInquiry = async (
    req,
    res,
    next
) => {

    try {

        const {
            property,
            message,
            subject,
            preferredDate,
            preferredTime
        } = req.body;


        if (
            !property ||
            !message
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Property and message are required."

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
           Prevent owner from inquiring own property
        --------------------------------------------- */

        if (
            propertyData.owner.toString() ===
            req.user.id.toString()
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "You cannot send an inquiry for your own property."

            });
        }


        /* ---------------------------------------------
           Create
        --------------------------------------------- */

        const inquiry =
            await Inquiry.create({

                student:
                    req.user.id,

                owner:
                    propertyData.owner,

                property,

                subject:
                    subject
                        ? subject.trim()
                        : "Property Inquiry",

                message:
                    message.trim(),

                preferredDate:
                    preferredDate || null,

                preferredTime:
                    preferredTime || "",

                status:
                    "pending"

            });


        const populatedInquiry =
            await Inquiry.findById(
                inquiry._id
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
                "title city address rent"
            );


        return res.status(201).json({

            success: true,

            message:
                "Inquiry sent successfully.",

            inquiry:
                populatedInquiry

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   02. GET STUDENT INQUIRIES
========================================================= */

const getStudentInquiries = async (
    req,
    res,
    next
) => {

    try {

        const inquiries =
            await Inquiry.find({

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
            .sort({
                createdAt: -1
            });


        return res.status(200).json({

            success: true,

            count:
                inquiries.length,

            inquiries

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   03. GET OWNER INQUIRIES
========================================================= */

const getOwnerInquiries = async (
    req,
    res,
    next
) => {

    try {

        const inquiries =
            await Inquiry.find({

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
            .sort({
                createdAt: -1
            });


        return res.status(200).json({

            success: true,

            count:
                inquiries.length,

            inquiries

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   04. GET SINGLE INQUIRY
========================================================= */

const getInquiry = async (
    req,
    res,
    next
) => {

    try {

        const inquiry =
            await Inquiry.findById(
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
            );


        if (!inquiry) {

            return res.status(404).json({

                success: false,

                message:
                    "Inquiry not found."

            });
        }


        /* ---------------------------------------------
           Access check
        --------------------------------------------- */

        const isStudent =
            inquiry.student._id.toString() ===
            req.user.id.toString();

        const isOwner =
            inquiry.owner._id.toString() ===
            req.user.id.toString();


        if (
            !isStudent &&
            !isOwner
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not allowed to view this inquiry."

            });
        }


        return res.status(200).json({

            success: true,

            inquiry

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   05. REPLY TO INQUIRY
========================================================= */

const replyToInquiry = async (
    req,
    res,
    next
) => {

    try {

        const {
            reply
        } = req.body;


        if (!reply) {

            return res.status(400).json({

                success: false,

                message:
                    "Reply message is required."

            });
        }


        const inquiry =
            await Inquiry.findById(
                req.params.id
            );


        if (!inquiry) {

            return res.status(404).json({

                success: false,

                message:
                    "Inquiry not found."

            });
        }


        if (
            inquiry.owner.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Only the property owner can reply to this inquiry."

            });
        }


        inquiry.reply =
            reply.trim();

        inquiry.repliedAt =
            new Date();

        inquiry.status =
            "replied";


        const updatedInquiry =
            await inquiry.save();


        return res.status(200).json({

            success: true,

            message:
                "Reply sent successfully.",

            inquiry:
                updatedInquiry

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   06. UPDATE STATUS
========================================================= */

const updateInquiryStatus = async (
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
            "replied",
            "closed",
            "cancelled"

        ];


        if (
            !validStatuses.includes(
                status
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid inquiry status."

            });
        }


        const inquiry =
            await Inquiry.findById(
                req.params.id
            );


        if (!inquiry) {

            return res.status(404).json({

                success: false,

                message:
                    "Inquiry not found."

            });
        }


        const isStudent =
            inquiry.student.toString() ===
            req.user.id.toString();

        const isOwner =
            inquiry.owner.toString() ===
            req.user.id.toString();


        if (
            !isStudent &&
            !isOwner
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not allowed to update this inquiry."

            });
        }


        /*
           Student can cancel.
           Owner can reply/close/reopen.
        */

        if (
            status === "cancelled" &&
            !isStudent
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Only the student can cancel an inquiry."

            });
        }


        if (
            status !== "cancelled" &&
            !isOwner
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Only the owner can change this inquiry status."

            });
        }


        inquiry.status =
            status;


        const updatedInquiry =
            await inquiry.save();


        return res.status(200).json({

            success: true,

            message:
                "Inquiry status updated successfully.",

            inquiry:
                updatedInquiry

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   07. CANCEL INQUIRY
========================================================= */

const cancelInquiry = async (
    req,
    res,
    next
) => {

    try {

        const inquiry =
            await Inquiry.findById(
                req.params.id
            );


        if (!inquiry) {

            return res.status(404).json({

                success: false,

                message:
                    "Inquiry not found."

            });
        }


        if (
            inquiry.student.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Only the student can cancel this inquiry."

            });
        }


        if (
            inquiry.status ===
            "closed"
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Closed inquiry cannot be cancelled."

            });
        }


        inquiry.status =
            "cancelled";


        await inquiry.save();


        return res.status(200).json({

            success: true,

            message:
                "Inquiry cancelled successfully."

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   08. DELETE INQUIRY
========================================================= */

const deleteInquiry = async (
    req,
    res,
    next
) => {

    try {

        const inquiry =
            await Inquiry.findById(
                req.params.id
            );


        if (!inquiry) {

            return res.status(404).json({

                success: false,

                message:
                    "Inquiry not found."

            });
        }


        if (
            inquiry.student.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not allowed to delete this inquiry."

            });
        }


        await Inquiry.findByIdAndDelete(
            req.params.id
        );


        return res.status(200).json({

            success: true,

            message:
                "Inquiry deleted successfully."

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   EXPORT
========================================================= */

module.exports = {

    createInquiry,
    getStudentInquiries,
    getOwnerInquiries,
    getInquiry,
    replyToInquiry,
    updateInquiryStatus,
    cancelInquiry,
    deleteInquiry

};