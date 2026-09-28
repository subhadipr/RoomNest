/* =========================================================
   ROOMNEST — OWNER PROPERTIES
   Standalone Property Management JS
========================================================= */


/* =========================================================
   01. DEMO DATA
========================================================= */

const defaultProperties = [
    {
        id: 1,
        title: "Green View Premium PG",
        type: "PG",
        status: "active",
        location: "Salt Lake, Kolkata",
        rent: 8500,
        rooms: 18,
        available: 6,
        rating: 4.8,
        reviews: 42,
        created: "2026-08-12",
        image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=80",
        description:
            "Premium PG accommodation with furnished rooms, Wi-Fi, food service, security and easy access to nearby colleges and offices."
    },

    {
        id: 2,
        title: "Lake Town Comfort Rooms",
        type: "Room",
        status: "active",
        location: "Lake Town, Kolkata",
        rent: 7200,
        rooms: 12,
        available: 3,
        rating: 4.6,
        reviews: 31,
        created: "2026-08-28",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
        description:
            "Comfortable private rooms suitable for students and working professionals. Furnished rooms with attached facilities."
    },

    {
        id: 3,
        title: "CityNest Student PG",
        type: "PG",
        status: "pending",
        location: "New Town, Kolkata",
        rent: 6800,
        rooms: 20,
        available: 9,
        rating: 4.5,
        reviews: 19,
        created: "2026-09-02",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80",
        description:
            "Student-friendly PG located close to educational institutions and public transport."
    },

    {
        id: 4,
        title: "Urban Living Flat",
        type: "Flat",
        status: "active",
        location: "Ballygunge, Kolkata",
        rent: 14500,
        rooms: 3,
        available: 1,
        rating: 4.9,
        reviews: 27,
        created: "2026-07-19",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80",
        description:
            "Modern residential flat with spacious rooms, kitchen and living area. Ideal for small groups."
    },

    {
        id: 5,
        title: "College Road Boys PG",
        type: "PG",
        status: "inactive",
        location: "Garia, Kolkata",
        rent: 6000,
        rooms: 14,
        available: 0,
        rating: 4.3,
        reviews: 16,
        created: "2026-06-20",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
        description:
            "Affordable boys PG with basic facilities and convenient transport connections."
    },

    {
        id: 6,
        title: "Metro Stay Rooms",
        type: "Room",
        status: "active",
        location: "Dum Dum, Kolkata",
        rent: 7800,
        rooms: 10,
        available: 2,
        rating: 4.7,
        reviews: 22,
        created: "2026-08-05",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
        description:
            "Clean and furnished rooms near metro connectivity with essential amenities."
    }
];


/* =========================================================
   02. STATE
========================================================= */

let properties = [];

let selectedDeleteId = null;

let toastTimer = null;


/* =========================================================
   03. DOM
========================================================= */

const propertyGrid =
    document.getElementById("propertyGrid");

const emptyState =
    document.getElementById("emptyState");

const propertySearch =
    document.getElementById("propertySearch");

const statusFilter =
    document.getElementById("statusFilter");

const typeFilter =
    document.getElementById("typeFilter");

const locationFilter =
    document.getElementById("locationFilter");

const sortFilter =
    document.getElementById("sortFilter");

const resultCount =
    document.getElementById("resultCount");

const totalProperties =
    document.getElementById("totalProperties");

const activeProperties =
    document.getElementById("activeProperties");

const pendingProperties =
    document.getElementById("pendingProperties");

const inactiveProperties =
    document.getElementById("inactiveProperties");

const propertyNavCount =
    document.getElementById("propertyNavCount");


/* =========================================================
   04. INIT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadProperties();

    setupOwnerInfo();

    populateLocationFilter();

    renderProperties();

    setupEvents();

});


/* =========================================================
   05. LOAD PROPERTIES
========================================================= */

function loadProperties() {

    const saved =
        localStorage.getItem("roomnestOwnerProperties");

    if (saved) {

        try {

            properties = JSON.parse(saved);

        } catch (error) {

            console.error(
                "Could not read saved properties:",
                error
            );

            properties = [...defaultProperties];
        }

    } else {

        properties = [...defaultProperties];

        saveProperties();
    }

}


/* =========================================================
   06. SAVE
========================================================= */

function saveProperties() {

    localStorage.setItem(
        "roomnestOwnerProperties",
        JSON.stringify(properties)
    );

}


/* =========================================================
   07. OWNER INFO
========================================================= */

