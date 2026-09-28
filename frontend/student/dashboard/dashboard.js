/* =========================================================
   ROOMNEST — STUDENT DASHBOARD JS
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const sidebar =
    document.getElementById("studentSidebar");

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");

const logoutBtn =
    document.getElementById("logoutBtn");

const notificationBtn =
    document.getElementById("notificationBtn");

const toast =
    document.getElementById("studentToast");

const toastMessage =
    document.getElementById("toastMessage");


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

mobileMenuBtn.addEventListener("click", () => {

    sidebar.classList.add("open");

    sidebarOverlay.classList.add("show");

});


sidebarOverlay.addEventListener("click", () => {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("show");

});


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);

}


/* =========================================================
   NOTIFICATION
========================================================= */

notificationBtn.addEventListener("click", () => {

    showToast(
        "You have 5 unread notifications."
    );

});


/* =========================================================
   BOOKING DETAILS
========================================================= */

const bookingDetailsBtn =
    document.getElementById("bookingDetailsBtn");


bookingDetailsBtn.addEventListener("click", () => {

    window.location.href =
        "../bookings/bookings.html";

});


/* =========================================================
   HEART BUTTONS
========================================================= */

const heartButtons =
    document.querySelectorAll(".heart-btn");


heartButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

        if (button.classList.contains("active")) {

            button.textContent = "♥";

            showToast(
                "Property added to saved list."
            );

        } else {

            button.textContent = "♡";

            showToast(
                "Property removed from saved list."
            );

        }

    });

});


/* =========================================================
   RECOMMENDED PROPERTY
========================================================= */

const viewPropertyButtons =
    document.querySelectorAll(
        ".view-property-btn"
    );


viewPropertyButtons.forEach(button => {

    button.addEventListener("click", () => {

        const propertyName =
            button.dataset.property;


        showToast(
            `${propertyName} details will open here.`
        );

    });

});


/* =========================================================
   LOGOUT
========================================================= */

logoutBtn.addEventListener("click", () => {

    const confirmed =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmed) return;


    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentUser");


    window.location.href =
        "../../public/auth/login.html";

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const navItems =
    document.querySelectorAll(".nav-item");


navItems.forEach(item => {

    item.addEventListener("click", () => {

        navItems.forEach(nav => {

            nav.classList.remove("active");

        });


        item.classList.add("active");

    });

});


/* =========================================================
   INITIAL LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "RoomNest Student Dashboard loaded successfully."
        );

    }
);