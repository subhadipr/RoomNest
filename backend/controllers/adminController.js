const User = require("../models/User");
const Property = require("../models/Property");
const Booking = require("../models/Booking");
const Inquiry = require("../models/Inquiry");
const Review = require("../models/Review");


// =========================================================
// ADMIN DASHBOARD
// =========================================================
const getDashboardStats = async (req, res) => {
    try {
        const [
            totalUsers,
            totalOwners,
            totalStudents,
            totalProperties,
            pendingProperties,
            totalBookings,
            pendingBookings,
            totalInquiries,
            pendingInquiries,
            totalReviews
        ] = await Promise.all([
            User.countDocuments(),

            User.countDocuments({
                role: "owner"
            }),

            User.countDocuments({
                role: "student"
            }),

            Property.countDocuments(),

            Property.countDocuments({
                status: "pending"
            }),

            Booking.countDocuments(),

            Booking.countDocuments({
                status: "pending"
            }),

            Inquiry.countDocuments(),

            Inquiry.countDocuments({
                status: "pending"
            }),

            Review.countDocuments()
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalOwners,
                totalStudents,
                totalProperties,
                pendingProperties,
                totalBookings,
                pendingBookings,
                totalInquiries,
                pendingInquiries,
                totalReviews
            }
        });

    } catch (error) {
        console.error(
            "Admin Dashboard Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to load dashboard statistics."
        });
    }
};


// =========================================================
// GET ALL USERS
// =========================================================
const getAllUsers = async (req, res) => {
    try {
        const {
            role,
            status,
            search,
            page = 1,
            limit = 20
        } = req.query;

        const filter = {};

        if (role) {
            filter.role = role;
        }

        if (status) {
            filter.status = status;
        }

        if (search) {
            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    email: {
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
            users,
            total
        ] = await Promise.all([
            User.find(filter)
                .select("-password")
                .sort({
                    createdAt: -1
                })
                .skip(skip)
                .limit(Number(limit)),

            User.countDocuments(filter)
        ]);

        res.status(200).json({
            success: true,
            count: users.length,
            total,
            page: Number(page),
            pages: Math.ceil(
                total / Number(limit)
            ),
            users
        });

    } catch (error) {
        console.error(
            "Get All Users Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch users."
        });
    }
};


// =========================================================
// GET SINGLE USER
// =========================================================
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(
            req.params.id
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error(
            "Get User Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch user."
        });
    }
};


// =========================================================
// UPDATE USER STATUS
// =========================================================
const updateUserStatus = async (req, res) => {
    try {
        const {
            status
        } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required."
            });
        }

        const allowedStatuses = [
            "active",
            "inactive",
            "blocked"
        ];

        if (
            !allowedStatuses.includes(
                status
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid user status."
            });
        }

        const user = await User.findById(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        user.status = status;

        await user.save();

        res.status(200).json({
            success: true,
            message: "User status updated successfully.",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status
            }
        });

    } catch (error) {
        console.error(
            "Update User Status Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to update user status."
        });
    }
};


// =========================================================
// DELETE USER
// =========================================================
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (user.role === "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin account cannot be deleted from here."
            });
        }

        await User.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });

    } catch (error) {
        console.error(
            "Delete User Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to delete user."
        });
    }
};


// =========================================================
// GET ALL OWNERS
// =========================================================
const getAllOwners = async (req, res) => {
    try {
        const owners = await User.find({
            role: "owner"
        })
            .select("-password")
            .sort({
                createdAt: -1
            });

        res.status(200).json({
            success: true,
            count: owners.length,
            owners
        });

    } catch (error) {
        console.error(
            "Get Owners Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch owners."
        });
    }
};


