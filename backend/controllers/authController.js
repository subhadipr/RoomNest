
/* =========================================================
   ROOMNEST — AUTH CONTROLLER
   Local Registration, Login, Google Login, Current User
========================================================= */

const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const googleClient = new OAuth2Client();

/* =========================================================
   01. REGISTER
========================================================= */

const register = async (req, res, next) => {
    try {
        const { name, email, phone, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required."
            });
        }

        if (typeof password !== "string" || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists."
            });
        }

        const userRole = role === "owner" ? "owner" : "student";
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            phone: phone ? phone.trim() : "",
            password: hashedPassword,
            role: userRole,
            authProvider: "local"
        });

        const token = generateToken(user._id);

        return res.status(201).json({
            success: true,
            message: "Registration successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profileImage: user.profileImage || ""
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
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
        }).select("+password");

        // Google-only accounts do not have a local password.
        if (!user || !user.password) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const passwordMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatched) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        if (user.status !== "active") {
            return res.status(403).json({
                success: false,
                message: "This account is not active."
            });
        }

        user.lastLogin = new Date();
        await user.save();

        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profileImage: user.profileImage || ""
            }
        });
    } catch (error) {
        next(error);
    }
};

/* =========================================================
   03. GOOGLE LOGIN
   Expects: { credential: "Google ID token", role: "student" }
========================================================= */

const googleLogin = async (req, res, next) => {
    try {
        const { credential, role } = req.body;

        if (!credential || typeof credential !== "string") {
            return res.status(400).json({
                success: false,
                message: "Google credential is required."
            });
        }

        const clientId = process.env.GOOGLE_CLIENT_ID;

        if (!clientId) {
            console.error("GOOGLE_CLIENT_ID is not configured.");

            return res.status(500).json({
                success: false,
                message: "Google Sign-In is not configured on the server."
            });
        }

        let payload;

        try {
            const ticket = await googleClient.verifyIdToken({
                idToken: credential,
                audience: clientId
            });

            payload = ticket.getPayload();
        } catch (verificationError) {
            return res.status(401).json({
                success: false,
                message: "Google credential is invalid or expired."
            });
        }

        if (
            !payload ||
            !payload.sub ||
            !payload.email ||
            payload.email_verified !== true
        ) {
            return res.status(401).json({
                success: false,
                message: "A verified Google account is required."
            });
        }

        const normalizedEmail = payload.email.trim().toLowerCase();

        // Google's "sub" is the stable identifier for this account.
        let user = await User.findOne({
            googleId: payload.sub
        });

        if (!user) {
            user = await User.findOne({
                email: normalizedEmail
            });

            if (user) {
                // Do not link Google to an administrator account here.
                if (user.role === "admin") {
                    return res.status(403).json({
                        success: false,
                        message: "Google Sign-In is not available for admin accounts."
                    });
                }

                if (user.googleId && user.googleId !== payload.sub) {
                    return res.status(409).json({
                        success: false,
                        message: "This email is linked to another Google account."
                    });
                }

                // Auto-link only when Google is authoritative for this email:
                // Gmail addresses or Google Workspace accounts with a hosted domain.
                const trustedEmail =
                    normalizedEmail.endsWith("@gmail.com") ||
                    Boolean(payload.hd);

                if (!user.googleId && !trustedEmail) {
                    return res.status(409).json({
                        success: false,
                        message:
                            "This email already has an account. Sign in using your existing method."
                    });
                }

                user.googleId = payload.sub;
                user.authProvider = "google";
                user.isEmailVerified = true;

                if (payload.picture && !user.profileImage) {
                    user.profileImage = payload.picture;
                }
            } else {
                const requestedRole = role === "owner" ? "owner" : "student";

                let displayName =
                    (payload.name || normalizedEmail.split("@")[0]).trim();

                if (displayName.length < 2) {
                    displayName = "RoomNest User";
                }

                user = new User({
                    name: displayName,
                    email: normalizedEmail,
                    googleId: payload.sub,
                    authProvider: "google",
                    role: requestedRole,
                    profileImage: payload.picture || "",
                    isEmailVerified: true,
                    status: "active"
                });
            }
        }

        if (user.role === "admin") {
            return res.status(403).json({
                success: false,
                message: "Google Sign-In is not available for admin accounts."
            });
        }

        if (user.status !== "active") {
            return res.status(403).json({
                success: false,
                message: "This account is not active."
            });
        }

        user.lastLogin = new Date();
        await user.save();

        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Google Sign-In successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profileImage: user.profileImage || ""
            }
        });
    } catch (error) {
        next(error);
    }
};

/* =========================================================
   04. GET CURRENT USER
========================================================= */

const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

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
                phone: user.phone,
                role: user.role,
                avatar: user.profileImage || "",
                profileImage: user.profileImage || "",
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        next(error);
    }
};

/* =========================================================
   05. LOGOUT
========================================================= */

const logout = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Logout successful."
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
    googleLogin,
    getMe,
    logout
};
