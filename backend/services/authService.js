const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");


// =========================================================
// REGISTER USER
// =========================================================
const registerUser = async ({
    name,
    email,
    password,
    role = "student"
}) => {

    const existingUser =
        await User.findOne({
            email: email.toLowerCase()
        });

    if (existingUser) {
        throw new Error(
            "An account with this email already exists."
        );
    }

    const hashedPassword =
        await bcrypt.hash(
            password,
            12
        );

    const user =
        await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role
        });

    const token =
        generateToken(user._id);

    return {
        user,
        token
    };
};


// =========================================================
// LOGIN USER
// =========================================================
const loginUser = async ({
    email,
    password
}) => {

    const user =
        await User.findOne({
            email: email.toLowerCase()
        }).select("+password");

    if (!user) {
        throw new Error(
            "Invalid email or password."
        );
    }

    const isPasswordValid =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isPasswordValid) {
        throw new Error(
            "Invalid email or password."
        );
    }

    if (user.status === "blocked") {
        throw new Error(
            "Your account has been blocked."
        );
    }

    if (user.status === "inactive") {
        throw new Error(
            "Your account is inactive."
        );
    }

    user.lastLogin = new Date();

    await user.save();

    const token =
        generateToken(user._id);

    user.password = undefined;

    return {
        user,
        token
    };
};


// =========================================================
// GET USER BY ID
// =========================================================
const getUserById = async (
    userId
) => {

    return User.findById(
        userId
    ).select("-password");
};


// =========================================================
// CHANGE PASSWORD
// =========================================================
const changePassword = async (
    userId,
    currentPassword,
    newPassword
) => {

    const user =
        await User.findById(
            userId
        ).select("+password");

    if (!user) {
        throw new Error(
            "User not found."
        );
    }

    const isValid =
        await bcrypt.compare(
            currentPassword,
            user.password
        );

    if (!isValid) {
        throw new Error(
            "Current password is incorrect."
        );
    }

    user.password =
        await bcrypt.hash(
            newPassword,
            12
        );

    await user.save();

    return true;
};


// =========================================================
// EXPORT
// =========================================================
module.exports = {
    registerUser,
    loginUser,
    getUserById,
    changePassword
};