function setupOwnerInfo() {

    const savedOwner =
        localStorage.getItem("roomnestOwner");

    if (!savedOwner) return;

    try {

        const owner =
            JSON.parse(savedOwner);

        const name =
            owner.name || "Arindam Roy";

        const sidebarName =
            document.getElementById(
                "sidebarOwnerName"
            );

        const topName =
            document.getElementById(
                "topOwnerName"
            );

        if (sidebarName) {
            sidebarName.textContent = name;
        }

        if (topName) {
            topName.textContent = name;
        }

        const initials =
            getInitials(name);

        document
            .querySelectorAll(".owner-avatar, .top-avatar")
            .forEach(element => {
                element.textContent = initials;
            });

    } catch (error) {

        console.error(error);

    }

}


function getInitials(name) {

    return name
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();

}


/* =========================================================
   08. LOCATION FILTER
========================================================= */

function populateLocationFilter() {

    const locations = [
        ...new Set(
            properties.map(property =>
                property.location
            )
        )
    ];

    locations.sort();

    locationFilter.innerHTML =
        `<option value="all">All Locations</option>`;

    locations.forEach(location => {

        const option =
            document.createElement("option");

        option.value = location;

        option.textContent = location;

        locationFilter.appendChild(option);

    });

}


/* =========================================================
   09. RENDER
========================================================= */

function renderProperties() {

    updateStats();

    const filtered =
        getFilteredProperties();

    resultCount.textContent =
        filtered.length;

    propertyGrid.innerHTML = "";

    if (filtered.length === 0) {

        emptyState.classList.add("show");

        return;
    }

    emptyState.classList.remove("show");

    filtered.forEach(property => {

        propertyGrid.appendChild(
            createPropertyCard(property)
        );

    });

}


/* =========================================================
   10. FILTER
========================================================= */

function getFilteredProperties() {

    const search =
        propertySearch.value
            .trim()
            .toLowerCase();

    const status =
        statusFilter.value;

    const type =
        typeFilter.value;

    const location =
        locationFilter.value;

    const sort =
        sortFilter.value;


    let filtered =
        properties.filter(property => {

            const matchesSearch =
                !search ||
                property.title
                    .toLowerCase()
                    .includes(search) ||
                property.location
                    .toLowerCase()
                    .includes(search) ||
                property.type
                    .toLowerCase()
                    .includes(search);

            const matchesStatus =
                status === "all" ||
                property.status === status;

            const matchesType =
                type === "all" ||
                property.type === type;

            const matchesLocation =
                location === "all" ||
                property.location === location;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesType &&
                matchesLocation
            );

        });


    filtered.sort((a, b) => {

        if (sort === "newest") {

            return new Date(b.created) -
                   new Date(a.created);

        }

        if (sort === "oldest") {

            return new Date(a.created) -
                   new Date(b.created);

        }

        if (sort === "rent-low") {

            return a.rent - b.rent;

        }

        if (sort === "rent-high") {

            return b.rent - a.rent;

        }

        if (sort === "rating") {

            return b.rating - a.rating;

        }

        return 0;

    });


    return filtered;

}


/* =========================================================
   11. CREATE PROPERTY CARD
========================================================= */

function createPropertyCard(property) {

    const card =
        document.createElement("article");

    card.className = "property-card";

    const statusText =
        property.status === "active"
            ? "Active"
            : property.status === "pending"
                ? "Pending Approval"
                : "Inactive";


    card.innerHTML = `

        <div class="property-image">

            <img
                src="${property.image}"
                alt="${escapeHTML(property.title)}"
                loading="lazy"
                onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80'"
            >

            <span class="property-status ${property.status}">
                ${statusText}
            </span>

            <button
                class="property-menu"
                data-action="menu"
                data-id="${property.id}"
                title="Property options"
            >
                ⋮
            </button>

        </div>


        <div class="property-info">

            <span class="property-type">
                ${escapeHTML(property.type)}
            </span>

            <h3 class="property-title">
                ${escapeHTML(property.title)}
            </h3>

            <div class="property-location">
                <span>📍</span>
                <span>
                    ${escapeHTML(property.location)}
                </span>
            </div>


            <div class="property-meta">

                <div class="meta-item">
                    <strong>
                        ${property.rooms}
                    </strong>
                    <span>
                        Rooms
                    </span>
                </div>

                <div class="meta-item">
                    <strong>
                        ${property.available}
                    </strong>
                    <span>
                        Available
                    </span>
                </div>

                <div class="meta-item">
                    <strong>
                        ${property.reviews}
                    </strong>
                    <span>
                        Reviews
                    </span>
                </div>

            </div>


            <div class="property-bottom">

                <div class="rent">
                    <strong>
                        ₹${formatNumber(property.rent)}
                    </strong>

                    <span>
                        / month
                    </span>
                </div>

                <div class="rating">
                    ⭐ ${property.rating}
                </div>

            </div>

        </div>


        <div class="property-actions">

            <button
                class="card-btn"
                data-action="view"
                data-id="${property.id}"
            >
                View
            </button>

            <button
                class="card-btn edit"
                data-action="edit"
                data-id="${property.id}"
            >
                Edit
            </button>

            <button
                class="card-btn delete"
                data-action="delete"
                data-id="${property.id}"
                title="Delete"
            >
                🗑
            </button>

        </div>
    `;


    return card;

}


