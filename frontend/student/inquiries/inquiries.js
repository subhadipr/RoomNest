/* =========================================================
   ROOMNEST — STUDENT INQUIRIES
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

    const inquiryList =
        document.getElementById("inquiryList");

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

    const totalInquiries =
        document.getElementById("totalInquiries");

    const pendingCount =
        document.getElementById("pendingCount");

    const repliedCount =
        document.getElementById("repliedCount");

    const closedCount =
        document.getElementById("closedCount");

    const inquiryBadge =
        document.getElementById("inquiryBadge");

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


    /* =====================================================
       INQUIRY DATA
    ===================================================== */

    const inquiryMessages = {

        "1":
            "Is a double sharing room available from next month?",

        "2":
            "I want to know about food and security facilities.",

        "3":
            "Can I visit the property this weekend?",

        "4":
            "Is the single room available for students?",

        "5":
            "I was looking for a single room near the college."

    };


    let currentInquiryId = null;


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    if (menuBtn) {

        menuBtn.addEventListener("click", () => {

            sidebar.classList.add("open");

            sidebarOverlay.classList.add("show");

        });

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener("click", closeSidebar);

    }


    function closeSidebar() {

        sidebar.classList.remove("open");

        sidebarOverlay.classList.remove("show");

    }


    /* =====================================================
       GET INQUIRY CARDS
    ===================================================== */

    let cards =
        Array.from(
            document.querySelectorAll(".inquiry-card")
        );


    /* =====================================================
       UPDATE STATS
    ===================================================== */

    function updateStats() {

        cards =
            Array.from(
                document.querySelectorAll(".inquiry-card")
            );


        let pending = 0;
        let replied = 0;
        let closed = 0;


        cards.forEach(card => {

            const status =
                card.dataset.status;


            if (status === "pending") {

                pending++;

            }

            else if (status === "replied") {

                replied++;

            }

            else if (status === "closed") {

                closed++;

            }

        });


        totalInquiries.textContent =
            cards.length;

        pendingCount.textContent =
            pending;

        repliedCount.textContent =
            replied;

        closedCount.textContent =
            closed;

        inquiryBadge.textContent =
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
       STATUS FILTER
    ===================================================== */

    statusFilter.addEventListener(
        "change",
        applyFilters
    );


    /* =====================================================
       TYPE FILTER
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

                inquiryList.appendChild(card);

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
                `.inquiry-card[data-id="${id}"]`
            );


        if (!card) return;


        currentInquiryId = id;


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
            "detailRent"
        ).textContent =
            "₹" +
            Number(
                getRentFromCard(card)
            ).toLocaleString("en-IN") +
            "/month";


        document.getElementById(
            "detailStatus"
        ).textContent =
            capitalize(
                card.dataset.status
            );


        document.getElementById(
            "detailMessage"
        ).textContent =
            inquiryMessages[id] ||
            "No message available.";


        detailsModal.classList.add("show");

        document.body.style.overflow = "hidden";

    }


    /* =====================================================
       GET RENT
    ===================================================== */

    function getRentFromCard(card) {

        const rentText =
            card.querySelector(
                ".inquiry-meta span:nth-child(2)"
            );


        if (!rentText) return 0;


        const value =
            rentText.textContent
                .replace(/[^\d]/g, "");


        return value || 0;

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

        currentInquiryId = null;

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
                event.target.closest(".message-btn");


            if (!button) return;


            const id =
                button.dataset.id;


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


    /* MODAL MESSAGE */

    modalMessageBtn.addEventListener(
        "click",
        () => {

            if (!currentInquiryId) return;


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
       CANCEL INQUIRY
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(".cancel-btn");


            if (!button) return;


            const id =
                button.dataset.id;


            const card =
                document.querySelector(
                    `.inquiry-card[data-id="${id}"]`
                );


            if (!card) return;


            const propertyName =
                card.dataset.name;


            const confirmed =
                confirm(
                    `Cancel inquiry for "${propertyName}"?`
                );


            if (!confirmed) return;


            card.remove();


            cards =
                Array.from(
                    document.querySelectorAll(
                        ".inquiry-card"
                    )
                );


            updateStats();


            showToast(
                "Inquiry Cancelled",
                "Your inquiry has been cancelled."
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