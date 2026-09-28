/* =========================================================
   ROOMNEST — USER CONTROLLER
   File: backend/controllers/userController.js

   Handles:
   - Get profile
   - Update profile
   - Change password
   - Delete account
========================================================= */

const bcrypt = require("bcryptjs");

const User = require("../models/User");


/* =========================================================
   01. GET PROFILE
========================================================= */

const getProfile = async (req, res, next) => {

    try {

        const user = await User.findById(
            req.user.id
        );


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }


        return res.status(200).json({

            success: true,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone || "",
                role: user.role,
                avatar: user.avatar || "",
                createdAt: user.createdAt
            }

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   02. UPDATE PROFILE
========================================================= */

const updateProfile = async (req, res, next) => {

    try {

        const {
            name,
            phone,
            avatar
        } = req.body;


        const user = await User.findById(
            req.user.id
        );


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }


        if (name !== undefined) {

            if (!name.trim()) {

                return res.status(400).json({
                    success: false,
                    message:
                        "Name cannot be empty."
                });
            }

            user.name = name.trim();
        }


        if (phone !== undefined) {
            user.phone = phone.trim();
        }


        if (avatar !== undefined) {
            user.avatar = avatar;
        }


        const updatedUser =
            await user.save();


        return res.status(200).json({

            success: true,

            message:
                "Profile updated successfully.",

            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone || "",
                role: updatedUser.role,
                avatar:
                    updatedUser.avatar || ""
            }

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   03. CHANGE PASSWORD
========================================================= */

const changePassword = async (
    req,
    res,
    next
) => {

    try {

        const {
            currentPassword,
            newPassword
        } = req.body;


        if (
            !currentPassword ||
            !newPassword
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Current password and new password are required."
            });
        }


        if (newPassword.length < 6) {

            return res.status(400).json({
                success: false,
                message:
                    "New password must contain at least 6 characters."
            });
        }


        const user =
            await User.findById(
                req.user.id
            ).select("+password");


        if (!user) {

            return res.status(404).json({
                success: false,
                message:
                    "User not found."
            });
        }


        const passwordMatched =
            await bcrypt.compare(
                currentPassword,
                user.password
            );


        if (!passwordMatched) {

            return res.status(401).json({
                success: false,
                message:
                    "Current password is incorrect."
            });
        }


        user.password =
            await bcrypt.hash(
                newPassword,
                12
            );


        await user.save();


        return res.status(200).json({

            success: true,

            message:
                "Password changed successfully."

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   04. DELETE ACCOUNT
========================================================= */

const deleteAccount = async (
    req,
    res,
    next
) => {

    try {

        const {
            password
        } = req.body;


        if (!password) {

            return res.status(400).json({
                success: false,
                message:
                    "Password is required to delete your account."
            });
        }


        const user =
            await User.findById(
                req.user.id
            ).select("+password");


        if (!user) {

            return res.status(404).json({
                success: false,
                message:
                    "User not found."
            });
        }


        const passwordMatched =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatched) {

            return res.status(401).json({
                success: false,
                message:
                    "Incorrect password."
            });
        }


        await User.findByIdAndDelete(
            req.user.id
        );


        return res.status(200).json({

            success: true,

            message:
                "Account deleted successfully."

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   EXPORT
========================================================= */

module.exports = {

    getProfile,
    updateProfile,
    changePassword,
    deleteAccount

};