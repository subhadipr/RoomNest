/* =========================================================
   ROOMNEST — STUDENT BOOKINGS
   Standalone JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const sidebar =
        document.getElementById("sidebar");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");

    const menuBtn =
        document.getElementById("menuBtn");

    const bookingList =
        document.getElementById("bookingList");

    const searchInput =
        document.getElementById("searchInput");

    const statusFilter =
        document.getElementById("statusFilter");

    const typeFilter =
        document.getElementById("typeFilter");

    const sortFilter =
        document.getElementById("sortFilter");

    const resultCount =
        document.getElementById("resultCount");

    const emptyState =
        document.getElementById("emptyState");

    const totalBookings =
        document.getElementById("totalBookings");

    const upcomingCount =
        document.getElementById("upcomingCount");

    const confirmedCount =
        document.getElementById("confirmedCount");

    const cancelledCount =
        document.getElementById("cancelledCount");

    const bookingBadge =
        document.getElementById("bookingBadge");

    const detailsModal =
        document.getElementById("detailsModal");

    const detailsClose =
        document.getElementById("detailsClose");

    const modalCloseBtn =
        document.getElementById("modalCloseBtn");

    const modalMessageBtn =
        document.getElementById("modalMessageBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");


    let currentBookingId = null;


    /* =====================================================
       GET CARDS
    ===================================================== */

    let cards =
        Array.from(
            document.querySelectorAll(".booking-card")
        );


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    menuBtn.addEventListener("click", () => {

        sidebar.classList.add("open");

        sidebarOverlay.classList.add("show");

    });


    sidebarOverlay.addEventListener(
        "click",
        closeSidebar
    );


    function closeSidebar() {

        sidebar.classList.remove("open");

        sidebarOverlay.classList.remove("show");

    }


    /* =====================================================
       UPDATE STATISTICS
    ===================================================== */

    function updateStats() {

        cards =
            Array.from(
                document.querySelectorAll(".booking-card")
            );


        let upcoming = 0;
        let confirmed = 0;
        let cancelled = 0;


        cards.forEach(card => {

            const status =
                card.dataset.status;


            if (status === "upcoming") {

                upcoming++;

            }


            if (status === "confirmed") {

                confirmed++;

            }


            if (status === "cancelled") {

                cancelled++;

            }

        });


        totalBookings.textContent =
            cards.length;

        upcomingCount.textContent =
            upcoming;

        confirmedCount.textContent =
            confirmed;

        cancelledCount.textContent =
            cancelled;

        bookingBadge.textContent =
            cards.length;


        updateResultCount();

    }


    /* =====================================================
       FILTER
    ===================================================== */

    function applyFilters() {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        const selectedStatus =
            statusFilter.value;


        const selectedType =
            typeFilter.value;


        cards.forEach(card => {

            const name =
                card.dataset.name.toLowerCase();

            const location =
                card.dataset.location.toLowerCase();

            const type =
                card.dataset.type;

            const status =
                card.dataset.status;


            const searchMatch =
                name.includes(search) ||
                location.includes(search);


            const statusMatch =
                selectedStatus === "all" ||
                status === selectedStatus;


            const typeMatch =
                selectedType === "all" ||
                type === selectedType;


            if (
                searchMatch &&
                statusMatch &&
                typeMatch
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });


        updateResultCount();

    }


    /* =====================================================
       RESULT COUNT
    ===================================================== */

    function updateResultCount() {

        const visibleCards =
            cards.filter(
                card =>
                    card.style.display !== "none"
            );


        resultCount.textContent =
            visibleCards.length;


        if (visibleCards.length === 0) {

            emptyState.classList.add("show");

        } else {

            emptyState.classList.remove("show");

        }

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    searchInput.addEventListener(
        "input",
        applyFilters
    );


    /* =====================================================
       STATUS
    ===================================================== */

    statusFilter.addEventListener(
        "change",
        applyFilters
    );


    /* =====================================================
       TYPE
    ===================================================== */

    typeFilter.addEventListener(
        "change",
        applyFilters
    );


    /* =====================================================
       SORT
    ===================================================== */

    sortFilter.addEventListener(
        "change",
        () => {

            const sortValue =
                sortFilter.value;


            const sortedCards =
                [...cards];


            if (sortValue === "latest") {

                sortedCards.sort(
                    (a, b) =>
                        Number(b.dataset.date) -
                        Number(a.dataset.date)
                );

            }


            if (sortValue === "oldest") {

                sortedCards.sort(
                    (a, b) =>
                        Number(a.dataset.date) -
                        Number(b.dataset.date)
                );

            }


            sortedCards.forEach(card => {

                bookingList.appendChild(card);

            });


            applyFilters();

        }
    );


    /* =====================================================
       VIEW DETAILS
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(".view-btn");


            if (!button) return;


            const id =
                button.dataset.id;


            openDetails(id);

        }
    );


    function openDetails(id) {

        const card =
            document.querySelector(
                `.booking-card[data-id="${id}"]`
            );


        if (!card) return;


        currentBookingId = id;


        const bookingId =
            card.querySelector(
                ".booking-details div:first-child strong"
            );


        document.getElementById(
            "detailProperty"
        ).textContent =
            card.dataset.name;


        document.getElementById(
            "detailLocation"
        ).textContent =
            card.dataset.location;


        document.getElementById(
            "detailType"
        ).textContent =
            card.dataset.type;


        document.getElementById(
            "detailBookingId"
        ).textContent =
            bookingId
                ? bookingId.textContent
                : "-";


        document.getElementById(
            "detailBookingDate"
        ).textContent =
            card.dataset.booking;


        document.getElementById(
            "detailMoveIn"
        ).textContent =
            card.dataset.movein;


        document.getElementById(
            "detailRent"
        ).textContent =
            "₹" +
            Number(
                card.dataset.rent
            ).toLocaleString("en-IN") +
            "/month";


        document.getElementById(
            "detailStatus"
        ).textContent =
            capitalize(
                card.dataset.status
            );


        detailsModal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       CAPITALIZE
    ===================================================== */

    function capitalize(value) {

        return value.charAt(0).toUpperCase() +
            value.slice(1);

    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeDetails() {

        detailsModal.classList.remove("show");

        document.body.style.overflow = "";

        currentBookingId = null;

    }


    detailsClose.addEventListener(
        "click",
        closeDetails
    );


    modalCloseBtn.addEventListener(
        "click",
        closeDetails
    );


    detailsModal.addEventListener(
        "click",
        event => {

            if (
                event.target === detailsModal
            ) {

                closeDetails();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeDetails();

            }

        }
    );


    /* =====================================================
       MESSAGE OWNER
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".message-btn"
                );


            if (!button) return;


            showToast(
                "Message",
                "Opening owner messages..."
            );


            setTimeout(() => {

                window.location.href =
                    "../messages/messages.html";

            }, 700);

        }
    );


    modalMessageBtn.addEventListener(
        "click",
        () => {

            if (!currentBookingId) return;


            closeDetails();


            showToast(
                "Message",
                "Opening owner messages..."
            );


            setTimeout(() => {

                window.location.href =
                    "../messages/messages.html";

            }, 700);

        }
    );


    /* =====================================================
       CANCEL BOOKING
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".cancel-btn"
                );


            if (!button) return;


            const id =
                button.dataset.id;


            const card =
                document.querySelector(
                    `.booking-card[data-id="${id}"]`
                );


            if (!card) return;


            const propertyName =
                card.dataset.name;


            const confirmed =
                confirm(
                    `Cancel booking for "${propertyName}"?`
                );


            if (!confirmed) return;


            card.dataset.status =
                "cancelled";


            const statusElement =
                card.querySelector(".status");


            if (statusElement) {

                statusElement.textContent =
                    "Cancelled";

                statusElement.className =
                    "status cancelled";

            }


            button.remove();


            const actionContainer =
                card.querySelector(
                    ".booking-actions"
                );


            if (actionContainer) {

                const viewButton =
                    actionContainer.querySelector(
                        ".view-btn"
                    );


                actionContainer.innerHTML = "";


                if (viewButton) {

                    actionContainer.appendChild(
                        viewButton
                    );

                }

            }


            updateStats();


            showToast(
                "Booking Cancelled",
                "Your booking has been cancelled."
            );

        }
    );


    /* =====================================================
       REVIEW
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".review-btn"
                );


            if (!button) return;


            showToast(
                "Review",
                "Review feature will be connected later."
            );

        }
    );


    /* =====================================================
       TOAST
    ===================================================== */

    let toastTimer;


    function showToast(title, message) {

        const toast =
            document.getElementById("toast");

        const toastTitle =
            document.getElementById("toastTitle");

        const toastMessage =
            document.getElementById("toastMessage");


        toastTitle.textContent =
            title;

        toastMessage.textContent =
            message;


        toast.classList.add("show");


        clearTimeout(toastTimer);


        toastTimer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 3000);

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    logoutBtn.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmed) return;


            localStorage.removeItem(
                "roomnestStudentToken"
            );

            localStorage.removeItem(
                "roomnestStudent"
            );


            showToast(
                "Logged Out",
                "You have been logged out."
            );


            setTimeout(() => {

                window.location.href =
                    "../../public/auth/login.html";

            }, 1000);

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateStats();

    applyFilters();

});