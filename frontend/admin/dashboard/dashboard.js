/* =========================================================
   ROOMNEST — ADMIN DASHBOARD
   File: dashboard.js
========================================================= */

"use strict";


/* =========================================================
   01. DOM ELEMENTS
========================================================= */

const sidebar = document.getElementById("adminSidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const logoutBtn = document.getElementById("logoutBtn");

const adminSearch = document.getElementById("adminSearch");

const notificationBtn =
    document.getElementById("notificationBtn");

const currentYear =
    document.getElementById("currentYear");


/* =========================================================
   02. CURRENT YEAR
========================================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   03. SIDEBAR TOGGLE
========================================================= */

function openSidebar() {

    if (!sidebar) return;

    sidebar.classList.add("sidebar-open");

    if (sidebarOverlay) {
        sidebarOverlay.classList.add("active");
    }

    document.body.style.overflow = "hidden";
}


function closeSidebar() {

    if (!sidebar) return;

    sidebar.classList.remove("sidebar-open");

    if (sidebarOverlay) {
        sidebarOverlay.classList.remove("active");
    }

    document.body.style.overflow = "";
}


if (sidebarToggle) {

    sidebarToggle.addEventListener(
        "click",
        function () {

            if (sidebar.classList.contains("sidebar-open")) {
                closeSidebar();
            } else {
                openSidebar();
            }

        }
    );

}


if (sidebarOverlay) {

    sidebarOverlay.addEventListener(
        "click",
        closeSidebar
    );

}


/* =========================================================
   04. CLOSE SIDEBAR AFTER NAVIGATION
========================================================= */

const navigationLinks =
    document.querySelectorAll(".admin-nav-link");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (window.innerWidth <= 768) {
            closeSidebar();
        }

    });

});


/* =========================================================
   05. ACTIVE NAVIGATION
========================================================= */

const currentPage =
    window.location.pathname.split("/").pop();

navigationLinks.forEach(function (link) {

    const linkPage =
        link.getAttribute("href")?.split("/").pop();

    if (
        linkPage &&
        linkPage === currentPage &&
        !link.classList.contains("logout-btn")
    ) {

        navigationLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");

    }

});


/* =========================================================
   06. ADMIN SEARCH
========================================================= */

if (adminSearch) {

    adminSearch.addEventListener(
        "input",
        function () {

            const searchValue =
                this.value.trim().toLowerCase();

            const rows =
                document.querySelectorAll(
                    ".admin-table tbody tr"
                );

            rows.forEach(function (row) {

                const rowText =
                    row.textContent.toLowerCase();

                if (
                    searchValue === "" ||
                    rowText.includes(searchValue)
                ) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        }
    );

}


/* =========================================================
   07. NOTIFICATION BUTTON
========================================================= */

if (notificationBtn) {

    notificationBtn.addEventListener(
        "click",
        function () {

            showAdminToast(
                "You have 12 new notifications.",
                "info"
            );

        }
    );

}


/* =========================================================
   08. PENDING REVIEW BUTTONS
========================================================= */

const reviewButtons =
    document.querySelectorAll(".small-review-btn");

reviewButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const propertyName =
                this.closest(".pending-item")
                    ?.querySelector(".pending-info strong")
                    ?.textContent
                    .trim();

            if (propertyName) {

                showAdminToast(
                    `Opening review for ${propertyName}`,
                    "info"
                );

                setTimeout(function () {

                    window.location.href =
                        "../pending/pending-properties.html";

                }, 600);

            }

        }
    );

});


/* =========================================================
   09. LOGOUT
========================================================= */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            const confirmLogout =
                window.confirm(
                    "Are you sure you want to logout?"
                );

            if (!confirmLogout) {
                return;
            }


            /*
             * Later, when authentication is connected,
             * we will clear the real admin token here.
             */

            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminUser");

            showAdminToast(
                "Logging out...",
                "info"
            );


            setTimeout(function () {

                window.location.href =
                    "../../public/auth/login.html";

            }, 700);

        }
    );

}


/* =========================================================
   10. TOAST SYSTEM
========================================================= */

function showAdminToast(message, type = "info") {

    const existingToast =
        document.querySelector(".admin-toast");

    if (existingToast) {
        existingToast.remove();
    }


    const toast =
        document.createElement("div");

    toast.className =
        `admin-toast admin-toast-${type}`;


    let icon = "fa-circle-info";

    if (type === "success") {
        icon = "fa-circle-check";
    }

    if (type === "error") {
        icon = "fa-circle-xmark";
    }

    if (type === "warning") {
        icon = "fa-triangle-exclamation";
    }


    toast.innerHTML = `

        <div class="admin-toast-icon">

            <i class="fa-solid ${icon}"></i>

        </div>

        <span>
            ${message}
        </span>

        <button
            type="button"
            class="admin-toast-close"
            aria-label="Close notification">

            <i class="fa-solid fa-xmark"></i>

        </button>

    `;


    document.body.appendChild(toast);


    requestAnimationFrame(function () {

        toast.classList.add("show");

    });


    const closeButton =
        toast.querySelector(".admin-toast-close");

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                removeToast(toast);

            }
        );

    }


    setTimeout(function () {

        removeToast(toast);

    }, 3500);

}


function removeToast(toast) {

    if (!toast) return;

    toast.classList.remove("show");

    setTimeout(function () {

        toast.remove();

    }, 300);

}


/* =========================================================
   11. TOAST CSS
========================================================= */

const toastStyle =
    document.createElement("style");

toastStyle.textContent = `

    .admin-toast {

        position: fixed;

        right: 25px;
        bottom: 25px;

        z-index: 9999;

        min-width: 280px;
        max-width: 380px;

        display: flex;
        align-items: center;

        gap: 10px;

        padding: 13px 14px;

        background: #ffffff;

        border: 1px solid #e6eaf0;

        border-radius: 10px;

        box-shadow:
            0 12px 35px rgba(20, 35, 50, 0.15);

        color: #172033;

        font-size: 12px;
        font-weight: 600;

        transform: translateY(20px);

        opacity: 0;

        transition:
            opacity 0.3s ease,
            transform 0.3s ease;

    }


    .admin-toast.show {

        opacity: 1;

        transform: translateY(0);

    }


    .admin-toast-icon {

        width: 31px;
        height: 31px;

        flex-shrink: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 8px;

        background: #e9f8f4;

        color: #0fa88a;

    }


    .admin-toast-warning
    .admin-toast-icon {

        background: #fff4df;
        color: #d9911e;

    }


    .admin-toast-error
    .admin-toast-icon {

        background: #ffeded;
        color: #d95353;

    }


    .admin-toast-success
    .admin-toast-icon {

        background: #e9f8f1;
        color: #159570;

    }


    .admin-toast > span {

        flex: 1;

    }


    .admin-toast-close {

        width: 25px;
        height: 25px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 6px;

        background: transparent;

        color: #98a1b2;

        cursor: pointer;

    }


    .admin-toast-close:hover {

        background: #f4f6f8;

        color: #172033;

    }


    @media (max-width: 480px) {

        .admin-toast {

            left: 15px;
            right: 15px;

            bottom: 15px;

            min-width: 0;

        }

    }

`;

document.head.appendChild(toastStyle);


/* =========================================================
   12. WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (window.innerWidth > 768) {
            closeSidebar();
        }

    }
);


/* =========================================================
   13. ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {
            closeSidebar();
        }

    }
);


/* =========================================================
   14. PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "RoomNest Admin Dashboard loaded successfully."
        );

    }
);