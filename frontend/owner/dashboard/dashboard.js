/* =========================================================
   ROOMNEST — OWNER DASHBOARD
   File: dashboard.js
   Standalone JavaScript
========================================================= */

"use strict";


/* =========================================================
   01. DEMO DATA
========================================================= */

const ownerDashboardData = {

    owner: {
        name: "Arindam Roy",
        role: "Property Owner",
        initials: "AR"
    },

    stats: {
        totalProperties: 12,
        activeListings: 9,
        pendingProperties: 2,
        totalInquiries: 38,
        totalBookings: 16,
        newMessages: 7
    },

    properties: [
        {
            id: 1,
            name: "Green View PG",
            type: "PG",
            location: "College Road, Kolkata",
            views: 1248,
            inquiries: 86,
            bookings: 14
        },

        {
            id: 2,
            name: "City Heights",
            type: "Room",
            location: "Salt Lake, Kolkata",
            views: 984,
            inquiries: 61,
            bookings: 9
        },

        {
            id: 3,
            name: "Lake View Residence",
            type: "PG",
            location: "New Town, Kolkata",
            views: 756,
            inquiries: 48,
            bookings: 7
        }
    ],

    inquiries: [
        {
            id: 1,
            name: "Sayan Roy",
            property: "Green View PG",
            status: "New",
            time: "10 min ago"
        },

        {
            id: 2,
            name: "Ankit Mondal",
            property: "City Heights",
            status: "Replied",
            time: "1 hour ago"
        },

        {
            id: 3,
            name: "Priya Das",
            property: "Lake View Residence",
            status: "New",
            time: "3 hours ago"
        },

        {
            id: 4,
            name: "Rahul Kumar",
            property: "Royal Nest PG",
            status: "Closed",
            time: "Yesterday"
        },

        {
            id: 5,
            name: "Neha Sharma",
            property: "Green View PG",
            status: "Replied",
            time: "Yesterday"
        }
    ],

    bookings: [
        {
            id: 1,
            date: "24",
            month: "SEP",
            name: "Sayan Roy",
            property: "Green View PG",
            room: "Room 204",
            status: "Confirmed"
        },

        {
            id: 2,
            date: "27",
            month: "SEP",
            name: "Priya Das",
            property: "Lake View Residence",
            room: "Room 102",
            status: "Confirmed"
        },

        {
            id: 3,
            date: "02",
            month: "OCT",
            name: "Ankit Mondal",
            property: "City Heights",
            room: "Room 305",
            status: "Pending"
        },

        {
            id: 4,
            date: "05",
            month: "OCT",
            name: "Neha Sharma",
            property: "Royal Nest PG",
            room: "Room 108",
            status: "Confirmed"
        }
    ],

    reviews: [
        {
            name: "Sayan Roy",
            rating: 5,
            text: "Very clean room and the owner is helpful.",
            property: "Green View PG",
            time: "2 days ago"
        },

        {
            name: "Priya Das",
            rating: 5,
            text: "Great location and good facilities.",
            property: "Lake View Residence",
            time: "4 days ago"
        },

        {
            name: "Ankit Mondal",
            rating: 4,
            text: "Overall a nice place for students.",
            property: "City Heights",
            time: "6 days ago"
        }
    ]

};


/* =========================================================
   02. DOM ELEMENTS
========================================================= */

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const ownerSidebar =
    document.getElementById("ownerSidebar");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");

const logoutBtn =
    document.getElementById("logoutBtn");

const profileMenuBtn =
    document.getElementById("profileMenuBtn");

const searchBtn =
    document.getElementById("searchBtn");

const notificationBtn =
    document.getElementById("notificationBtn");

const searchModal =
    document.getElementById("searchModal");

const notificationModal =
    document.getElementById("notificationModal");

const dashboardSearch =
    document.getElementById("dashboardSearch");

const searchResults =
    document.getElementById("searchResults");

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");

const toastClose =
    document.getElementById("toastClose");

const propertyMoreBtn =
    document.getElementById("propertyMoreBtn");

const propertyDropdown =
    document.getElementById("propertyDropdown");

const performancePeriod =
    document.getElementById("performancePeriod");