// =========================================================
// GET ALL PROPERTIES
// =========================================================
const getAllProperties = async (req, res) => {
    try {
        const {
            status,
            search
        } = req.query;

        const filter = {};

        if (status) {
            filter.status = status;
        }

        if (search) {
            filter.$or = [
                {
                    title: {
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

        const properties =
            await Property.find(filter)
                .populate(
                    "owner",
                    "name email phone"
                )
                .sort({
                    createdAt: -1
                });

        res.status(200).json({
            success: true,
            count: properties.length,
            properties
        });

    } catch (error) {
        console.error(
            "Get All Properties Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch properties."
        });
    }
};


// =========================================================
// APPROVE PROPERTY
// =========================================================
const approveProperty = async (req, res) => {
    try {
        const property =
            await Property.findById(
                req.params.id
            );

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found."
            });
        }

        property.status = "approved";

        await property.save();

        res.status(200).json({
            success: true,
            message: "Property approved successfully.",
            property
        });

    } catch (error) {
        console.error(
            "Approve Property Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to approve property."
        });
    }
};


// =========================================================
// REJECT PROPERTY
// =========================================================
const rejectProperty = async (req, res) => {
    try {
        const {
            reason
        } = req.body;

        const property =
            await Property.findById(
                req.params.id
            );

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found."
            });
        }

        property.status = "rejected";

        if (reason !== undefined) {
            property.rejectionReason = reason;
        }

        await property.save();

        res.status(200).json({
            success: true,
            message: "Property rejected successfully.",
            property
        });

    } catch (error) {
        console.error(
            "Reject Property Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to reject property."
        });
    }
};


// =========================================================
// DELETE PROPERTY
// =========================================================
const deleteProperty = async (req, res) => {
    try {
        const property =
            await Property.findById(
                req.params.id
            );

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found."
            });
        }

        await Property.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Property deleted successfully."
        });

    } catch (error) {
        console.error(
            "Admin Delete Property Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to delete property."
        });
    }
};


// =========================================================
// GET ALL BOOKINGS
// =========================================================
const getAllBookings = async (req, res) => {
    try {
        const bookings =
            await Booking.find()
                .populate(
                    "student",
                    "name email"
                )
                .populate(
                    "owner",
                    "name email"
                )
                .populate(
                    "property",
                    "title city"
                )
                .populate(
                    "room",
                    "roomNumber roomType rent"
                )
                .sort({
                    createdAt: -1
                });

        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });

    } catch (error) {
        console.error(
            "Get All Bookings Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings."
        });
    }
};


// =========================================================
// GET ALL INQUIRIES
// =========================================================
const getAllInquiries = async (req, res) => {
    try {
        const inquiries =
            await Inquiry.find()
                .populate(
                    "student",
                    "name email"
                )
                .populate(
                    "owner",
                    "name email"
                )
                .populate(
                    "property",
                    "title city"
                )
                .sort({
                    createdAt: -1
                });

        res.status(200).json({
            success: true,
            count: inquiries.length,
            inquiries
        });

    } catch (error) {
        console.error(
            "Get All Inquiries Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch inquiries."
        });
    }
};


// =========================================================
// GET ALL REVIEWS
// =========================================================
const getAllReviews = async (req, res) => {
    try {
        const reviews =
            await Review.find()
                .populate(
                    "student",
                    "name email"
                )
                .populate(
                    "owner",
                    "name email"
                )
                .populate(
                    "property",
                    "title city"
                )
                .sort({
                    createdAt: -1
                });

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });

    } catch (error) {
        console.error(
            "Get All Reviews Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch reviews."
        });
    }
};


// =========================================================
// DELETE REVIEW
// =========================================================
const deleteReview = async (req, res) => {
    try {
        const review =
            await Review.findById(
                req.params.id
            );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found."
            });
        }

        await Review.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Review deleted successfully."
        });

    } catch (error) {
        console.error(
            "Admin Delete Review Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to delete review."
        });
    }
};


// =========================================================
// EXPORT
// =========================================================
module.exports = {
    getDashboardStats,
    getAllUsers,
    getUserById,
    updateUserStatus,
    deleteUser,
    getAllOwners,
    getAllProperties,
    approveProperty,
    rejectProperty,
    deleteProperty,
    getAllBookings,
    getAllInquiries,
    getAllReviews,
    deleteReview
};