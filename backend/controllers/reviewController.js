/* =========================================================
   ROOMNEST — REVIEW CONTROLLER
   File: backend/controllers/reviewController.js

   Handles:
   - Create review
   - Get property reviews
   - Get owner reviews
   - Update review
   - Delete review
   - Reply to review
========================================================= */

const Review = require("../models/Review");
const Property = require("../models/Property");


/* =========================================================
   01. CREATE REVIEW
========================================================= */

const createReview = async (
    req,
    res,
    next
) => {

    try {

        const {
            property,
            booking,
            rating,
            comment
        } = req.body;


        if (
            !property ||
            !rating ||
            !comment
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Property, rating and comment are required."

            });
        }


        /* ---------------------------------------------
           Validate rating
        --------------------------------------------- */

        const numericRating =
            Number(rating);


        if (
            numericRating < 1 ||
            numericRating > 5
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Rating must be between 1 and 5."

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
           Prevent owner review
        --------------------------------------------- */

        if (
            propertyData.owner.toString() ===
            req.user.id.toString()
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Owner cannot review their own property."

            });
        }


        /* ---------------------------------------------
           Check existing review
        --------------------------------------------- */

        const existingReview =
            await Review.findOne({

                student:
                    req.user.id,

                property

            });


        if (existingReview) {

            return res.status(409).json({

                success: false,

                message:
                    "You have already reviewed this property."

            });
        }


        /* ---------------------------------------------
           Create review
        --------------------------------------------- */

        const review =
            await Review.create({

                student:
                    req.user.id,

                owner:
                    propertyData.owner,

                property,

                booking:
                    booking || null,

                rating:
                    numericRating,

                comment:
                    comment.trim(),

                reply:
                    "",

                status:
                    "published"

            });


        const populatedReview =
            await Review.findById(
                review._id
            )
            .populate(
                "student",
                "name email avatar"
            )
            .populate(
                "owner",
                "name email avatar"
            )
            .populate(
                "property",
                "title city"
            );


        return res.status(201).json({

            success: true,

            message:
                "Review submitted successfully.",

            review:
                populatedReview

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   02. GET PROPERTY REVIEWS
========================================================= */

const getPropertyReviews = async (
    req,
    res,
    next
) => {

    try {

        const reviews =
            await Review.find({

                property:
                    req.params.propertyId,

                status:
                    "published"

            })
            .populate(
                "student",
                "name avatar"
            )
            .sort({
                createdAt: -1
            });


        const total =
            reviews.length;


        const average =
            total
                ? (
                    reviews.reduce(
                        (sum, review) =>
                            sum +
                            review.rating,
                        0
                    ) / total
                ).toFixed(1)
                : "0.0";


        return res.status(200).json({

            success: true,

            count:
                total,

            averageRating:
                Number(average),

            reviews

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   03. GET OWNER REVIEWS
========================================================= */

const getOwnerReviews = async (
    req,
    res,
    next
) => {

    try {

        const reviews =
            await Review.find({

                owner:
                    req.user.id

            })
            .populate(
                "student",
                "name email avatar"
            )
            .populate(
                "property",
                "title city"
            )
            .sort({
                createdAt: -1
            });


        return res.status(200).json({

            success: true,

            count:
                reviews.length,

            reviews

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   04. GET SINGLE REVIEW
========================================================= */

const getReview = async (
    req,
    res,
    next
) => {

    try {

        const review =
            await Review.findById(
                req.params.id
            )
            .populate(
                "student",
                "name email avatar"
            )
            .populate(
                "owner",
                "name email avatar"
            )
            .populate(
                "property",
                "title city address"
            );


        if (!review) {

            return res.status(404).json({

                success: false,

                message:
                    "Review not found."

            });
        }


        return res.status(200).json({

            success: true,

            review

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   05. UPDATE REVIEW
========================================================= */

const updateReview = async (
    req,
    res,
    next
) => {

    try {

        const {
            rating,
            comment
        } = req.body;


        const review =
            await Review.findById(
                req.params.id
            );


        if (!review) {

            return res.status(404).json({

                success: false,

                message:
                    "Review not found."

            });
        }


        if (
            review.student.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You can only update your own review."

            });
        }


        if (rating !== undefined) {

            const numericRating =
                Number(rating);


            if (
                numericRating < 1 ||
                numericRating > 5
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Rating must be between 1 and 5."

                });
            }


            review.rating =
                numericRating;
        }


        if (comment !== undefined) {

            if (!comment.trim()) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Comment cannot be empty."

                });
            }


            review.comment =
                comment.trim();
        }


        const updatedReview =
            await review.save();


        return res.status(200).json({

            success: true,

            message:
                "Review updated successfully.",

            review:
                updatedReview

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   06. DELETE REVIEW
========================================================= */

const deleteReview = async (
    req,
    res,
    next
) => {

    try {

        const review =
            await Review.findById(
                req.params.id
            );


        if (!review) {

            return res.status(404).json({

                success: false,

                message:
                    "Review not found."

            });
        }


        if (
            review.student.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You can only delete your own review."

            });
        }


        await Review.findByIdAndDelete(
            req.params.id
        );


        return res.status(200).json({

            success: true,

            message:
                "Review deleted successfully."

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   07. REPLY TO REVIEW
========================================================= */

const replyToReview = async (
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
                    "Reply is required."

            });
        }


        const review =
            await Review.findById(
                req.params.id
            );


        if (!review) {

            return res.status(404).json({

                success: false,

                message:
                    "Review not found."

            });
        }


        if (
            review.owner.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Only the property owner can reply to this review."

            });
        }


        review.reply =
            reply.trim();

        review.repliedAt =
            new Date();


        const updatedReview =
            await review.save();


        return res.status(200).json({

            success: true,

            message:
                "Reply added successfully.",

            review:
                updatedReview

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   EXPORT
========================================================= */

module.exports = {

    createReview,
    getPropertyReviews,
    getOwnerReviews,
    getReview,
    updateReview,
    deleteReview,
    replyToReview

};