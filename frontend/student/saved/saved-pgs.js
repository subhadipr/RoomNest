/* =========================================================
   ROOMNEST — STUDENT SAVED PGs
   Standalone JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const menuBtn = document.getElementById("menuBtn");

    const searchInput = document.getElementById("searchInput");
    const locationFilter = document.getElementById("locationFilter");
    const typeFilter = document.getElementById("typeFilter");
    const sortFilter = document.getElementById("sortFilter");

    const propertyGrid = document.getElementById("propertyGrid");
    const emptyState = document.getElementById("emptyState");

    const resultCount = document.getElementById("resultCount");

    const totalSaved = document.getElementById("totalSaved");
    const pgCount = document.getElementById("pgCount");
    const roomCount = document.getElementById("roomCount");
    const averageRent = document.getElementById("averageRent");

    const sidebarSavedCount =
        document.getElementById("sidebarSavedCount");

    const clearAllBtn =
        document.getElementById("clearAllBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");


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

        sidebarOverlay.addEventListener("click", () => {

            sidebar.classList.remove("open");

            sidebarOverlay.classList.remove("show");

        });

    }


    /* =====================================================
       GET PROPERTY CARDS
    ===================================================== */

    let properties =
        Array.from(
            document.querySelectorAll(".property-card")
        );


    /* =====================================================
       SAVE INITIAL DATA
    ===================================================== */

    function savePropertiesToStorage() {

        const ids = properties.map(card =>
            card.dataset.id
        );

        localStorage.setItem(
            "roomnestSavedProperties",
            JSON.stringify(ids)
        );

    }


    /* =====================================================
       LOAD SAVED DATA
    ===================================================== */

    function loadSavedProperties() {

        const savedData =
            localStorage.getItem(
                "roomnestSavedProperties"
            );

        if (!savedData) {

            savePropertiesToStorage();

            return;

        }

        let savedIds;

        try {

            savedIds = JSON.parse(savedData);

        } catch (error) {

            savedIds = [];

        }


        properties.forEach(card => {

            const id = card.dataset.id;

            if (!savedIds.includes(id)) {

                card.remove();

            }

        });


        properties =
            Array.from(
                document.querySelectorAll(".property-card")
            );

    }


    loadSavedProperties();


    /* =====================================================
       UPDATE STATISTICS
    ===================================================== */

    function updateStats() {

        properties =
            Array.from(
                document.querySelectorAll(".property-card")
            );


        const pgProperties =
            properties.filter(
                card => card.dataset.type === "PG"
            );


        const roomProperties =
            properties.filter(
                card => card.dataset.type === "Room"
            );


        let totalRent = 0;

        properties.forEach(card => {

            totalRent += Number(card.dataset.rent);

        });


        const average =
            properties.length
                ? Math.round(totalRent / properties.length)
                : 0;


        totalSaved.textContent =
            properties.length;

        pgCount.textContent =
            pgProperties.length;

        roomCount.textContent =
            roomProperties.length;


        averageRent.textContent =
            properties.length
                ? formatCurrency(average)
                : "₹0";


        sidebarSavedCount.textContent =
            properties.length;


        updateVisibleCount();

    }


    /* =====================================================
       CURRENCY
    ===================================================== */

    function formatCurrency(value) {

        return "₹" +
            Number(value).toLocaleString("en-IN");

    }


    /* =====================================================
       FILTER PROPERTIES
    ===================================================== */

    function filterProperties() {

        const searchValue =
            searchInput.value
                .trim()
                .toLowerCase();


        const locationValue =
            locationFilter.value;


        const typeValue =
            typeFilter.value;


        properties.forEach(card => {

            const name =
                card.dataset.name.toLowerCase();

            const location =
                card.dataset.location;

            const type =
                card.dataset.type;


            const matchesSearch =
                name.includes(searchValue) ||
                location
                    .toLowerCase()
                    .includes(searchValue);


            const matchesLocation =
                locationValue === "all" ||
                location === locationValue;


            const matchesType =
                typeValue === "all" ||
                type === typeValue;


            if (
                matchesSearch &&
                matchesLocation &&
                matchesType
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });


        updateVisibleCount();

    }


    /* =====================================================
       UPDATE VISIBLE RESULT COUNT
    ===================================================== */

    function updateVisibleCount() {

        const visible =
            properties.filter(
                card =>
                    card.style.display !== "none"
            );


        resultCount.textContent =
            visible.length;


        if (properties.length === 0) {

            propertyGrid.style.display = "none";

            emptyState.classList.add("show");

        } else {

            propertyGrid.style.display = "";

            if (visible.length === 0) {

                emptyState.classList.add("show");

            } else {

                emptyState.classList.remove("show");

            }

        }

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterProperties
        );

    }


    /* =====================================================
       LOCATION FILTER
    ===================================================== */

    if (locationFilter) {

        locationFilter.addEventListener(
            "change",
            filterProperties
        );

    }


    /* =====================================================
       TYPE FILTER
    ===================================================== */

    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            filterProperties
        );

    }


    /* =====================================================
       SORT
    ===================================================== */

    if (sortFilter) {

        sortFilter.addEventListener(
            "change",
            sortProperties
        );

    }


    function sortProperties() {

        const sortValue =
            sortFilter.value;


        const sorted =
            [...properties];


        if (sortValue === "low") {

            sorted.sort(
                (a, b) =>
                    Number(a.dataset.rent) -
                    Number(b.dataset.rent)
            );

        }


        else if (sortValue === "high") {

            sorted.sort(
                (a, b) =>
                    Number(b.dataset.rent) -
                    Number(a.dataset.rent)
            );

        }


        else if (sortValue === "rating") {

            sorted.sort(
                (a, b) =>
                    Number(b.dataset.rating) -
                    Number(a.dataset.rating)
            );

        }


        else {

            sorted.sort(
                (a, b) =>
                    Number(b.dataset.date) -
                    Number(a.dataset.date)
            );

        }


        sorted.forEach(card => {

            propertyGrid.appendChild(card);

        });


        filterProperties();

    }


    /* =====================================================
       REMOVE SINGLE PROPERTY
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            const heart =
                event.target.closest(".heart-btn");


            if (!heart) return;


            const propertyId =
                heart.dataset.id;


            const card =
                document.querySelector(
                    `.property-card[data-id="${propertyId}"]`
                );


            if (!card) return;


            /* Remove card */

            card.remove();


            properties =
                Array.from(
                    document.querySelectorAll(".property-card")
                );


            /* Update localStorage */

            const savedIds =
                properties.map(
                    item => item.dataset.id
                );


            localStorage.setItem(
                "roomnestSavedProperties",
                JSON.stringify(savedIds)
            );


            updateStats();


            showToast(
                "Removed",
                "Property removed from your saved list."
            );

        }
    );


    /* =====================================================
       CLEAR ALL
    ===================================================== */

    if (clearAllBtn) {

        clearAllBtn.addEventListener(
            "click",
            () => {

                if (properties.length === 0) {

                    showToast(
                        "Nothing to clear",
                        "Your saved list is already empty."
                    );

                    return;

                }


                const confirmed =
                    confirm(
                        "Are you sure you want to remove all saved properties?"
                    );


                if (!confirmed) return;


                properties.forEach(card => {

                    card.remove();

                });


                properties = [];


                localStorage.setItem(
                    "roomnestSavedProperties",
                    JSON.stringify([])
                );


                updateStats();


                showToast(
                    "Cleared",
                    "All saved properties were removed."
                );

            }
        );

    }


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


        toastTitle.textContent = title;

        toastMessage.textContent = message;


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

    if (logoutBtn) {

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

    }


    /* =====================================================
       INITIAL UPDATE
    ===================================================== */

    updateStats();

});