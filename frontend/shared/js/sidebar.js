/* =========================================================
   ROOMNEST — SHARED SIDEBAR
   File: sidebar.js
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       01. ELEMENTS
    ===================================================== */

    const sidebar =
        document.getElementById("rnSidebar");

    const overlay =
        document.getElementById("rnSidebarOverlay");

    const closeButton =
        document.getElementById("rnSidebarClose");

    const logoutButton =
        document.getElementById("rnSidebarLogout");


    if (!sidebar) {
        return;
    }


    /* =====================================================
       02. CONFIG
    ===================================================== */

    const publicRoot =
        sidebar.dataset.publicRoot ||
        "../../public/";


    /* =====================================================
       03. ROUTES
    ===================================================== */

    const routes = {

        dashboard: {
            student:
                "../dashboard/dashboard.html",

            owner:
                "../dashboard/dashboard.html",

            admin:
                "../dashboard/dashboard.html"
        },

        properties:
            "../properties/properties.html",

        rooms:
            "../rooms/rooms.html",

        saved:
            "../saved/saved.html",

        inquiries:
            "../inquiries/inquiries.html",

        bookings:
            "../bookings/bookings.html",

        messages:
            "../messages/messages.html",

        notifications:
            "../notifications/notifications.html",

        profile:
            "../profile/profile.html",

        settings:
            "../settings/settings.html",

        "public-home":
            `${publicRoot}home/index.html`

    };


    /* =====================================================
       04. GET USER
    ===================================================== */

    function getUser() {

        try {

            const data =
                localStorage.getItem(
                    "roomnestUser"
                );


            if (!data) {
                return null;
            }


            return JSON.parse(data);

        } catch (error) {

            console.error(
                "RoomNest sidebar user error:",
                error
            );

            return null;

        }

    }


    /* =====================================================
       05. USER UI
    ===================================================== */

    function initializeUser() {

        const user =
            getUser();


        if (!user) {

            updateText(
                "rnSidebarUserName",
                "Guest"
            );

            updateText(
                "rnSidebarUserRole",
                "Guest"
            );

            updateText(
                "rnSidebarAvatar",
                "G"
            );

            return;

        }


        const name =
            user.name ||
            "User";


        const role =
            user.role ||
            "student";


        const firstLetter =
            name
                .trim()
                .charAt(0)
                .toUpperCase();


        updateText(
            "rnSidebarUserName",
            name
        );


        updateText(
            "rnSidebarUserRole",
            role
        );


        updateText(
            "rnSidebarAvatar",
            firstLetter
        );

    }


    function updateText(
        id,
        value
    ) {

        const element =
            document.getElementById(id);


        if (element) {

            element.textContent =
                value;

        }

    }


    /* =====================================================
       06. ACTIVE PAGE
    ===================================================== */

    function setActivePage() {

        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        document
            .querySelectorAll(
                "[data-sidebar-route]"
            )
            .forEach(item => {

                item.classList.remove(
                    "active"
                );


                const route =
                    item.dataset.sidebarRoute;


                if (!route) {
                    return;
                }


                const target =
                    routes[route];


                if (
                    typeof target === "string" &&
                    target
                        .split("/")
                        .pop()
                        .toLowerCase() ===
                    currentPage
                ) {

                    item.classList.add(
                        "active"
                    );

                }

            });

    }


    /* =====================================================
       07. NAVIGATION
    ===================================================== */

    function handleNavigation(event) {

        const item =
            event.currentTarget;


        const route =
            item.dataset.sidebarRoute;


        if (!route) {
            return;
        }


        if (route === "dashboard") {

            const user =
                getUser();


            if (!user) {

                event.preventDefault();

                window.location.href =
                    `${publicRoot}auth/login.html`;

                return;

            }


            const role =
                user.role ||
                "student";


            const target =
                routes.dashboard[role];


            if (target) {

                item.href =
                    target;

            }

            return;

        }


        const target =
            routes[route];


        if (
            target &&
            target !== "#"
        ) {

            item.href =
                target;

        }

    }


    /* =====================================================
       08. OPEN SIDEBAR
    ===================================================== */

    function openSidebar() {

        sidebar.classList.add(
            "open"
        );


        if (overlay) {

            overlay.classList.add(
                "show"
            );

        }


        document.body.classList.add(
            "rn-sidebar-open"
        );

    }


    /* =====================================================
       09. CLOSE SIDEBAR
    ===================================================== */

    function closeSidebar() {

        sidebar.classList.remove(
            "open"
        );


        if (overlay) {

            overlay.classList.remove(
                "show"
            );

        }


        document.body.classList.remove(
            "rn-sidebar-open"
        );

    }


    /* =====================================================
       10. MOBILE TRIGGER
    ===================================================== */

    /*
        Existing dashboard pages can use:

        window.RoomNestSidebar.open();

        Example:

        document
            .getElementById("sidebarToggle")
            .addEventListener(
                "click",
                () => RoomNestSidebar.open()
            );
    */


    /* =====================================================
       11. LOGOUT
    ===================================================== */

    function logout() {

        const confirmed =
            window.confirm(
                "Are you sure you want to logout?"
            );


        if (!confirmed) {
            return;
        }


        localStorage.removeItem(
            "roomnestUser"
        );


        localStorage.removeItem(
            "roomnestAuthToken"
        );


        localStorage.removeItem(
            "roomnestAdminToken"
        );


        closeSidebar();


        window.location.href =
            `${publicRoot}auth/login.html`;

    }


    /* =====================================================
       12. BADGES
    ===================================================== */

    function loadBadges() {

        /*
            Demo values.
            Later these will come from backend/API.
        */

        const inquiryBadge =
            document.getElementById(
                "rnSidebarInquiryBadge"
            );


        const messageBadge =
            document.getElementById(
                "rnSidebarMessageBadge"
            );


        const notificationBadge =
            document.getElementById(
                "rnSidebarNotificationBadge"
            );


        const inquiryCount =
            Number(
                localStorage.getItem(
                    "roomnestUnreadInquiries"
                ) || 0
            );


        const messageCount =
            Number(
                localStorage.getItem(
                    "roomnestUnreadMessages"
                ) || 0
            );


        const notificationCount =
            Number(
                localStorage.getItem(
                    "roomnestUnreadNotifications"
                ) || 0
            );


        setBadge(
            inquiryBadge,
            inquiryCount
        );


        setBadge(
            messageBadge,
            messageCount
        );


        setBadge(
            notificationBadge,
            notificationCount
        );

    }


    function setBadge(
        element,
        count
    ) {

        if (!element) {
            return;
        }


        if (count > 0) {

            element.textContent =
                count > 99
                    ? "99+"
                    : count;

            element.style.display =
                "inline-flex";

        } else {

            element.textContent =
                "";

            element.style.display =
                "none";

        }

    }


    /* =====================================================
       13. EVENTS
    ===================================================== */

    document
        .querySelectorAll(
            "[data-sidebar-route]"
        )
        .forEach(item => {

            item.addEventListener(
                "click",
                handleNavigation
            );


            item.addEventListener(
                "click",
                closeSidebar
            );

        });


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeSidebar
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logout
        );

    }


    /* =====================================================
       14. ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeSidebar();

            }

        }
    );


    /* =====================================================
       15. PUBLIC API
    ===================================================== */

    window.RoomNestSidebar = {

        open:
            openSidebar,

        close:
            closeSidebar,

        refresh:
            function () {

                initializeUser();

                loadBadges();

                setActivePage();

            },

        logout:
            logout

    };


    /* =====================================================
       16. INITIALIZE
    ===================================================== */

    initializeUser();

    loadBadges();

    setActivePage();

})();