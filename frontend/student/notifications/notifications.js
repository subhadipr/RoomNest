/* =========================================================
   ROOMNEST — STUDENT NOTIFICATIONS
   STANDALONE JAVASCRIPT
========================================================= */


/* =========================================================
   DEMO NOTIFICATIONS
========================================================= */

const notifications = [

    {
        id: 1,

        type: "booking",

        icon: "📅",

        title: "Booking Confirmed",

        message:
            "Your booking for Green View Premium PG has been confirmed by the owner.",

        time: "10 minutes ago",

        read: false
    },


    {
        id: 2,

        type: "message",

        icon: "💬",

        title: "New Message Received",

        message:
            "Green View Premium PG owner sent you a new message.",

        time: "25 minutes ago",

        read: false
    },


    {
        id: 3,

        type: "inquiry",

        icon: "📩",

        title: "Owner Replied to Your Inquiry",

        message:
            "Urban Nest Rooms has replied to your inquiry about room availability.",

        time: "1 hour ago",

        read: false
    },


    {
        id: 4,

        type: "booking",

        icon: "🏠",

        title: "Booking Reminder",

        message:
            "Your upcoming visit to Comfort Stay PG is scheduled for tomorrow.",

        time: "3 hours ago",

        read: false
    },


    {
        id: 5,

        type: "message",

        icon: "✉️",

        title: "New Message",

        message:
            "Student Home PG has sent you a message regarding your room inquiry.",

        time: "Yesterday",

        read: true
    },


    {
        id: 6,

        type: "inquiry",

        icon: "🔎",

        title: "Inquiry Sent Successfully",

        message:
            "Your inquiry has been successfully sent to Royal Residency.",

        time: "Yesterday",

        read: true
    },


    {
        id: 7,

        type: "system",

        icon: "🎉",

        title: "Welcome to RoomNest",

        message:
            "Your RoomNest account is ready. Start exploring PGs and rooms near your preferred location.",

        time: "Sep 14",

        read: true
    },


    {
        id: 8,

        type: "system",

        icon: "🔐",

        title: "Profile Security Updated",

        message:
            "Your account profile information was successfully updated.",

        time: "Sep 13",

        read: true
    },


    {
        id: 9,

        type: "booking",

        icon: "❌",

        title: "Booking Cancelled",

        message:
            "Your booking request for Safe Stay Residence has been cancelled.",

        time: "Sep 11",

        read: true
    },


    {
        id: 10,

        type: "message",

        icon: "💬",

        title: "Conversation Updated",

        message:
            "Your conversation with Royal Residency has been updated.",

        time: "Sep 10",

        read: true
    }

];


/* =========================================================
   VARIABLES
========================================================= */

let currentFilter = "all";

let searchTerm = "";

let selectedNotification = null;

let toastTimer;


/* =========================================================
   DOM
========================================================= */

const notificationList =
    document.getElementById(
        "notificationList"
    );


const emptyState =
    document.getElementById(
        "emptyState"
    );


const notificationSearch =
    document.getElementById(
        "notificationSearch"
    );


const markAllBtn =
    document.getElementById(
        "markAllBtn"
    );


const clearAllBtn =
    document.getElementById(
        "clearAllBtn"
    );


const resetNotificationsBtn =
    document.getElementById(
        "resetNotificationsBtn"
    );


