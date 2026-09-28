/* =========================================================
   ROOMNEST ADMIN
   PENDING PROPERTIES JS
========================================================= */


/* =========================================================
   DEMO DATA
========================================================= */

let pendingProperties = [

    {
        id: "PN-2001",
        name: "Sunrise Student PG",
        owner: "Sayan Mukherjee",
        initials: "SM",
        location: "Bolpur, Birbhum",
        rooms: 14,
        rent: 6000,
        type: "PG",
        submitted: "Today",
        image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: "PN-2002",
        name: "Modern Stay Hostel",
        owner: "Abhishek Das",
        initials: "AD",
        location: "Suri, Birbhum",
        rooms: 25,
        rent: 5200,
        type: "Hostel",
        submitted: "Today",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: "PN-2003",
        name: "Green Garden PG",
        owner: "Rohit Ghosh",
        initials: "RG",
        location: "Durgapur, West Bengal",
        rooms: 18,
        rent: 6500,
        type: "PG",
        submitted: "Yesterday",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: "PN-2004",
        name: "Campus View Rooms",
        owner: "Debanjan Roy",
        initials: "DR",
        location: "Burdwan, West Bengal",
        rooms: 10,
        rent: 7500,
        type: "Room",
        submitted: "Yesterday",
        image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: "PN-2005",
        name: "Comfort Living Flat",
        owner: "Arnab Sen",
        initials: "AS",
        location: "Kolkata, West Bengal",
        rooms: 6,
        rent: 12000,
        type: "Flat",
        submitted: "2 days ago",
        image: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=500&q=80"
    },

    {
        id: "PN-2006",
        name: "Student Paradise PG",
        owner: "Kunal Paul",
        initials: "KP",
        location: "Asansol, West Bengal",
        rooms: 20,
        rent: 5800,
        type: "PG",
        submitted: "2 days ago",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=500&q=80"
    }

];


/* =========================================================
   STATE
========================================================= */

let selectedPropertyId = null;


/* =========================================================
   ELEMENTS
========================================================= */

const pendingList =
    document.getElementById("pendingList");

const emptyState =
    document.getElementById("emptyState");

const pendingSearch =
    document.getElementById("pendingSearch");

const typeFilter =
    document.getElementById("typeFilter");

const reviewOverlay =
    document.getElementById("reviewOverlay");

const reviewContent =
    document.getElementById("reviewContent");

const rejectOverlay =
    document.getElementById("rejectOverlay");

const rejectReason =
    document.getElementById("rejectReason");


/* =========================================================
   INIT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    renderPendingProperties();

    updateStats();

    setupSidebar();

    setupEvents();

});


/* =========================================================
   RENDER
========================================================= */

