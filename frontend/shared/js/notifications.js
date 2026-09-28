/* =========================================================
   ROOMNEST — SHARED NOTIFICATIONS
   File: frontend/shared/js/notifications.js

   Purpose:
   - Notification storage
   - Add notification
   - Read / unread
   - Mark all read
   - Delete notification
   - Clear all
   - Filter notifications
   - Unread count
   - Notification events

   Demo storage:
   roomnestNotifications
========================================================= */

(function () {
    "use strict";


    /* =====================================================
       01. CONFIG
    ===================================================== */

    const STORAGE_KEY =
        "roomnestNotifications";


    /* =====================================================
       02. STORAGE
    ===================================================== */

    function getNotifications() {
        try {
            const data =
                localStorage.getItem(
                    STORAGE_KEY
                );

            if (!data) {
                return [];
            }

            const parsed =
                JSON.parse(data);

            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.error(
                "RoomNest Notifications Error:",
                error
            );

            return [];
        }
    }


    function saveNotifications(
        notifications
    ) {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    notifications
                )
            );

            dispatchChange();

            return true;

        } catch (error) {

            console.error(
                "Unable to save notifications:",
                error
            );

            return false;
        }
    }


    /* =====================================================
       03. ID
    ===================================================== */

    function generateId() {
        return (
            "RN-NOTIF-" +
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .substring(2, 8)
        );
    }


    /* =====================================================
       04. ADD
    ===================================================== */

    function add(notification = {}) {

        const newNotification = {

            id:
                notification.id ||
                generateId(),

            title:
                notification.title ||
                "RoomNest Notification",

            message:
                notification.message ||
                "",

            type:
                notification.type ||
                "system",

            icon:
                notification.icon ||
                "🔔",

            read:
                Boolean(
                    notification.read
                ),

            link:
                notification.link ||
                null,

            createdAt:
                notification.createdAt ||
                new Date().toISOString()
        };


        const notifications =
            getNotifications();

        notifications.unshift(
            newNotification
        );

        saveNotifications(
            notifications
        );

        return newNotification;
    }


    /* =====================================================
       05. GET BY ID
    ===================================================== */

    function getById(id) {

        if (!id) {
            return null;
        }

        const notifications =
            getNotifications();

        return (
            notifications.find(
                item =>
                    item.id === id
            ) || null
        );
    }


    /* =====================================================
       06. MARK READ
    ===================================================== */

    function markAsRead(id) {

        const notifications =
            getNotifications();

        const index =
            notifications.findIndex(
                item =>
                    item.id === id
            );

        if (index === -1) {
            return false;
        }

        notifications[index].read =
            true;

        notifications[index].readAt =
            new Date().toISOString();

        saveNotifications(
            notifications
        );

        return true;
    }


    /* =====================================================
       07. MARK UNREAD
    ===================================================== */

    function markAsUnread(id) {

        const notifications =
            getNotifications();

        const index =
            notifications.findIndex(
                item =>
                    item.id === id
            );

        if (index === -1) {
            return false;
        }

        notifications[index].read =
            false;

        delete notifications[index]
            .readAt;

        saveNotifications(
            notifications
        );

        return true;
    }


    /* =====================================================
       08. MARK ALL READ
    ===================================================== */

    function markAllAsRead() {

        const notifications =
            getNotifications();

        if (!notifications.length) {
            return false;
        }

        notifications.forEach(
            notification => {

                notification.read =
                    true;

                notification.readAt =
                    new Date().toISOString();
            }
        );

        saveNotifications(
            notifications
        );

        return true;
    }


    /* =====================================================
       09. DELETE
    ===================================================== */

    function remove(id) {

        const notifications =
            getNotifications();

        const filtered =
            notifications.filter(
                item =>
                    item.id !== id
            );

        if (
            filtered.length ===
            notifications.length
        ) {
            return false;
        }

        saveNotifications(
            filtered
        );

        return true;
    }


    /* =====================================================
       10. CLEAR ALL
    ===================================================== */

    function clearAll() {

        try {

            localStorage.removeItem(
                STORAGE_KEY
            );

            dispatchChange();

            return true;

        } catch (error) {

            console.error(error);

            return false;
        }
    }


    /* =====================================================
       11. UNREAD
    ===================================================== */

    function getUnread() {

        return getNotifications()
            .filter(
                notification =>
                    !notification.read
            );
    }


    function getUnreadCount() {
        return getUnread().length;
    }


    /* =====================================================
       12. FILTER
    ===================================================== */

    function filter(
        type = "all"
    ) {

        const notifications =
            getNotifications();

        if (
            !type ||
            type === "all"
        ) {
            return notifications;
        }

        if (type === "unread") {
            return notifications.filter(
                notification =>
                    !notification.read
            );
        }

        return notifications.filter(
            notification =>
                notification.type ===
                type
        );
    }


    /* =====================================================
       13. SORT
    ===================================================== */

    function getLatest(
        limit = null
    ) {

        const notifications =
            getNotifications()
                .sort(
                    (a, b) =>
                        new Date(
                            b.createdAt
                        ) -
                        new Date(
                            a.createdAt
                        )
                );

        if (
            limit &&
            Number(limit) > 0
        ) {
            return notifications.slice(
                0,
                Number(limit)
            );
        }

        return notifications;
    }


    /* =====================================================
       14. DELETE BY TYPE
    ===================================================== */

    function removeByType(type) {

        if (!type) {
            return false;
        }

        const notifications =
            getNotifications();

        const filtered =
            notifications.filter(
                notification =>
                    notification.type !==
                    type
            );

        if (
            filtered.length ===
            notifications.length
        ) {
            return false;
        }

        saveNotifications(
            filtered
        );

        return true;
    }


    /* =====================================================
       15. CHANGE EVENT
    ===================================================== */

    function dispatchChange() {

        window.dispatchEvent(
            new CustomEvent(
                "roomnest:notifications-change",
                {
                    detail: {
                        notifications:
                            getNotifications(),

                        unreadCount:
                            getUnreadCount()
                    }
                }
            )
        );
    }


    /* =====================================================
       16. STORAGE EVENT
    ===================================================== */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key ===
                STORAGE_KEY
            ) {
                dispatchChange();
            }

        }
    );


    /* =====================================================
       17. DEMO DATA
    ===================================================== */

    function seedDemo() {

        const existing =
            getNotifications();

        if (existing.length > 0) {
            return false;
        }

        const demoNotifications = [

            {
                id: "RN-NOTIF-001",
                title:
                    "Booking Confirmed",
                message:
                    "Your booking has been confirmed by the owner.",
                type:
                    "bookings",
                icon:
                    "📅",
                read:
                    false
            },

            {
                id: "RN-NOTIF-002",
                title:
                    "New Message",
                message:
                    "You received a new message from the property owner.",
                type:
                    "messages",
                icon:
                    "💬",
                read:
                    false
            },

            {
                id: "RN-NOTIF-003",
                title:
                    "Inquiry Replied",
                message:
                    "The owner has replied to your inquiry.",
                type:
                    "inquiries",
                icon:
                    "📩",
                read:
                    true
            },

            {
                id: "RN-NOTIF-004",
                title:
                    "Welcome to RoomNest",
                message:
                    "Start exploring PGs and rooms near your preferred location.",
                type:
                    "system",
                icon:
                    "🏠",
                read:
                    true
            }

        ];


        const notifications =
            demoNotifications.map(
                notification => ({
                    ...notification,

                    createdAt:
                        new Date().toISOString()
                })
            );


        saveNotifications(
            notifications
        );

        return true;
    }


    /* =====================================================
       18. PUBLIC API
    ===================================================== */

    window.RoomNestNotifications = {

        getAll:
            getNotifications,

        getById,

        add,

        markAsRead,
        markAsUnread,
        markAllAsRead,

        remove,
        clearAll,

        getUnread,
        getUnreadCount,

        filter,

        getLatest,

        removeByType,

        seedDemo

    };


})();