/* =========================================================
   12. STATS
========================================================= */

function updateStats() {

    const total =
        properties.length;

    const active =
        properties.filter(
            property =>
                property.status === "active"
        ).length;

    const pending =
        properties.filter(
            property =>
                property.status === "pending"
        ).length;

    const inactive =
        properties.filter(
            property =>
                property.status === "inactive"
        ).length;


    totalProperties.textContent =
        total;

    activeProperties.textContent =
        active;

    pendingProperties.textContent =
        pending;

    inactiveProperties.textContent =
        inactive;

    propertyNavCount.textContent =
        total;

}


/* =========================================================
   13. EVENT SETUP
========================================================= */

function setupEvents() {


    /* SEARCH */

    propertySearch.addEventListener(
        "input",
        renderProperties
    );


    /* FILTERS */

    statusFilter.addEventListener(
        "change",
        renderProperties
    );

    typeFilter.addEventListener(
        "change",
        renderProperties
    );

    locationFilter.addEventListener(
        "change",
        renderProperties
    );

    sortFilter.addEventListener(
        "change",
        renderProperties
    );


    /* PROPERTY ACTIONS */

    propertyGrid.addEventListener(
        "click",
        handlePropertyAction
    );


    /* CLEAR FILTERS */

    document
        .getElementById("clearFiltersBtn")
        .addEventListener(
            "click",
            clearFilters
        );


    /* ADD PROPERTY */

    document
        .getElementById("addPropertyBtn")
        .addEventListener(
            "click",
            goToAddProperty
        );


    document
        .getElementById("emptyAddBtn")
        .addEventListener(
            "click",
            goToAddProperty
        );


    /* DELETE CONFIRM */

    document
        .getElementById("confirmDeleteBtn")
        .addEventListener(
            "click",
            confirmDelete
        );


    /* MODAL CLOSE */

    document
        .querySelectorAll("[data-close]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    closeModal(
                        button.dataset.close
                    );

                }
            );

        });


    /* MOBILE SIDEBAR */

    setupMobileSidebar();


    /* LOGOUT */

    document
        .getElementById("logoutBtn")
        .addEventListener(
            "click",
            logout
        );


    /* SUPPORT */

    document
        .getElementById("supportBtn")
        .addEventListener(
            "click",
            () => {

                showToast(
                    "Support",
                    "Support request option opened.",
                    "info"
                );

            }
        );


    /* SEARCH MODAL */

    document
        .getElementById("searchBtn")
        .addEventListener(
            "click",
            openGlobalSearch
        );


    document
        .getElementById("globalSearch")
        .addEventListener(
            "input",
            globalSearch
        );


    /* NOTIFICATIONS */

    document
        .getElementById("notificationBtn")
        .addEventListener(
            "click",
            () => {

                openModal("notificationModal");

            }
        );


    /* PROFILE */

    document
        .getElementById("profileMenuBtn")
        .addEventListener(
            "click",
            () => {

                window.location.href =
                    "../profile/profile.html";

            }
        );


    /* TOAST CLOSE */

    document
        .getElementById("toastClose")
        .addEventListener(
            "click",
            hideToast
        );


    /* ESC */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                document
                    .querySelectorAll(".modal-overlay.show")
                    .forEach(modal => {

                        modal.classList.remove("show");

                    });

            }

        }
    );

}


/* =========================================================
   14. PROPERTY ACTION
========================================================= */