const notificationModal =
    document.getElementById(
        "notificationModal"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const modalIcon =
    document.getElementById(
        "modalIcon"
    );


const modalType =
    document.getElementById(
        "modalType"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalMessage =
    document.getElementById(
        "modalMessage"
    );


const modalTime =
    document.getElementById(
        "modalTime"
    );


const modalAction =
    document.getElementById(
        "modalAction"
    );


const sidebar =
    document.getElementById(
        "sidebar"
    );


const sidebarOverlay =
    document.getElementById(
        "sidebarOverlay"
    );


const menuBtn =
    document.getElementById(
        "menuBtn"
    );


const sidebarClose =
    document.getElementById(
        "sidebarClose"
    );


const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


/* =========================================================
   TOAST
========================================================= */

function showToast(
    title,
    message,
    icon = "✓"
) {

    const toast =
        document.getElementById(
            "toast"
        );


    document.getElementById(
        "toastTitle"
    ).textContent = title;


    document.getElementById(
        "toastMessage"
    ).textContent = message;


    document.getElementById(
        "toastIcon"
    ).textContent = icon;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2800);

}


/* =========================================================
   SAVE
========================================================= */

function saveNotifications() {

    localStorage.setItem(
        "roomnest_notifications",
        JSON.stringify(
            notifications
        )
    );

}


/* =========================================================
   LOAD
========================================================= */

function loadNotifications() {

    const saved =
        localStorage.getItem(
            "roomnest_notifications"
        );


    if (!saved) {
        return;
    }


    try {

        const parsed =
            JSON.parse(saved);


        if (!Array.isArray(parsed)) {
            return;
        }


        parsed.forEach(savedItem => {

            const original =
                notifications.find(
                    item =>
                        item.id ===
                        savedItem.id
                );


            if (original) {

                original.read =
                    savedItem.read;

            }

        });

    } catch (error) {

        console.error(
            "Notification loading error:",
            error
        );

    }

}


/* =========================================================
   GET FILTERED DATA
========================================================= */

function getFilteredNotifications() {

    return notifications.filter(
        notification => {

            const matchesSearch =
                notification.title
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    ) ||

                notification.message
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    );


            if (!matchesSearch) {
                return false;
            }


            if (
                currentFilter ===
                "unread"
            ) {

                return !notification.read;

            }


            if (
                currentFilter ===
                "all"
            ) {

                return true;

            }


            return (
                notification.type ===
                currentFilter
            );

        }
    );

}


/* =========================================================
   RENDER NOTIFICATIONS
========================================================= */

function renderNotifications() {

    notificationList.innerHTML = "";


    const filtered =
        getFilteredNotifications();


    if (filtered.length === 0) {

        emptyState.classList.add(
            "show"
        );

        return;

    }


    emptyState.classList.remove(
        "show"
    );


    filtered.forEach(
        notification => {

            const item =
                document.createElement(
                    "article"
                );


            item.className =
                "notification-item";


            if (!notification.read) {

                item.classList.add(
                    "unread"
                );

            }


            item.innerHTML = `

                <div
                    class="notification-icon ${notification.type}"
                >
                    ${notification.icon}
                </div>


                <div class="notification-content">

                    <div class="notification-top">

                        <h3 class="notification-title">
                            ${notification.title}
                        </h3>

                        <span class="notification-time">
                            ${notification.time}
                        </span>

                    </div>


                    <p class="notification-message">
                        ${notification.message}
                    </p>


                    <div class="notification-bottom">

                        <span class="notification-type">
                            ${getTypeLabel(notification.type)}
                        </span>


                        ${
                            !notification.read
                                ? `<span class="unread-dot"></span>`
                                : ""
                        }

                    </div>

                </div>


                <button
                    class="notification-menu"
                    title="View notification"
                >
                    ⋮
                </button>

            `;


            item.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            ".notification-menu"
                        )
                    ) {

                        event.stopPropagation();

                    }

                    openNotification(
                        notification
                    );

                }
            );


            notificationList.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   TYPE LABEL
========================================================= */

function getTypeLabel(type) {

    const labels = {

        booking: "Booking",

        inquiry: "Inquiry",

        message: "Message",

        system: "System"

    };


    return labels[type] || "Notification";

}


/* =========================================================
   UPDATE STATS
========================================================= */

function updateStats() {

    const total =
        notifications.length;


    const unread =
        notifications.filter(
            notification =>
                !notification.read
        ).length;


    const bookings =
        notifications.filter(
            notification =>
                notification.type ===
                "booking"
        ).length;


    const messages =
        notifications.filter(
            notification =>
                notification.type ===
                "message"
        ).length;


    document.getElementById(
        "totalNotifications"
    ).textContent = total;


    document.getElementById(
        "unreadNotifications"
    ).textContent = unread;


    document.getElementById(
        "bookingNotifications"
    ).textContent = bookings;


    document.getElementById(
        "messageNotifications"
    ).textContent = messages;


    document.getElementById(
        "sidebarNotificationCount"
    ).textContent = unread;

}


