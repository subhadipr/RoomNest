/* =========================================================
   ROOMNEST — ENVIRONMENT CONFIGURATION
   File: backend/config/env.js

   Purpose:
   - Load environment variables
   - Validate required environment variables
   - Keep configuration in one place
========================================================= */

const dotenv = require("dotenv");


/* =========================================================
   LOAD .ENV
========================================================= */

dotenv.config();


/* =========================================================
   ENVIRONMENT
========================================================= */

const env = {

    NODE_ENV:
        process.env.NODE_ENV ||
        "development",

    PORT:
        Number(process.env.PORT) ||
        5000,

    MONGO_URI:
        process.env.MONGO_URI ||
        "",

    JWT_SECRET:
        process.env.JWT_SECRET ||
        "",

    JWT_EXPIRES_IN:
        process.env.JWT_EXPIRES_IN ||
        "7d",

    CLIENT_URL:
        process.env.CLIENT_URL ||
        "http://localhost:5500",

    ADMIN_EMAIL:
        process.env.ADMIN_EMAIL ||
        "",

    ADMIN_PASSWORD:
        process.env.ADMIN_PASSWORD ||
        "",

    EMAIL_HOST:
        process.env.EMAIL_HOST ||
        "",

    EMAIL_PORT:
        Number(process.env.EMAIL_PORT) ||
        587,

    EMAIL_USER:
        process.env.EMAIL_USER ||
        "",

    EMAIL_PASSWORD:
        process.env.EMAIL_PASSWORD ||
        "",

    UPLOAD_DIR:
        process.env.UPLOAD_DIR ||
        "uploads"
};


/* =========================================================
   VALIDATE REQUIRED VARIABLES
========================================================= */

const validateEnv = () => {

    const requiredVariables = [
        "MONGO_URI",
        "JWT_SECRET"
    ];

    const missingVariables =
        requiredVariables.filter(
            variable =>
                !env[variable]
        );


    if (missingVariables.length > 0) {

        console.error(
            "\n❌ Missing required environment variables:"
        );

        missingVariables.forEach(
            variable => {
                console.error(
                    `   - ${variable}`
                );
            }
        );

        console.error(
            "\nPlease check your backend/.env file.\n"
        );

        process.exit(1);
    }
};


/* =========================================================
   EXPORT
========================================================= */

module.exports = {
    env,
    validateEnv
};