const markNotificationsBtn =
    document.getElementById("markNotificationsBtn");

const addPropertyBtn =
    document.getElementById("addPropertyBtn");

const viewPropertiesBtn =
    document.getElementById("viewPropertiesBtn");


/* =========================================================
   03. INITIALIZE DASHBOARD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

});


function initializeDashboard() {

    loadOwnerData();

    initializeMobileSidebar();

    initializeSearch();

    initializeNotifications();

    initializeQuickActions();

    initializePerformanceFilter();

    initializePropertyMenu();

    initializeModalClose();

    initializeToast();

    initializeLogout();

    initializeKeyboardShortcuts();

}


/* =========================================================
   04. LOAD OWNER DATA
========================================================= */

function loadOwnerData() {

    const savedOwner =
        localStorage.getItem("roomnestOwner");

    if (savedOwner) {

        try {

            const owner =
                JSON.parse(savedOwner);

            updateOwnerName(owner);

        } catch (error) {

            console.warn(
                "Unable to load saved owner data."
            );

        }

    }


    const savedStats =
        localStorage.getItem("roomnestOwnerStats");

    if (savedStats) {

        try {

            const stats =
                JSON.parse(savedStats);

            updateStats(stats);

        } catch (error) {

            console.warn(
                "Unable to load saved dashboard stats."
            );

        }

    }

}


/* =========================================================
   05. UPDATE OWNER NAME
========================================================= */

function updateOwnerName(owner) {

    if (!owner) {
        return;
    }

    const ownerName =
        owner.name || "Arindam Roy";

    const initials =
        owner.initials ||
        createInitials(ownerName);


    document
        .querySelectorAll(".owner-mini-info strong")
        .forEach(element => {

            element.textContent =
                ownerName;

        });


    document
        .querySelectorAll(".topbar-profile-info strong")
        .forEach(element => {

            element.textContent =
                ownerName;

        });


    document
        .querySelectorAll(".owner-avatar, .topbar-avatar")
        .forEach(element => {

            element.textContent =
                initials;

        });


    const welcomeHeading =
        document.querySelector(
            ".welcome-content h2"
        );

    if (welcomeHeading) {

        welcomeHeading.textContent =
            `Good evening, ${ownerName}!`;

    }

}


/* =========================================================
   06. CREATE INITIALS
========================================================= */

function createInitials(name) {

    if (!name) {
        return "AR";
    }

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join("")
        .toUpperCase();

}


/* =========================================================
   07. UPDATE STATS
========================================================= */

function updateStats(stats) {

    if (!stats) {
        return;
    }

    setText(
        "totalProperties",
        stats.totalProperties
    );

    setText(
        "activeListings",
        stats.activeListings
    );

    setText(
        "pendingProperties",
        stats.pendingProperties
    );

    setText(
        "totalInquiries",
        stats.totalInquiries
    );

    setText(
        "totalBookings",
        stats.totalBookings
    );

    setText(
        "newMessages",
        stats.newMessages
    );

}


/* =========================================================
   08. SAFE TEXT SETTER
========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element && value !== undefined) {

        element.textContent =
            value;

    }

}


/* =========================================================
   09. MOBILE SIDEBAR
========================================================= */

function initializeMobileSidebar() {

    if (!mobileMenuBtn) {
        return;
    }


    mobileMenuBtn.addEventListener(
        "click",
        () => {

            toggleSidebar();

        }
    );


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    if (
                        window.innerWidth <= 760
                    ) {

                        closeSidebar();

                    }

                }
            );

        });

}


function toggleSidebar() {

    if (!ownerSidebar) {
        return;
    }

    ownerSidebar.classList.toggle(
        "open"
    );

    if (sidebarOverlay) {

        sidebarOverlay.classList.toggle(
            "show"
        );

    }

}


