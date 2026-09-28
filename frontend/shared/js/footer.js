/* =========================================================
   ROOMNEST — SHARED FOOTER
   File: footer.js
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       01. FOOTER
    ===================================================== */

    const footer =
        document.getElementById("rnFooter");


    if (!footer) {
        return;
    }


    /* =====================================================
       02. CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.getElementById(
            "rnFooterYear"
        );


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       03. PUBLIC ROOT
    ===================================================== */

    /*
        Later integration-এর সময়:

        Public page:
        data-public-root="../"

        Student / Owner / Admin:
        data-public-root="../../public/"
    */

    const publicRoot =
        footer.dataset.publicRoot ||
        "../../public/";


    /* =====================================================
       04. ROUTES
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
            "#",

        saved:
            "#",

        privacy:
            "#",

        terms:
            "#",

        faq:
            "#"

    };


    /* =====================================================
       05. USER DATA
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
                "RoomNest user error:",
                error
            );

            return null;

        }

    }


    /* =====================================================
       06. USER PAGE
    ===================================================== */

    function navigateUserPage(route) {

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


        if (route === "saved") {

            if (role === "student") {

                target =
                    `${publicRoot}../../student/saved/saved.html`;

            } else {

                target =
                    `${publicRoot}search/search.html`;

            }

        }


        if (target) {

            window.location.href =
                target;

        }

    }


    /* =====================================================
       07. ROUTE LINKS
    ===================================================== */

    const routeLinks =
        footer.querySelectorAll(
            "[data-route]"
        );


    routeLinks.forEach(link => {

        const route =
            link.dataset.route;


        if (
            route === "dashboard" ||
            route === "profile" ||
            route === "saved"
        ) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    navigateUserPage(
                        route
                    );

                }
            );

            return;
        }


        const target =
            routes[route];


        if (
            target &&
            target !== "#"
        ) {

            link.href =
                target;

        }

    });


    /* =====================================================
       08. EXTERNAL / PLACEHOLDER LINKS
    ===================================================== */

    footer
        .querySelectorAll(
            '[data-route="privacy"],' +
            '[data-route="terms"],' +
            '[data-route="faq"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    /*
                        These pages will be created later.
                    */

                    console.log(
                        "RoomNest:",
                        link.dataset.route,
                        "page will be connected later."
                    );

                }
            );

        });


    /* =====================================================
       09. PUBLIC API
    ===================================================== */

    window.RoomNestFooter = {

        refreshYear: function () {

            if (yearElement) {

                yearElement.textContent =
                    new Date().getFullYear();

            }

        }

    };

})();