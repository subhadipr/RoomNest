/* =========================================================
   ROOMNEST — DATABASE CONFIGURATION
   File: backend/config/db.js

   MongoDB connection using Mongoose
========================================================= */

const mongoose = require("mongoose");


/* =========================================================
   CONNECT DATABASE
========================================================= */

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error(
                "MONGO_URI is not defined in environment variables."
            );
        }

        const connection =
            await mongoose.connect(mongoURI);

        console.log(
            `MongoDB Connected: ${connection.connection.host}`
        );

    } catch (error) {

        console.error(
            "MongoDB Connection Failed:",
            error.message
        );

        process.exit(1);
    }
};


/* =========================================================
   EXPORT
========================================================= */

module.exports = connectDB;