function renderPendingProperties() {

    const search =
        pendingSearch.value
            .toLowerCase()
            .trim();

    const type =
        typeFilter.value;


    const filtered =
        pendingProperties.filter(property => {

            const matchesSearch =
                property.name
                    .toLowerCase()
                    .includes(search) ||

                property.owner
                    .toLowerCase()
                    .includes(search) ||

                property.location
                    .toLowerCase()
                    .includes(search) ||

                property.id
                    .toLowerCase()
                    .includes(search);


            const matchesType =
                type === "all" ||
                property.type === type;


            return matchesSearch && matchesType;

        });


    pendingList.innerHTML = "";


    document.getElementById("resultCount")
        .textContent = filtered.length;


    if (filtered.length === 0) {

        emptyState.classList.add("show");

        return;

    }


    emptyState.classList.remove("show");


    filtered.forEach(property => {

        const item =
            document.createElement("div");

        item.className =
            "pending-property";


        item.innerHTML = `

            <img
                src="${property.image}"
                alt="${property.name}"
                class="pending-property-image"
            >


            <div class="pending-property-details">

                <div class="pending-property-title">

                    <h4>
                        ${property.name}
                    </h4>

                    <span class="pending-label">
                        PENDING
                    </span>

                </div>


                <div class="property-meta">

                    <span>
                        <i class="fa-solid fa-location-dot"></i>
                        ${property.location}
                    </span>

                    <span>
                        <i class="fa-solid fa-door-open"></i>
                        ${property.rooms} Rooms
                    </span>

                    <span>
                        <i class="fa-solid fa-indian-rupee-sign"></i>
                        ₹${property.rent.toLocaleString("en-IN")}/month
                    </span>

                    <span>
                        <i class="fa-solid fa-house"></i>
                        ${property.type}
                    </span>

                </div>


                <div class="property-owner">

                    <div class="owner-avatar-small">
                        ${property.initials}
                    </div>

                    <span>
                        Submitted by
                        <strong>${property.owner}</strong>
                    </span>

                    <span>
                        • ${property.submitted}
                    </span>

                </div>

            </div>


            <div class="pending-actions">

                <button
                    class="review-btn"
                    onclick="viewProperty('${property.id}')"
                >

                    <i class="fa-regular fa-eye"></i>
                    Review

                </button>


                <button
                    class="approve-btn"
                    onclick="approveProperty('${property.id}')"
                >

                    <i class="fa-solid fa-check"></i>
                    Approve

                </button>


                <button
                    class="reject-btn"
                    onclick="openRejectModal('${property.id}')"
                >

                    <i class="fa-solid fa-xmark"></i>
                    Reject

                </button>

            </div>

        `;


        pendingList.appendChild(item);

    });

}


/* =========================================================
   STATS
========================================================= */

function updateStats() {

    const total =
        pendingProperties.length;


    const today =
        pendingProperties.filter(
            property =>
                property.submitted === "Today"
        ).length;


    document.getElementById("waitingCount")
        .textContent = total;


    document.getElementById("todayCount")
        .textContent = today;


    document.getElementById("sidebarPendingCount")
        .textContent = total;


    /*
        Demo values.
        Backend/API will replace these later.
    */

    document.getElementById("approvedCount")
        .textContent = "8";


    document.getElementById("rejectedCount")
        .textContent = "2";

}


/* =========================================================
   SEARCH
========================================================= */

pendingSearch.addEventListener(
    "input",
    renderPendingProperties
);


typeFilter.addEventListener(
    "change",
    renderPendingProperties
);


/* =========================================================
   RESET
========================================================= */

document
    .getElementById("resetFilters")
    .addEventListener("click", () => {

        pendingSearch.value = "";

        typeFilter.value = "all";

        renderPendingProperties();

    });


/* =========================================================
   VIEW PROPERTY
========================================================= */

function viewProperty(id) {

    const property =
        pendingProperties.find(
            item => item.id === id
        );


    if (!property) return;


    selectedPropertyId = id;


    reviewContent.innerHTML = `

        <img
            src="${property.image}"
            alt="${property.name}"
            class="review-image"
        >


        <div class="review-body">

            <h2>
                ${property.name}
            </h2>


            <div class="review-id">
                Property ID: ${property.id}
            </div>


            <div class="review-grid">


                <div class="review-info">

                    <span>Owner</span>

                    <strong>
                        ${property.owner}
                    </strong>

                </div>


                <div class="review-info">

                    <span>Location</span>

                    <strong>
                        ${property.location}
                    </strong>

                </div>


                <div class="review-info">

                    <span>Property Type</span>

                    <strong>
                        ${property.type}
                    </strong>

                </div>


                <div class="review-info">

                    <span>Total Rooms</span>

                    <strong>
                        ${property.rooms}
                    </strong>

                </div>


                <div class="review-info">

                    <span>Monthly Rent</span>

                    <strong>
                        ₹${property.rent.toLocaleString("en-IN")}
                    </strong>

                </div>


                <div class="review-info">

                    <span>Submitted</span>

                    <strong>
                        ${property.submitted}
                    </strong>

                </div>

            </div>


            <div class="review-modal-actions">

                <button
                    class="modal-reject"
                    onclick="openRejectModal('${property.id}')"
                >

                    <i class="fa-solid fa-xmark"></i>
                    Reject

                </button>


                <button
                    class="modal-approve"
                    onclick="approveProperty('${property.id}')"
                >

                    <i class="fa-solid fa-check"></i>
                    Approve Property

                </button>

            </div>

        </div>

    `;


    reviewOverlay.classList.add("show");

}


