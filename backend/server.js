const express = require("express");
const cors = require("cors");
const path = require("path");

const {
    env,
    validateEnv
} = require("./config/env");

const connectDB =
    require("./config/db");

const {
    notFound,
    finalErrorHandler
} = require("./middleware/errorMiddleware");


// =========================================================
// 01. VALIDATE ENVIRONMENT
// =========================================================

validateEnv();


// =========================================================
// 02. CONNECT DATABASE
// =========================================================

connectDB();


// =========================================================
// 03. CREATE EXPRESS APP
// =========================================================

const app = express();


// =========================================================
// 04. CORS
// =========================================================

app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true
    })
);


// =========================================================
// 05. BODY PARSER
// =========================================================

app.use(
    express.json({
        limit: "10mb"
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "10mb"
    })
);


// =========================================================
// 06. STATIC UPLOADS
// =========================================================

app.use(
    "/uploads",
    express.static(
        path.join(
            __dirname,
            "uploads"
        )
    )
);


// =========================================================
// 07. ROOT ROUTE
// =========================================================

app.get(
    "/",
    (req, res) => {

        res.status(200).json({
            success: true,
            message:
                "RoomNest Backend API is running.",
            environment:
                env.NODE_ENV
        });

    }
);


// =========================================================
// 08. HEALTH CHECK
// =========================================================

app.get(
    "/api/health",
    (req, res) => {

        res.status(200).json({
            success: true,
            message:
                "RoomNest API is healthy.",
            timestamp:
                new Date().toISOString()
        });

    }
);


// =========================================================
// 09. API ROUTES
// =========================================================

// Authentication
app.use(
    "/api/auth",
    require("./routes/authRoutes")
);


// Users
app.use(
    "/api/users",
    require("./routes/userRoutes")
);


// Properties
app.use(
    "/api/properties",
    require("./routes/propertyRoutes")
);


// Rooms
app.use(
    "/api/rooms",
    require("./routes/roomRoutes")
);


// Bookings
app.use(
    "/api/bookings",
    require("./routes/bookingRoutes")
);


// Favorites
app.use(
    "/api/favorites",
    require("./routes/favoriteRoutes")
);


// Inquiries
app.use(
    "/api/inquiries",
    require("./routes/inquiryRoutes")
);


// Messages
app.use(
    "/api/messages",
    require("./routes/messageRoutes")
);


// Reviews
app.use(
    "/api/reviews",
    require("./routes/reviewRoutes")
);


// Admin
app.use(
    "/api/admin",
    require("./routes/adminRoutes")
);


// =========================================================
// 10. 404 ROUTE
// =========================================================

app.use(
    notFound
);


// =========================================================
// 11. GLOBAL ERROR HANDLER
// =========================================================

app.use(
    finalErrorHandler
);


// =========================================================
// 12. START SERVER
// =========================================================

const PORT =
    env.PORT || 5000;

const HOST =
    "0.0.0.0";


const server =
    app.listen(
        PORT,
        HOST,
        () => {

            console.log(
                "========================================"
            );

            console.log(
                "🚀 RoomNest Backend Server Started"
            );

            console.log(
                `📡 Server listening on port: ${PORT}`
            );

            console.log(
                "🔗 API: /api"
            );

            console.log(
                "❤️ Health: /api/health"
            );

            console.log(
                `🌐 Environment: ${env.NODE_ENV}`
            );

            console.log(
                "========================================"
            );

        }
    );


// =========================================================
// 13. UNHANDLED PROMISE
// =========================================================

process.on(
    "unhandledRejection",
    (error) => {

        console.error(
            "❌ Unhandled Promise Rejection:"
        );

        console.error(error);


        server.close(
            () => {

                process.exit(1);

            }
        );

    }
);


// =========================================================
// 14. UNCAUGHT EXCEPTION
// =========================================================

process.on(
    "uncaughtException",
    (error) => {

        console.error(
            "❌ Uncaught Exception:"
        );

        console.error(error);

        process.exit(1);

    }
);