function handlePropertyAction(event) {

    const button =
        event.target.closest(
            "[data-action]"
        );

    if (!button) return;

    const action =
        button.dataset.action;

    const id =
        Number(button.dataset.id);

    const property =
        properties.find(
            item => item.id === id
        );

    if (!property) return;


    if (action === "view") {

        openPropertyDetails(property);

    }


    if (action === "edit") {

        editProperty(property);

    }


    if (action === "delete") {

        openDeleteModal(property);

    }


    if (action === "menu") {

        showToast(
            "Property Options",
            `Options for "${property.title}" are available below.`,
            "info"
        );

    }

}


/* =========================================================
   15. VIEW PROPERTY
========================================================= */

function openPropertyDetails(property) {

    const modalContent =
        document.getElementById(
            "propertyModalContent"
        );


    const statusText =
        property.status === "active"
            ? "Active"
            : property.status === "pending"
                ? "Pending Approval"
                : "Inactive";


    modalContent.innerHTML = `

        <img
            src="${property.image}"
            class="detail-image"
            alt="${escapeHTML(property.title)}"
            onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80'"
        >


        <div class="detail-header">

            <div>

                <span class="property-type">
                    ${escapeHTML(property.type)}
                </span>

                <h2>
                    ${escapeHTML(property.title)}
                </h2>

                <p>
                    📍 ${escapeHTML(property.location)}
                </p>

            </div>

            <div class="detail-price">
                ₹${formatNumber(property.rent)}
                <small>/month</small>
            </div>

        </div>


        <div class="detail-grid">

            <div class="detail-box">
                <span>Status</span>
                <strong>${statusText}</strong>
            </div>

            <div class="detail-box">
                <span>Rating</span>
                <strong>⭐ ${property.rating}</strong>
            </div>

            <div class="detail-box">
                <span>Total Rooms</span>
                <strong>${property.rooms}</strong>
            </div>

            <div class="detail-box">
                <span>Available Rooms</span>
                <strong>${property.available}</strong>
            </div>

            <div class="detail-box">
                <span>Total Reviews</span>
                <strong>${property.reviews}</strong>
            </div>

            <div class="detail-box">
                <span>Listed On</span>
                <strong>${formatDate(property.created)}</strong>
            </div>

        </div>


        <div class="detail-description">

            <h4>
                Property Description
            </h4>

            <p>
                ${escapeHTML(property.description)}
            </p>

        </div>


        <div class="detail-actions">

            <button
                class="primary-btn"
                id="modalEditBtn"
            >
                ✏️ Edit Property
            </button>

            <button
                class="secondary-btn"
                id="modalCloseBtn"
            >
                Close
            </button>

        </div>

    `;


    openModal("propertyModal");


    document
        .getElementById("modalEditBtn")
        .addEventListener(
            "click",
            () => {

                closeModal("propertyModal");

                editProperty(property);

            }
        );


    document
        .getElementById("modalCloseBtn")
        .addEventListener(
            "click",
            () => {

                closeModal("propertyModal");

            }
        );

}


/* =========================================================
   16. EDIT PROPERTY
========================================================= */

function editProperty(property) {

    showToast(
        "Edit Property",
        `Opening editor for "${property.title}".`,
        "info"
    );

    /*
        Backend/Add Property panel তৈরি হলে
        এখানে actual edit URL connect করা যাবে.
    */

}


/* =========================================================
   17. DELETE MODAL
========================================================= */

function openDeleteModal(property) {

    selectedDeleteId =
        property.id;

    document
        .getElementById("deletePropertyName")
        .textContent =
        property.title;

    openModal("deleteModal");

}


/* =========================================================
   18. CONFIRM DELETE
========================================================= */

function confirmDelete() {

    if (!selectedDeleteId) return;


    const deletedProperty =
        properties.find(
            property =>
                property.id === selectedDeleteId
        );


    properties =
        properties.filter(
            property =>
                property.id !== selectedDeleteId
        );


    saveProperties();

    populateLocationFilter();

    renderProperties();

    closeModal("deleteModal");


    showToast(
        "Property Deleted",
        `"${deletedProperty?.title || "Property"}" has been removed.`,
        "success"
    );


    selectedDeleteId = null;

}


/* =========================================================
   19. CLEAR FILTERS
========================================================= */

function clearFilters() {

    propertySearch.value = "";

    statusFilter.value = "all";

    typeFilter.value = "all";

    locationFilter.value = "all";

    sortFilter.value = "newest";

    renderProperties();

}


/* =========================================================
   20. ADD PROPERTY
========================================================= */

