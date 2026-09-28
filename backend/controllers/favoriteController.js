const Favorite = require("../models/Favorite");
const Property = require("../models/Property");

// =========================================================
// ADD PROPERTY TO FAVORITES
// =========================================================
const addFavorite = async (req, res) => {
    try {
        const studentId = req.user._id;
        const { propertyId } = req.body;

        if (!propertyId) {
            return res.status(400).json({
                success: false,
                message: "Property ID is required."
            });
        }

        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found."
            });
        }

        const existingFavorite = await Favorite.findOne({
            student: studentId,
            property: propertyId
        });

        if (existingFavorite) {
            return res.status(400).json({
                success: false,
                message: "Property is already in favorites."
            });
        }

        const favorite = await Favorite.create({
            student: studentId,
            property: propertyId
        });

        const populatedFavorite =
            await Favorite.findById(favorite._id)
                .populate(
                    "property",
                    "title city area rent type images status"
                );

        res.status(201).json({
            success: true,
            message: "Property added to favorites.",
            favorite: populatedFavorite
        });

    } catch (error) {
        console.error("Add Favorite Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to add property to favorites."
        });
    }
};


// =========================================================
// GET STUDENT FAVORITES
// =========================================================
const getStudentFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({
            student: req.user._id
        })
            .populate(
                "property",
                "title city area rent type images status owner"
            )
            .populate(
                "student",
                "name email"
            )
            .sort({
                createdAt: -1
            });

        res.status(200).json({
            success: true,
            count: favorites.length,
            favorites
        });

    } catch (error) {
        console.error("Get Favorites Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch favorites."
        });
    }
};


// =========================================================
// GET SINGLE FAVORITE
// =========================================================
const getFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findById(
            req.params.id
        )
            .populate(
                "property",
                "title city area rent type images status owner"
            )
            .populate(
                "student",
                "name email"
            );

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: "Favorite not found."
            });
        }

        if (
            favorite.student._id.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to access this favorite."
            });
        }

        res.status(200).json({
            success: true,
            favorite
        });

    } catch (error) {
        console.error("Get Favorite Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch favorite."
        });
    }
};


// =========================================================
// REMOVE PROPERTY FROM FAVORITES
// =========================================================
const removeFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findById(
            req.params.id
        );

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: "Favorite not found."
            });
        }

        if (
            favorite.student.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to remove this favorite."
            });
        }

        await Favorite.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Property removed from favorites."
        });

    } catch (error) {
        console.error("Remove Favorite Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to remove favorite."
        });
    }
};


// =========================================================
// REMOVE FAVORITE BY PROPERTY ID
// =========================================================
const removeFavoriteByProperty = async (req, res) => {
    try {
        const { propertyId } = req.params;

        const favorite = await Favorite.findOne({
            student: req.user._id,
            property: propertyId
        });

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: "Property is not in your favorites."
            });
        }

        await Favorite.findByIdAndDelete(
            favorite._id
        );

        res.status(200).json({
            success: true,
            message: "Property removed from favorites."
        });

    } catch (error) {
        console.error(
            "Remove Favorite By Property Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to remove favorite."
        });
    }
};


// =========================================================
// CHECK IF PROPERTY IS FAVORITED
// =========================================================
const checkFavorite = async (req, res) => {
    try {
        const { propertyId } = req.params;

        const favorite = await Favorite.findOne({
            student: req.user._id,
            property: propertyId
        });

        res.status(200).json({
            success: true,
            isFavorite: !!favorite,
            favoriteId: favorite
                ? favorite._id
                : null
        });

    } catch (error) {
        console.error("Check Favorite Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to check favorite status."
        });
    }
};


// =========================================================
// EXPORT CONTROLLERS
// =========================================================
module.exports = {
    addFavorite,
    getStudentFavorites,
    getFavorite,
    removeFavorite,
    removeFavoriteByProperty,
    checkFavorite
};