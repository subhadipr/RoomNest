/* =========================================================
   ROOMNEST — AUTH CONTROLLER
   File: backend/controllers/authController.js

   Handles:
   - Student registration
   - Owner registration
   - Login
   - Current user
   - Logout response
========================================================= */

const bcrypt = require("bcryptjs");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");


/* =========================================================
   01. REGISTER
========================================================= */

const register = async (req, res, next) => {

    try {

        const {
            name,
            email,
            phone,
            password,
            role
        } = req.body;


        /* ---------------------------------------------
           Validation
        --------------------------------------------- */

        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Name, email and password are required."
            });
        }


        const normalizedEmail =
            email.trim().toLowerCase();


        /* ---------------------------------------------
           Role
        --------------------------------------------- */

        const userRole =
            role === "owner"
                ? "owner"
                : "student";


        /* ---------------------------------------------
           Existing User
        --------------------------------------------- */

        const existingUser =
            await User.findOne({
                email: normalizedEmail
            });


        if (existingUser) {

            return res.status(409).json({
                success: false,
                message:
                    "An account with this email already exists."
            });
        }


        /* ---------------------------------------------
           Password Hash
        --------------------------------------------- */

        const hashedPassword =
            await bcrypt.hash(
                password,
                12
            );


        /* ---------------------------------------------
           Create User
        --------------------------------------------- */

        const user =
            await User.create({

                name:
                    name.trim(),

                email:
                    normalizedEmail,

                phone:
                    phone
                        ? phone.trim()
                        : "",

                password:
                    hashedPassword,

                role:
                    userRole

            });


        /* ---------------------------------------------
           Response
        --------------------------------------------- */

        const token =
            generateToken(user._id);


        return res.status(201).json({

            success: true,

            message:
                "Registration successful.",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   02. LOGIN
========================================================= */

const login = async (req, res, next) => {

    try {

        const {
            email,
            password
        } = req.body;


        /* ---------------------------------------------
           Validation
        --------------------------------------------- */

        if (
            !email ||
            !password
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Email and password are required."
            });
        }


        const normalizedEmail =
            email.trim().toLowerCase();


        /* ---------------------------------------------
           Find User
        --------------------------------------------- */

        const user =
            await User.findOne({
                email: normalizedEmail
            }).select("+password");


        if (!user) {

            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password."
            });
        }


        /* ---------------------------------------------
           Password Check
        --------------------------------------------- */

        const passwordMatched =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatched) {

            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password."
            });
        }


        /* ---------------------------------------------
           Token
        --------------------------------------------- */

        const token =
            generateToken(user._id);


        /* ---------------------------------------------
           Response
        --------------------------------------------- */

        return res.status(200).json({

            success: true,

            message:
                "Login successful.",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   03. GET CURRENT USER
========================================================= */

const getMe = async (req, res, next) => {

    try {

        const user =
            await User.findById(
                req.user.id
            );


        if (!user) {

            return res.status(404).json({
                success: false,
                message:
                    "User not found."
            });
        }


        return res.status(200).json({

            success: true,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                avatar: user.avatar || "",
                createdAt:
                    user.createdAt
            }

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   04. LOGOUT
========================================================= */

const logout = async (req, res, next) => {

    try {

        /*
           JWT authentication is stateless.

           Therefore token removal is normally handled
           on the frontend.

           This endpoint is kept so the frontend can
           maintain a clean authentication flow.
        */

        return res.status(200).json({

            success: true,

            message:
                "Logout successful."

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   EXPORT
========================================================= */

module.exports = {

    register,
    login,
    getMe,
    logout

};