/* =========================================================
   ROOMNEST ADMIN — PROPERTIES JS
========================================================= */


/* =========================================================
   DEMO PROPERTY DATA
========================================================= */

let properties = [

    {
        id: "PR-1001",
        name: "Green View PG",
        owner: "Rahul Das",
        ownerInitials: "RD",
        location: "Bolpur, Birbhum",
        rooms: 18,
        rent: 6500,
        type: "PG",
        status: "active",
        image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=300&q=80"
    },

    {
        id: "PR-1002",
        name: "City Nest Hostel",
        owner: "Amit Ghosh",
        ownerInitials: "AG",
        location: "Suri, Birbhum",
        rooms: 24,
        rent: 5500,
        type: "Hostel",
        status: "active",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=300&q=80"
    },

    {
        id: "PR-1003",
        name: "Student Comfort House",
        owner: "Priya Sen",
        ownerInitials: "PS",
        location: "Durgapur, WB",
        rooms: 12,
        rent: 7000,
        type: "PG",
        status: "pending",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=300&q=80"
    },

    {
        id: "PR-1004",
        name: "Lake Side Rooms",
        owner: "Sourav Roy",
        ownerInitials: "SR",
        location: "Kolkata, WB",
        rooms: 8,
        rent: 8500,
        type: "Room",
        status: "active",
        image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=300&q=80"
    },

    {
        id: "PR-1005",
        name: "University View PG",
        owner: "Ankit Paul",
        ownerInitials: "AP",
        location: "Burdwan, WB",
        rooms: 20,
        rent: 6000,
        type: "PG",
        status: "active",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80"
    },

    {
        id: "PR-1006",
        name: "Royal Residency",
        owner: "Arindam Bose",
        ownerInitials: "AB",
        location: "Asansol, WB",
        rooms: 16,
        rent: 9000,
        type: "Flat",
        status: "inactive",
        image: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=300&q=80"
    },

    {
        id: "PR-1007",
        name: "Peaceful Stay PG",
        owner: "Debjit Sen",
        ownerInitials: "DS",
        location: "Siliguri, WB",
        rooms: 15,
        rent: 5000,
        type: "PG",
        status: "active",
        image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=300&q=80"
    },

    {
        id: "PR-1008",
        name: "Campus Corner Hostel",
        owner: "Rakesh Mondal",
        ownerInitials: "RM",
        location: "Kalyani, WB",
        rooms: 30,
        rent: 4800,
        type: "Hostel",
        status: "pending",
        image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=300&q=80"
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const tableBody = document.getElementById("propertiesTableBody");

const propertySearch = document.getElementById("propertySearch");

const statusFilter = document.getElementById("statusFilter");

const typeFilter = document.getElementById("typeFilter");

const selectAll = document.getElementById("selectAll");

const bulkBar = document.getElementById("bulkBar");

const selectedCount = document.getElementById("selectedCount");

const selectedInfo = document.getElementById("selectedInfo");

const emptyState = document.getElementById("emptyState");

const propertyModal = document.getElementById("propertyModal");

const modalContent = document.getElementById("modalContent");

const modalClose = document.getElementById("modalClose");

const toast = document.getElementById("propertyToast");

const toastMessage = document.getElementById("toastMessage");


/* =========================================================
   INITIAL LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    renderProperties();

    updateStats();

    setupSidebar();

    setupEvents();

});


/* =========================================================
   RENDER PROPERTIES
========================================================= */

function renderProperties() {

    const searchValue =
        propertySearch.value.toLowerCase().trim();

    const statusValue =
        statusFilter.value;

    const typeValue =
        typeFilter.value;


    const filteredProperties = properties.filter(property => {

        const matchesSearch =
            property.name.toLowerCase().includes(searchValue) ||
            property.owner.toLowerCase().includes(searchValue) ||
            property.location.toLowerCase().includes(searchValue) ||
            property.id.toLowerCase().includes(searchValue);


        const matchesStatus =
            statusValue === "all" ||
            property.status === statusValue;


        const matchesType =
            typeValue === "all" ||
            property.type === typeValue;


        return matchesSearch &&
               matchesStatus &&
               matchesType;

    });


    tableBody.innerHTML = "";


    if (filteredProperties.length === 0) {

        emptyState.classList.add("show");

        document.querySelector(".table-wrapper").style.display = "none";

    } else {

        emptyState.classList.remove("show");

        document.querySelector(".table-wrapper").style.display = "block";


        filteredProperties.forEach(property => {

            const row = document.createElement("tr");

            row.innerHTML = `

                <td class="checkbox-column">

                    <input
                        type="checkbox"
                        class="property-checkbox"
                        data-id="${property.id}"
                    >

                </td>


                <td>

                    <div class="property-cell">

                        <img
                            src="${property.image}"
                            class="property-image"
                            alt="${property.name}"
                        >

                        <div class="property-details">

                            <span class="property-name">
                                ${property.name}
                            </span>

                            <span class="property-id">
                                ${property.id}
                            </span>

                        </div>

                    </div>

                </td>


                <td>

                    <div class="owner-cell">

                        <div class="owner-avatar">
                            ${property.ownerInitials}
                        </div>

                        <span class="owner-name">
                            ${property.owner}
                        </span>

                    </div>

                </td>


                <td>

                    <div class="location-cell">

                        <i class="fa-solid fa-location-dot"></i>

                        <span class="location-text">
                            ${property.location}
                        </span>

                    </div>

                </td>


                <td>
                    <strong>${property.rooms}</strong>
                </td>


                <td>

                    <span class="rent">
                        ₹${property.rent.toLocaleString("en-IN")}
                    </span>

                    <small>/month</small>

                </td>


                <td>
                    ${property.type}
                </td>


                <td>

                    <span class="property-status ${property.status}">
                        ${capitalize(property.status)}
                    </span>

                </td>


                <td>

                    <div class="action-buttons">

                        <button
                            class="action-btn"
                            title="View"
                            onclick="viewProperty('${property.id}')"
                        >
                            <i class="fa-regular fa-eye"></i>
                        </button>


                        <button
                            class="action-btn"
                            title="Edit"
                            onclick="editProperty('${property.id}')"
                        >
                            <i class="fa-solid fa-pen"></i>
                        </button>


                        <button
                            class="action-btn delete"
                            title="Delete"
                            onclick="deleteProperty('${property.id}')"
                        >
                            <i class="fa-solid fa-trash"></i>
                        </button>

                    </div>

                </td>

            `;


            tableBody.appendChild(row);

        });

    }


    updateSelection();

    updatePaginationInfo(filteredProperties.length);

}


/* =========================================================
   UPDATE STATS
========================================================= */

function updateStats() {

    const total =
        properties.length;


    const active =
        properties.filter(
            property => property.status === "active"
        ).length;


    const pending =
        properties.filter(
            property => property.status === "pending"
        ).length;


    const inactive =
        properties.filter(
            property => property.status === "inactive"
        ).length;


    document.getElementById("totalProperties").textContent = total;

    document.getElementById("activeProperties").textContent = active;

    document.getElementById("pendingProperties").textContent = pending;

    document.getElementById("inactiveProperties").textContent = inactive;

}


/* =========================================================
   SEARCH + FILTER
========================================================= */

propertySearch.addEventListener("input", renderProperties);

statusFilter.addEventListener("change", renderProperties);

typeFilter.addEventListener("change", renderProperties);


/* =========================================================
   RESET FILTERS
========================================================= */

document.getElementById("resetFilters")
    .addEventListener("click", () => {

        propertySearch.value = "";

        statusFilter.value = "all";

        typeFilter.value = "all";

        renderProperties();

    });


/* =========================================================
   SELECT ALL
========================================================= */

selectAll.addEventListener("change", () => {

    const checkboxes =
        document.querySelectorAll(".property-checkbox");


    checkboxes.forEach(checkbox => {

        checkbox.checked =
            selectAll.checked;

    });


    updateSelection();

});


/* =========================================================
   UPDATE SELECTION
========================================================= */

function updateSelection() {

    const checkboxes =
        document.querySelectorAll(".property-checkbox");


    const checked =
        document.querySelectorAll(
            ".property-checkbox:checked"
        );


    const count =
        checked.length;


    selectedCount.textContent = count;

    selectedInfo.textContent =
        `${count} selected`;


    if (count > 0) {

        bulkBar.classList.add("show");

    } else {

        bulkBar.classList.remove("show");

    }


    if (
        checkboxes.length > 0 &&
        count === checkboxes.length
    ) {

        selectAll.checked = true;

    } else {

        selectAll.checked = false;

    }


    checkboxes.forEach(checkbox => {

        checkbox.addEventListener(
            "change",
            updateSelection
        );

    });

}


/* =========================================================
   VIEW PROPERTY
========================================================= */

function viewProperty(id) {

    const property =
        properties.find(
            item => item.id === id
        );


    if (!property) return;


    modalContent.innerHTML = `

        <img
            src="${property.image}"
            class="modal-property-image"
            alt="${property.name}"
        >


        <div class="modal-body">

            <h2>${property.name}</h2>

            <div class="modal-subtitle">
                Property ID: ${property.id}
            </div>


            <div class="modal-grid">

                <div class="modal-info-box">

                    <span>Owner</span>

                    <strong>
                        ${property.owner}
                    </strong>

                </div>


                <div class="modal-info-box">

                    <span>Location</span>

                    <strong>
                        ${property.location}
                    </strong>

                </div>


                <div class="modal-info-box">

                    <span>Property Type</span>

                    <strong>
                        ${property.type}
                    </strong>

                </div>


                <div class="modal-info-box">

                    <span>Total Rooms</span>

                    <strong>
                        ${property.rooms}
                    </strong>

                </div>


                <div class="modal-info-box">

                    <span>Monthly Rent</span>

                    <strong>
                        ₹${property.rent.toLocaleString("en-IN")}
                    </strong>

                </div>


                <div class="modal-info-box">

                    <span>Status</span>

                    <strong>
                        ${capitalize(property.status)}
                    </strong>

                </div>

            </div>

        </div>

    `;


    propertyModal.classList.add("show");

}


/* =========================================================
   CLOSE MODAL
========================================================= */

modalClose.addEventListener("click", closeModal);


propertyModal.addEventListener("click", event => {

    if (event.target === propertyModal) {

        closeModal();

    }

});


function closeModal() {

    propertyModal.classList.remove("show");

}


/* =========================================================
   EDIT PROPERTY
========================================================= */

function editProperty(id) {

    const property =
        properties.find(
            item => item.id === id
        );


    if (!property) return;


    showToast(
        `Edit mode for "${property.name}" will be connected later.`
    );

}


/* =========================================================
   DELETE PROPERTY
========================================================= */

function deleteProperty(id) {

    const property =
        properties.find(
            item => item.id === id
        );


    if (!property) return;


    const confirmed =
        confirm(
            `Are you sure you want to delete "${property.name}"?`
        );


    if (!confirmed) return;


    properties =
        properties.filter(
            item => item.id !== id
        );


    renderProperties();

    updateStats();

    showToast("Property deleted successfully.");

}


/* =========================================================
   BULK APPROVE
========================================================= */

document.getElementById("bulkApprove")
    .addEventListener("click", () => {

        const selected =
            getSelectedIds();


        if (selected.length === 0) return;


        properties.forEach(property => {

            if (selected.includes(property.id)) {

                property.status = "active";

            }

        });


        renderProperties();

        updateStats();

        showToast(
            `${selected.length} properties approved.`
        );

    });


/* =========================================================
   BULK DEACTIVATE
========================================================= */

document.getElementById("bulkDeactivate")
    .addEventListener("click", () => {

        const selected =
            getSelectedIds();


        if (selected.length === 0) return;


        properties.forEach(property => {

            if (selected.includes(property.id)) {

                property.status = "inactive";

            }

        });


        renderProperties();

        updateStats();

        showToast(
            `${selected.length} properties deactivated.`
        );

    });


/* =========================================================
   BULK DELETE
========================================================= */

document.getElementById("bulkDelete")
    .addEventListener("click", () => {

        const selected =
            getSelectedIds();


        if (selected.length === 0) return;


        const confirmed =
            confirm(
                `Delete ${selected.length} selected properties?`
            );


        if (!confirmed) return;


        properties =
            properties.filter(
                property =>
                    !selected.includes(property.id)
            );


        renderProperties();

        updateStats();

        showToast(
            `${selected.length} properties deleted.`
        );

    });


/* =========================================================
   GET SELECTED IDS
========================================================= */

function getSelectedIds() {

    return Array.from(
        document.querySelectorAll(
            ".property-checkbox:checked"
        )
    ).map(
        checkbox =>
            checkbox.dataset.id
    );

}


/* =========================================================
   ADD PROPERTY
========================================================= */

document.getElementById("addPropertyBtn")
    .addEventListener("click", () => {

        showToast(
            "Add Property form will be connected later."
        );

    });


/* =========================================================
   PAGINATION INFO
========================================================= */

function updatePaginationInfo(count) {

    const paginationInfo =
        document.getElementById("paginationInfo");


    if (count === 0) {

        paginationInfo.textContent =
            "Showing 0 properties";

        return;

    }


    paginationInfo.textContent =
        `Showing 1–${count} of ${count} properties`;

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    toastMessage.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);

}


/* =========================================================
   CAPITALIZE
========================================================= */

function capitalize(value) {

    return value.charAt(0).toUpperCase() +
           value.slice(1);

}


/* =========================================================
   SIDEBAR
========================================================= */

function setupSidebar() {

    const sidebar =
        document.getElementById("adminSidebar");

    const overlay =
        document.getElementById("sidebarOverlay");

    const menuBtn =
        document.getElementById("mobileMenuBtn");


    menuBtn.addEventListener("click", () => {

        sidebar.classList.add("open");

        overlay.classList.add("show");

    });


    overlay.addEventListener("click", () => {

        sidebar.classList.remove("open");

        overlay.classList.remove("show");

    });

}


/* =========================================================
   GENERAL EVENTS
========================================================= */

function setupEvents() {

    /* Notification */

    document
        .getElementById("notificationBtn")
        .addEventListener("click", () => {

            showToast(
                "You have 3 new notifications."
            );

        });


    /* Global Search */

    document
        .getElementById("globalSearch")
        .addEventListener("input", event => {

            propertySearch.value =
                event.target.value;

            renderProperties();

        });


    /* Logout */

    document
        .getElementById("logoutBtn")
        .addEventListener("click", () => {

            const confirmed =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmed) return;


            localStorage.removeItem("adminToken");

            window.location.href =
                "../../public/auth/login.html";

        });

}