function goToAddProperty() {

    window.location.href =
        "../add-property/add-property.html";

}


/* =========================================================
   21. MODALS
========================================================= */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;

    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;

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


/* =========================================================
   22. GLOBAL SEARCH
========================================================= */

function openGlobalSearch() {

    openModal("searchModal");

    setTimeout(() => {

        document
            .getElementById("globalSearch")
            .focus();

    }, 100);

}


function globalSearch(event) {

    const query =
        event.target.value
            .trim()
            .toLowerCase();

    const resultBox =
        document.getElementById(
            "globalSearchResults"
        );


    if (!query) {

        resultBox.innerHTML = `
            <div class="search-placeholder">
                Start typing to search.
            </div>
        `;

        return;
    }


    const results =
        properties.filter(property =>

            property.title
                .toLowerCase()
                .includes(query) ||

            property.location
                .toLowerCase()
                .includes(query) ||

            property.type
                .toLowerCase()
                .includes(query)

        );


    if (!results.length) {

        resultBox.innerHTML = `
            <div class="search-placeholder">
                No matching property found.
            </div>
        `;

        return;
    }


    resultBox.innerHTML =
        results.map(property => `

            <div
                class="global-result"
                data-global-id="${property.id}"
            >

                <div class="global-result-icon">
                    🏠
                </div>

                <div>

                    <strong>
                        ${escapeHTML(property.title)}
                    </strong>

                    <span>
                        ${escapeHTML(property.location)}
                        · ₹${formatNumber(property.rent)}
                    </span>

                </div>

            </div>

        `).join("");


    resultBox
        .querySelectorAll("[data-global-id]")
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            item.dataset.globalId
                        );

                    const property =
                        properties.find(
                            property =>
                                property.id === id
                        );

                    closeModal("searchModal");

                    if (property) {
                        openPropertyDetails(property);
                    }

                }
            );

        });

}


/* =========================================================
   23. MOBILE SIDEBAR
========================================================= */

function setupMobileSidebar() {

    const sidebar =
        document.getElementById(
            "ownerSidebar"
        );

    const overlay =
        document.getElementById(
            "sidebarOverlay"
        );

    const menuButton =
        document.getElementById(
            "mobileMenuBtn"
        );

    const closeButton =
        document.getElementById(
            "sidebarClose"
        );


    function openSidebar() {

        sidebar.classList.add("open");

        overlay.classList.add("show");

    }


    function closeSidebar() {

        sidebar.classList.remove("open");

        overlay.classList.remove("show");

    }


    menuButton.addEventListener(
        "click",
        openSidebar
    );


    closeButton.addEventListener(
        "click",
        closeSidebar
    );


    overlay.addEventListener(
        "click",
        closeSidebar
    );


    document
        .querySelectorAll(".sidebar .nav-item")
        .forEach(item => {

            item.addEventListener(
                "click",
                closeSidebar
            );

        });

}


/* =========================================================
   24. LOGOUT
========================================================= */

function logout() {

    const confirmed =
        confirm(
            "Are you sure you want to logout?"
        );

    if (!confirmed) return;


    localStorage.removeItem(
        "roomnestOwnerLoggedIn"
    );

    window.location.href =
        "../../public/auth/login.html";

}


/* =========================================================
   25. TOAST
========================================================= */

function showToast(
    title,
    message,
    type = "success"
) {

    const toast =
        document.getElementById("toast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");

    const toastIcon =
        document.getElementById("toastIcon");


    toastTitle.textContent =
        title;

    toastMessage.textContent =
        message;


    if (type === "info") {

        toastIcon.textContent = "i";

        toastIcon.style.background =
            "#e8f0ff";

        toastIcon.style.color =
            "#4385e5";

    } else {

        toastIcon.textContent = "✓";

        toastIcon.style.background =
            "#e9faf5";

        toastIcon.style.color =
            "#12a889";

    }


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            hideToast,
            3500
        );

}


function hideToast() {

    document
        .getElementById("toast")
        .classList.remove("show");

}


/* =========================================================
   26. HELPERS
========================================================= */

function formatNumber(number) {

    return Number(number)
        .toLocaleString("en-IN");

}


function formatDate(dateString) {

    const date =
        new Date(dateString);

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   27. MODAL OUTSIDE CLICK
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.classList.contains(
                "modal-overlay"
            )
        ) {

            event.target.classList.remove(
                "show"
            );

            document.body.style.overflow =
                "";

        }

    }
);