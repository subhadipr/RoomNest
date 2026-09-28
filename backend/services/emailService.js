const nodemailer = require("nodemailer");


// =========================================================
// CREATE EMAIL TRANSPORTER
// =========================================================
const createTransporter = () => {

    if (
        !process.env.EMAIL_HOST ||
        !process.env.EMAIL_USER ||
        !process.env.EMAIL_PASSWORD
    ) {
        return null;
    }

    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,

        port:
            Number(
                process.env.EMAIL_PORT
            ) || 587,

        secure:
            Number(
                process.env.EMAIL_PORT
            ) === 465,

        auth: {
            user:
                process.env.EMAIL_USER,

            pass:
                process.env.EMAIL_PASSWORD
        }
    });
};


// =========================================================
// SEND EMAIL
// =========================================================
const sendEmail = async ({
    to,
    subject,
    text,
    html
}) => {

    const transporter =
        createTransporter();

    if (!transporter) {
        console.warn(
            "⚠️ Email service is not configured."
        );

        return {
            success: false,
            message:
                "Email service is not configured."
        };
    }

    const mailOptions = {
        from:
            process.env.EMAIL_USER,

        to,
        subject,
        text,
        html
    };

    const info =
        await transporter.sendMail(
            mailOptions
        );

    return {
        success: true,
        messageId: info.messageId
    };
};


// =========================================================
// WELCOME EMAIL
// =========================================================
const sendWelcomeEmail = async (
    user
) => {

    return sendEmail({
        to: user.email,

        subject:
            "Welcome to RoomNest",

        text:
            `Hello ${user.name},\n\nWelcome to RoomNest. Your account has been created successfully.\n\nThank you,\nRoomNest Team`,

        html:
            `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Welcome to RoomNest!</h2>

                <p>Hello ${user.name},</p>

                <p>
                    Your RoomNest account has been
                    created successfully.
                </p>

                <p>
                    You can now search for properties,
                    save your favorite properties,
                    send inquiries and manage bookings.
                </p>

                <p>
                    Regards,<br>
                    <strong>RoomNest Team</strong>
                </p>
            </div>
            `
    });
};


// =========================================================
// BOOKING EMAIL
// =========================================================
const sendBookingEmail = async ({
    user,
    booking
}) => {

    return sendEmail({
        to: user.email,

        subject:
            "RoomNest Booking Update",

        text:
            `Hello ${user.name},\n\nYour booking status has been updated to ${booking.status}.\n\nThank you,\nRoomNest Team`,

        html:
            `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Booking Update</h2>

                <p>Hello ${user.name},</p>

                <p>
                    Your RoomNest booking status is:
                    <strong>${booking.status}</strong>
                </p>

                <p>
                    Regards,<br>
                    <strong>RoomNest Team</strong>
                </p>
            </div>
            `
    });
};


// =========================================================
// EXPORT
// =========================================================
module.exports = {
    sendEmail,
    sendWelcomeEmail,
    sendBookingEmail
};