function closeSidebar() {

    if (ownerSidebar) {

        ownerSidebar.classList.remove(
            "open"
        );

    }

    if (sidebarOverlay) {

        sidebarOverlay.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   10. SEARCH
========================================================= */

function initializeSearch() {

    if (!searchBtn) {
        return;
    }


    searchBtn.addEventListener(
        "click",
        () => {

            openModal(searchModal);

            setTimeout(() => {

                if (dashboardSearch) {

                    dashboardSearch.focus();

                }

            }, 150);

        }
    );


    if (dashboardSearch) {

        dashboardSearch.addEventListener(
            "input",
            handleDashboardSearch
        );

    }

}


function handleDashboardSearch(event) {

    const query =
        event.target.value
            .trim()
            .toLowerCase();


    if (!query) {

        searchResults.innerHTML = `
            <p class="search-empty">
                Start typing to search.
            </p>
        `;

        return;

    }


    const results = [];


    ownerDashboardData.properties
        .forEach(property => {

            if (
                property.name
                    .toLowerCase()
                    .includes(query) ||

                property.location
                    .toLowerCase()
                    .includes(query) ||

                property.type
                    .toLowerCase()
                    .includes(query)
            ) {

                results.push({
                    icon: "🏠",
                    title: property.name,
                    subtitle:
                        `${property.type} · ${property.location}`,
                    url:
                        "../properties/properties.html"
                });

            }

        });


    ownerDashboardData.inquiries
        .forEach(inquiry => {

            if (
                inquiry.name
                    .toLowerCase()
                    .includes(query) ||

                inquiry.property
                    .toLowerCase()
                    .includes(query)
            ) {

                results.push({
                    icon: "📩",
                    title:
                        inquiry.name,
                    subtitle:
                        `${inquiry.property} · Inquiry`,
                    url:
                        "../inquiries/inquiries.html"
                });

            }

        });


    ownerDashboardData.bookings
        .forEach(booking => {

            if (
                booking.name
                    .toLowerCase()
                    .includes(query) ||

                booking.property
                    .toLowerCase()
                    .includes(query) ||

                booking.room
                    .toLowerCase()
                    .includes(query)
            ) {

                results.push({
                    icon: "📅",
                    title:
                        booking.name,
                    subtitle:
                        `${booking.property} · ${booking.room}`,
                    url:
                        "../bookings/bookings.html"
                });

            }

        });


    renderSearchResults(
        results.slice(0, 8)
    );

}


function renderSearchResults(results) {

    if (!searchResults) {
        return;
    }


    if (!results.length) {

        searchResults.innerHTML = `
            <p class="search-empty">
                No matching results found.
            </p>
        `;

        return;

    }


    searchResults.innerHTML =
        results.map(result => {

            return `
                <div
                    class="search-result-item"
                    data-url="${result.url}">

                    <div class="search-result-icon">
                        ${result.icon}
                    </div>

                    <div>
                        <strong>
                            ${escapeHTML(result.title)}
                        </strong>

                        <span>
                            ${escapeHTML(result.subtitle)}
                        </span>
                    </div>

                </div>
            `;

        }).join("");


    document
        .querySelectorAll(".search-result-item")
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    const url =
                        item.dataset.url;

                    if (url) {

                        window.location.href =
                            url;

                    }

                }
            );

        });

}


/* =========================================================
   11. ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   12. NOTIFICATIONS
========================================================= */

function initializeNotifications() {

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            () => {

                openModal(
                    notificationModal
                );

            }
        );

    }


    if (markNotificationsBtn) {

        markNotificationsBtn.addEventListener(
            "click",
            markNotificationsAsRead
        );

    }

}


function markNotificationsAsRead() {

    document
        .querySelectorAll(
            ".notification-item.unread"
        )
        .forEach(item => {

            item.classList.remove(
                "unread"
            );

        });


    const dot =
        document.querySelector(
            ".notification-dot"
        );

    if (dot) {

        dot.style.display =
            "none";

    }


    showToast(
        "Notifications",
        "All notifications marked as read."
    );

}


/* =========================================================
   13. QUICK ACTIONS
========================================================= */

function initializeQuickActions() {

    document
        .querySelectorAll(".quick-action")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const action =
                        button.dataset.action;

                    handleQuickAction(
                        action
                    );

                }
            );

        });


    if (addPropertyBtn) {

        addPropertyBtn.addEventListener(
            "click",
            () => {

                navigateTo(
                    "../add-property/add-property.html"
                );

            }
        );

    }


    if (viewPropertiesBtn) {

        viewPropertiesBtn.addEventListener(
            "click",
            () => {

                navigateTo(
                    "../properties/properties.html"
                );

            }
        );

    }

}