/* =========================================================
   OPEN NOTIFICATION
========================================================= */

function openNotification(
    notification
) {

    selectedNotification =
        notification;


    /* Mark read */

    notification.read = true;


    saveNotifications();

    updateStats();

    renderNotifications();


    modalIcon.textContent =
        notification.icon;


    modalType.textContent =
        getTypeLabel(
            notification.type
        );


    modalTitle.textContent =
        notification.title;


    modalMessage.textContent =
        notification.message;


    modalTime.textContent =
        notification.time;


    notificationModal.classList.add(
        "show"
    );

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal() {

    notificationModal.classList.remove(
        "show"
    );

    selectedNotification = null;

}


modalClose.addEventListener(
    "click",
    closeModal
);


modalAction.addEventListener(
    "click",
    closeModal
);


notificationModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            notificationModal
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   MARK ALL READ
========================================================= */

markAllBtn.addEventListener(
    "click",
    () => {

        const unread =
            notifications.filter(
                notification =>
                    !notification.read
            );


        if (unread.length === 0) {

            showToast(
                "Already Read",
                "All notifications are already read.",
                "✓"
            );

            return;

        }


        notifications.forEach(
            notification => {

                notification.read = true;

            }
        );


        saveNotifications();

        updateStats();

        renderNotifications();


        showToast(
            "All Read",
            "All notifications have been marked as read.",
            "✓"
        );

    }
);


/* =========================================================
   CLEAR ALL
========================================================= */

clearAllBtn.addEventListener(
    "click",
    () => {

        if (
            notifications.length === 0
        ) {

            showToast(
                "No Notifications",
                "There are no notifications to clear.",
                "!"
            );

            return;

        }


        const confirmed =
            confirm(
                "Are you sure you want to clear all notifications?"
            );


        if (!confirmed) {
            return;
        }


        notifications.length = 0;


        saveNotifications();

        updateStats();

        renderNotifications();


        showToast(
            "Notifications Cleared",
            "All notifications have been removed.",
            "✓"
        );

    }
);


/* =========================================================
   FILTER
========================================================= */

document
    .querySelectorAll(".filter-tab")
    .forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".filter-tab"
                    )
                    .forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                tab.classList.add(
                    "active"
                );


                currentFilter =
                    tab.dataset.filter;


                renderNotifications();

            }
        );

    });


/* =========================================================
   SEARCH
========================================================= */

notificationSearch.addEventListener(
    "input",
    event => {

        searchTerm =
            event.target.value.trim();


        renderNotifications();

    }
);


/* =========================================================
   RESET
========================================================= */

resetNotificationsBtn.addEventListener(
    "click",
    () => {

        currentFilter = "all";

        searchTerm = "";

        notificationSearch.value = "";


        document
            .querySelectorAll(
                ".filter-tab"
            )
            .forEach(
                tab =>
                    tab.classList.remove(
                        "active"
                    )
            );


        document
            .querySelector(
                '[data-filter="all"]'
            )
            .classList.add(
                "active"
            );


        renderNotifications();

    }
);


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

menuBtn.addEventListener(
    "click",
    () => {

        sidebar.classList.add(
            "open"
        );

        sidebarOverlay.classList.add(
            "show"
        );

    }
);


sidebarClose.addEventListener(
    "click",
    closeSidebar
);


sidebarOverlay.addEventListener(
    "click",
    closeSidebar
);


function closeSidebar() {

    sidebar.classList.remove(
        "open"
    );

    sidebarOverlay.classList.remove(
        "show"
    );

}


/* =========================================================
   LOGOUT
========================================================= */

logoutBtn.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Are you sure you want to logout?"
            );


        if (!confirmed) {
            return;
        }


        localStorage.removeItem(
            "roomnest_student_token"
        );


        localStorage.removeItem(
            "roomnest_student"
        );


        showToast(
            "Logged Out",
            "You have been logged out.",
            "↪"
        );


        setTimeout(
            () => {

                window.location.href =
                    "../../public/auth/login.html";

            },
            900
        );

    }
);


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

            closeSidebar();

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

loadNotifications();

updateStats();

renderNotifications();