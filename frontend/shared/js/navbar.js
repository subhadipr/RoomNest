/* =========================================================
   ROOMNEST — SHARED NAVBAR
   File: navbar.js
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       01. CONFIGURATION
    ===================================================== */

    const navbar = document.getElementById("rnNavbar");

    if (!navbar) {
        return;
    }


    /*
        IMPORTANT:

        Add this attribute to the navbar when integrating it:

        <header
            class="rn-navbar"
            id="rnNavbar"
            data-public-root="../../public/"
        >

        For public pages use:

        data-public-root="../"

        For student / owner / admin pages use:

        data-public-root="../../public/"
    */

    const publicRoot =
        navbar.dataset.publicRoot || "../../public/";


    /* =====================================================
       02. ROUTES
    ===================================================== */

    const routes = {

        home:
            `${publicRoot}home/index.html`,

        search:
            `${publicRoot}search/search.html`,

        "list-property":
            `${publicRoot}auth/register.html?role=owner`,

        about:
            `${publicRoot}about/about.html`,

        contact:
            `${publicRoot}contact/contact.html`,

        login:
            `${publicRoot}auth/login.html`,

        register:
            `${publicRoot}auth/register.html`,

        dashboard:
            "#",

        profile:
            "#"

    };


    /* =====================================================
       03. ELEMENTS
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".rn-nav-link, [data-route]"
        );


    const mobileToggle =
        document.getElementById("rnMobileToggle");


    const navMenu =
        document.getElementById("rnNavMenu");


    const guestActions =
        document.getElementById("rnGuestActions");


    const userArea =
        document.getElementById("rnUserArea");


    const userBtn =
        document.getElementById("rnUserBtn");


    const userDropdown =
        document.getElementById("rnUserDropdown");


    const logoutBtn =
        document.getElementById("rnLogoutBtn");


    /* =====================================================
       04. ACTIVE NAVIGATION
    ===================================================== */

    function setActiveNav() {

        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        document
            .querySelectorAll(".rn-nav-link")
            .forEach(link => {

                link.classList.remove("active");

                const route =
                    link.dataset.route;

                if (!route) {
                    return;
                }


                if (
                    route === "home" &&
                    (
                        currentPage === "" ||
                        currentPage === "index.html"
                    )
                ) {

                    link.classList.add("active");

                }


                if (
                    route === "search" &&
                    currentPage === "search.html"
                ) {

                    link.classList.add("active");

                }


                if (
                    route === "about" &&
                    currentPage === "about.html"
                ) {

                    link.classList.add("active");

                }


                if (
                    route === "contact" &&
                    currentPage === "contact.html"
                ) {

                    link.classList.add("active");

                }

            });

    }


    /* =====================================================
       05. ROUTE HANDLER
    ===================================================== */

    function handleRoute(event) {

        const element =
            event.currentTarget;

        const route =
            element.dataset.route;


        if (!route) {
            return;
        }


        /*
            Dashboard/Profile routes
            are handled separately
        */

        if (
            route === "dashboard" ||
            route === "profile"
        ) {

            event.preventDefault();

            navigateToUserPage(route);

            return;
        }


        const target =
            routes[route];


        if (!target || target === "#") {

            event.preventDefault();

            return;
        }


        element.href = target;

    }


    /* =====================================================
       06. USER DATA
    ===================================================== */

    function getUser() {

        try {

            const user =
                localStorage.getItem(
                    "roomnestUser"
                );


            if (!user) {
                return null;
            }


            return JSON.parse(user);

        } catch (error) {

            console.error(
                "RoomNest user data error:",
                error
            );

            return null;
        }

    }


    /* =====================================================
       07. INITIALIZE USER UI
    ===================================================== */

    function initializeUser() {

        const user = getUser();


        if (!user) {

            if (guestActions) {
                guestActions.style.display =
                    "flex";
            }

            if (userArea) {
                userArea.classList.remove("show");
            }

            return;
        }


        if (guestActions) {
            guestActions.style.display =
                "none";
        }


        if (userArea) {
            userArea.classList.add("show");
        }


        const name =
            user.name ||
            "User";


        const email =
            user.email ||
            "user@example.com";


        const firstLetter =
            name
                .trim()
                .charAt(0)
                .toUpperCase();


        const userAvatar =
            document.getElementById(
                "rnUserAvatar"
            );


        const userName =
            document.getElementById(
                "rnUserName"
            );


        const dropdownAvatar =
            document.getElementById(
                "rnDropdownAvatar"
            );


        const dropdownName =
            document.getElementById(
                "rnDropdownName"
            );


        const dropdownEmail =
            document.getElementById(
                "rnDropdownEmail"
            );


        if (userAvatar) {
            userAvatar.textContent =
                firstLetter;
        }


        if (userName) {
            userName.textContent =
                name;
        }


        if (dropdownAvatar) {
            dropdownAvatar.textContent =
                firstLetter;
        }


        if (dropdownName) {
            dropdownName.textContent =
                name;
        }


        if (dropdownEmail) {
            dropdownEmail.textContent =
                email;
        }

    }


    /* =====================================================
       08. USER PAGE NAVIGATION
    ===================================================== */

    function navigateToUserPage(route) {

        const user =
            getUser();


        if (!user) {

            window.location.href =
                routes.login;

            return;
        }


        const role =
            user.role ||
            "student";


        let target = "";


        if (route === "dashboard") {

            if (role === "owner") {

                target =
                    `${publicRoot}../../owner/dashboard/dashboard.html`;

            } else if (role === "admin") {

                target =
                    `${publicRoot}../../admin/dashboard/dashboard.html`;

            } else {

                target =
                    `${publicRoot}../../student/dashboard/dashboard.html`;

            }

        }


        if (route === "profile") {

            if (role === "owner") {

                target =
                    `${publicRoot}../../owner/profile/profile.html`;

            } else if (role === "admin") {

                target =
                    `${publicRoot}../../admin/settings/settings.html`;

            } else {

                target =
                    `${publicRoot}../../student/profile/profile.html`;

            }

        }


        if (target) {

            window.location.href =
                target;

        }

    }


    /* =====================================================
       09. USER DROPDOWN
    ===================================================== */

    function toggleUserDropdown(event) {

        event.stopPropagation();

        if (!userDropdown) {
            return;
        }


        userDropdown.classList.toggle(
            "show"
        );

    }


    document.addEventListener(
        "click",
        function (event) {

            if (
                userDropdown &&
                userDropdown.classList.contains("show") &&
                !userDropdown.contains(event.target) &&
                !userBtn.contains(event.target)
            ) {

                userDropdown.classList.remove(
                    "show"
                );

            }

        }
    );


    /* =====================================================
       10. MOBILE MENU
    ===================================================== */

    function toggleMobileMenu() {

        if (!navMenu || !mobileToggle) {
            return;
        }


        const isOpen =
            navMenu.classList.toggle("open");


        mobileToggle.classList.toggle(
            "active",
            isOpen
        );


        mobileToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    }


    function closeMobileMenu() {

        if (!navMenu || !mobileToggle) {
            return;
        }


        navMenu.classList.remove(
            "open"
        );


        mobileToggle.classList.remove(
            "active"
        );


        mobileToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    /* =====================================================
       11. LOGOUT
    ===================================================== */

    function logoutUser() {

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


        window.location.href =
            routes.login;

    }


    /* =====================================================
       12. STICKY NAVBAR
    ===================================================== */

    function handleScroll() {

        if (
            window.scrollY > 10
        ) {

            navbar.classList.add(
                "rn-sticky"
            );

        } else {

            navbar.classList.remove(
                "rn-sticky"
            );

        }

    }


    /* =====================================================
       13. EVENTS
    ===================================================== */

    document
        .querySelectorAll(
            "[data-route]"
        )
        .forEach(element => {

            element.addEventListener(
                "click",
                handleRoute
            );

        });


    if (mobileToggle) {

        mobileToggle.addEventListener(
            "click",
            toggleMobileMenu
        );

    }


    document
        .querySelectorAll(".rn-nav-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


    if (userBtn) {

        userBtn.addEventListener(
            "click",
            toggleUserDropdown
        );

    }


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            logoutUser
        );

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    /* =====================================================
       14. INITIALIZE
    ===================================================== */

    setActiveNav();

    initializeUser();

    handleScroll();


    /* =====================================================
       15. PUBLIC API
    ===================================================== */

    window.RoomNestNavbar = {

        refreshUser:
            initializeUser,

        closeMenu:
            closeMobileMenu,

        logout:
            logoutUser

    };

})();