function handleQuickAction(action) {

    switch (action) {

        case "add-property":

            navigateTo(
                "../add-property/add-property.html"
            );

            break;


        case "properties":

            navigateTo(
                "../properties/properties.html"
            );

            break;


        case "inquiries":

            navigateTo(
                "../inquiries/inquiries.html"
            );

            break;


        case "bookings":

            navigateTo(
                "../bookings/bookings.html"
            );

            break;


        default:

            showToast(
                "Quick Action",
                "Action is not available yet."
            );

    }

}


/* =========================================================
   14. NAVIGATION HELPER
========================================================= */

function navigateTo(url) {

    if (!url) {
        return;
    }

    window.location.href =
        url;

}


/* =========================================================
   15. PERFORMANCE FILTER
========================================================= */

function initializePerformanceFilter() {

    if (!performancePeriod) {
        return;
    }


    performancePeriod.addEventListener(
        "change",
        () => {

            const value =
                performancePeriod.value;


            if (value === "7") {

                showToast(
                    "Performance",
                    "Showing performance for the last 7 days."
                );

            }

            else if (value === "30") {

                showToast(
                    "Performance",
                    "Showing performance for the last 30 days."
                );

            }

            else if (value === "90") {

                showToast(
                    "Performance",
                    "Showing performance for the last 3 months."
                );

            }

        }
    );

}


/* =========================================================
   16. PROPERTY DROPDOWN
========================================================= */

function initializePropertyMenu() {

    if (!propertyMoreBtn) {
        return;
    }


    propertyMoreBtn.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            togglePropertyDropdown();

        }
    );


    document
        .querySelectorAll(
            "[data-property-action]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    handlePropertyAction(
                        button.dataset.propertyAction
                    );

                    closePropertyDropdown();

                }
            );

        });


    document.addEventListener(
        "click",
        event => {

            if (
                propertyDropdown &&
                !propertyDropdown.contains(event.target) &&
                event.target !== propertyMoreBtn
            ) {

                closePropertyDropdown();

            }

        }
    );

}


function togglePropertyDropdown() {

    if (!propertyDropdown) {
        return;
    }


    const rect =
        propertyMoreBtn.getBoundingClientRect();


    propertyDropdown.style.top =
        `${rect.bottom + 7}px`;

    propertyDropdown.style.left =
        `${Math.max(
            10,
            rect.right - 170
        )}px`;


    propertyDropdown.classList.toggle(
        "show"
    );

}


function closePropertyDropdown() {

    if (propertyDropdown) {

        propertyDropdown.classList.remove(
            "show"
        );

    }

}


function handlePropertyAction(action) {

    switch (action) {

        case "edit":

            showToast(
                "Edit Property",
                "Property editor will be available soon."
            );

            break;


        case "view":

            showToast(
                "View Property",
                "Opening property details..."
            );

            setTimeout(() => {

                navigateTo(
                    "../../property/property-details.html"
                );

            }, 700);

            break;


        case "share":

            shareProperty();

            break;


        default:

            showToast(
                "Property",
                "Action completed."
            );

    }

}


/* =========================================================
   17. SHARE PROPERTY
========================================================= */

function shareProperty() {

    const shareText =
        "Green View PG - RoomNest";

    const shareUrl =
        window.location.origin +
        "/frontend/public/property/property-details.html";


    if (
        navigator.share &&
        typeof navigator.share === "function"
    ) {

        navigator.share({

            title: "Green View PG",
            text: shareText,
            url: shareUrl

        }).catch(() => {});

        return;

    }


    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(shareUrl)
            .then(() => {

                showToast(
                    "Link Copied",
                    "Property link copied to clipboard."
                );

            })
            .catch(() => {

                showToast(
                    "Share",
                    "Unable to copy the link."
                );

            });

        return;

    }


    showToast(
        "Share",
        "Share option is not available in this browser."
    );

}


/* =========================================================
   18. MODAL
========================================================= */