/* =========================================================
   APPROVE
========================================================= */

function approveProperty(id) {

    const property =
        pendingProperties.find(
            item => item.id === id
        );


    if (!property) return;


    const confirmed =
        confirm(
            `Approve "${property.name}"?`
        );


    if (!confirmed) return;


    pendingProperties =
        pendingProperties.filter(
            item => item.id !== id
        );


    closeReviewModal();

    updateStats();

    renderPendingProperties();


    showToast(
        `${property.name} approved successfully.`
    );

}


/* =========================================================
   REJECT MODAL
========================================================= */

function openRejectModal(id) {

    selectedPropertyId = id;

    rejectReason.value = "";

    rejectOverlay.classList.add("show");

}


document
    .getElementById("confirmReject")
    .addEventListener("click", () => {

        if (!selectedPropertyId) return;


        const reason =
            rejectReason.value.trim();


        if (!reason) {

            showToast(
                "Please enter a rejection reason."
            );

            rejectReason.focus();

            return;

        }


        const property =
            pendingProperties.find(
                item =>
                    item.id === selectedPropertyId
            );


        if (!property) return;


        pendingProperties =
            pendingProperties.filter(
                item =>
                    item.id !== selectedPropertyId
            );


        closeRejectModal();

        closeReviewModal();

        updateStats();

        renderPendingProperties();


        showToast(
            `${property.name} has been rejected.`
        );

    });


/* =========================================================
   CLOSE REVIEW
========================================================= */

function closeReviewModal() {

    reviewOverlay.classList.remove("show");

}


document
    .getElementById("modalClose")
    .addEventListener(
        "click",
        closeReviewModal
    );


reviewOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target === reviewOverlay
        ) {

            closeReviewModal();

        }

    }
);


/* =========================================================
   CLOSE REJECT
========================================================= */

function closeRejectModal() {

    rejectOverlay.classList.remove("show");

    selectedPropertyId = null;

}


document
    .getElementById("rejectClose")
    .addEventListener(
        "click",
        closeRejectModal
    );


document
    .getElementById("cancelReject")
    .addEventListener(
        "click",
        closeRejectModal
    );


rejectOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target === rejectOverlay
        ) {

            closeRejectModal();

        }

    }
);


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const toast =
        document.getElementById("pendingToast");

    const toastMessage =
        document.getElementById("toastMessage");


    toastMessage.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);

}


/* =========================================================
   NOTIFICATION
========================================================= */

document
    .getElementById("notificationBtn")
    .addEventListener(
        "click",
        () => {

            showToast(
                "You have new property submissions."
            );

        }
    );


/* =========================================================
   GLOBAL SEARCH
========================================================= */

document
    .getElementById("globalSearch")
    .addEventListener(
        "input",
        event => {

            pendingSearch.value =
                event.target.value;

            renderPendingProperties();

        }
    );


/* =========================================================
   SIDEBAR
========================================================= */

function setupSidebar() {

    const sidebar =
        document.getElementById(
            "pendingSidebar"
        );

    const overlay =
        document.getElementById(
            "sidebarOverlay"
        );

    const menu =
        document.getElementById(
            "mobileMenuBtn"
        );


    menu.addEventListener(
        "click",
        () => {

            sidebar.classList.add("open");

            overlay.classList.add("show");

        }
    );


    overlay.addEventListener(
        "click",
        () => {

            sidebar.classList.remove("open");

            overlay.classList.remove("show");

        }
    );

}


/* =========================================================
   LOGOUT
========================================================= */

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmed) return;


            localStorage.removeItem(
                "adminToken"
            );


            window.location.href =
                "../../public/auth/login.html";

        }
    );