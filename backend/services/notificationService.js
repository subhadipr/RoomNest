const Notification = require("../models/Notification");


// =========================================================
// CREATE NOTIFICATION
// =========================================================
const createNotification = async ({
    user,
    type = "system",
    title,
    message,
    property = null,
    booking = null,
    inquiry = null,
    review = null,
    link = ""
}) => {

    if (!user || !title || !message) {
        throw new Error(
            "User, title and message are required."
        );
    }

    const notification =
        await Notification.create({
            user,
            type,
            title,
            message,
            property,
            booking,
            inquiry,
            review,
            link
        });

    return notification;
};


// =========================================================
// GET USER NOTIFICATIONS
// =========================================================
const getUserNotifications = async (
    userId,
    options = {}
) => {

    const {
        page = 1,
        limit = 20,
        unreadOnly = false
    } = options;

    const filter = {
        user: userId
    };

    if (unreadOnly) {
        filter.isRead = false;
    }

    const skip =
        (Number(page) - 1) *
        Number(limit);

    const [
        notifications,
        total
    ] = await Promise.all([
        Notification.find(filter)
            .populate(
                "property",
                "title city"
            )
            .populate(
                "booking",
                "status"
            )
            .populate(
                "inquiry",
                "subject status"
            )
            .populate(
                "review",
                "rating"
            )
            .sort({
                createdAt: -1
            })
            .skip(skip)
            .limit(Number(limit)),

        Notification.countDocuments(
            filter
        )
    ]);

    return {
        notifications,
        total,
        page: Number(page),
        pages: Math.ceil(
            total / Number(limit)
        )
    };
};


// =========================================================
// MARK NOTIFICATION AS READ
// =========================================================
const markAsRead = async (
    notificationId,
    userId
) => {

    const notification =
        await Notification.findOne({
            _id: notificationId,
            user: userId
        });

    if (!notification) {
        throw new Error(
            "Notification not found."
        );
    }

    notification.isRead = true;
    notification.readAt = new Date();

    await notification.save();

    return notification;
};


// =========================================================
// MARK ALL NOTIFICATIONS AS READ
// =========================================================
const markAllAsRead = async (
    userId
) => {

    await Notification.updateMany(
        {
            user: userId,
            isRead: false
        },
        {
            $set: {
                isRead: true,
                readAt: new Date()
            }
        }
    );

    return true;
};


// =========================================================
// DELETE NOTIFICATION
// =========================================================
const deleteNotification = async (
    notificationId,
    userId
) => {

    const notification =
        await Notification.findOneAndDelete({
            _id: notificationId,
            user: userId
        });

    if (!notification) {
        throw new Error(
            "Notification not found."
        );
    }

    return notification;
};


// =========================================================
// DELETE ALL USER NOTIFICATIONS
// =========================================================
const deleteAllNotifications = async (
    userId
) => {

    await Notification.deleteMany({
        user: userId
    });

    return true;
};


// =========================================================
// GET UNREAD COUNT
// =========================================================
const getUnreadCount = async (
    userId
) => {

    return Notification.countDocuments({
        user: userId,
        isRead: false
    });
};


// =========================================================
// EXPORT
// =========================================================
module.exports = {
    createNotification,
    getUserNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
    getUnreadCount
};