function openModal(modal) {

    if (!modal) {
        return;
    }

    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


function closeModal(modal) {

    if (!modal) {
        return;
    }

    modal.classList.remove("show");

    if (
        !document.querySelector(
            ".modal-overlay.show"
        )
    ) {

        document.body.style.overflow =
            "";

    }

}


function initializeModalClose() {

    document
        .querySelectorAll(
            "[data-close]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const modalId =
                        button.dataset.close;

                    closeModal(
                        document.getElementById(
                            modalId
                        )
                    );

                }
            );

        });


    document
        .querySelectorAll(".modal-overlay")
        .forEach(modal => {

            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target === modal
                    ) {

                        closeModal(modal);

                    }

                }
            );

        });

}


/* =========================================================
   19. TOAST
========================================================= */

let toastTimer = null;


function initializeToast() {

    if (toastClose) {

        toastClose.addEventListener(
            "click",
            hideToast
        );

    }

}


function showToast(
    title = "Success",
    message = "Action completed successfully."
) {

    if (!toast) {
        return;
    }


    if (toastTitle) {

        toastTitle.textContent =
            title;

    }


    if (toastMessage) {

        toastMessage.textContent =
            message;

    }


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            hideToast,
            3500
        );

}


function hideToast() {

    if (!toast) {
        return;
    }

    toast.classList.remove(
        "show"
    );

}


/* =========================================================
   20. PROFILE MENU
========================================================= */

if (profileMenuBtn) {

    profileMenuBtn.addEventListener(
        "click",
        () => {

            showToast(
                "Profile",
                "Owner profile options will be available soon."
            );

        }
    );

}


/* =========================================================
   21. LOGOUT
========================================================= */

function initializeLogout() {

    if (!logoutBtn) {
        return;
    }


    logoutBtn.addEventListener(
        "click",
        handleLogout
    );

}


function handleLogout() {

    const shouldLogout =
        window.confirm(
            "Are you sure you want to logout?"
        );


    if (!shouldLogout) {
        return;
    }


    localStorage.removeItem(
        "roomnestOwner"
    );

    localStorage.removeItem(
        "roomnestOwnerStats"
    );


    showToast(
        "Logged Out",
        "You have been logged out successfully."
    );


    setTimeout(() => {

        /*
         * Demo authentication page.
         * Change this path later when the real
         * authentication system is connected.
         */

        window.location.href =
            "../../public/auth/login.html";

    }, 900);

}


/* =========================================================
   22. KEYBOARD SHORTCUTS
========================================================= */

function initializeKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        event => {

            /* ESC — Close everything */

            if (
                event.key === "Escape"
            ) {

                closeAllOverlays();

            }


            /* CTRL + K — Search */

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                openModal(
                    searchModal
                );

                setTimeout(() => {

                    if (dashboardSearch) {

                        dashboardSearch.focus();

                    }

                }, 100);

            }

        }
    );

}


function closeAllOverlays() {

    document
        .querySelectorAll(
            ".modal-overlay.show"
        )
        .forEach(modal => {

            closeModal(modal);

        });


    closePropertyDropdown();

    closeSidebar();

}


/* =========================================================
   23. WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 760
        ) {

            closeSidebar();

        }

        closePropertyDropdown();

    }
);


/* =========================================================
   24. DEMO LOCAL STORAGE
========================================================= */

function saveDemoOwnerData() {

    localStorage.setItem(
        "roomnestOwner",
        JSON.stringify(
            ownerDashboardData.owner
        )
    );


    localStorage.setItem(
        "roomnestOwnerStats",
        JSON.stringify(
            ownerDashboardData.stats
        )
    );

}


/*
 * Create demo localStorage data only
 * when it does not already exist.
 */

if (
    !localStorage.getItem(
        "roomnestOwner"
    )
) {

    saveDemoOwnerData();

}


/* =========================================================
   25. CONSOLE INFORMATION
========================================================= */

console.log(
    "%cRoomNest Owner Dashboard Loaded",
    "font-weight:700;"
);

console.log(
    "Demo mode: Backend is not connected yet."
);


/* =========================================================
   END OF OWNER DASHBOARD JS
========================================================= */