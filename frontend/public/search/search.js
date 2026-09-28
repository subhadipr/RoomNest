/* =========================================================
   ROOMNEST — PUBLIC SEARCH
========================================================= */


/* =========================================================
   01. DEMO PROPERTY DATA
========================================================= */

const properties = [

    {
        id: 1,
        name: "Green View PG",
        type: "PG",
        roomType: "Single Room",
        location: "Salt Lake, Kolkata",
        city: "Kolkata",
        price: 7500,
        gender: "Anyone",
        rating: 4.5,
        reviews: 120,
        verified: true,
        facilities: [
            "WiFi",
            "Food",
            "AC",
            "Parking"
        ],
        image:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=85",
        owner: "Rahul Sharma"
    },


    {
        id: 2,
        name: "Comfort Stay",
        type: "PG",
        roomType: "Shared Room",
        location: "New Town, Kolkata",
        city: "Kolkata",
        price: 6000,
        gender: "Girls",
        rating: 4.2,
        reviews: 98,
        verified: true,
        facilities: [
            "Food",
            "WiFi",
            "AC"
        ],
        image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=85",
        owner: "Priya Sen"
    },


    {
        id: 3,
        name: "Students Home",
        type: "Room",
        roomType: "Single Room",
        location: "Garia, Kolkata",
        city: "Kolkata",
        price: 9000,
        gender: "Boys",
        rating: 4.7,
        reviews: 85,
        verified: true,
        facilities: [
            "WiFi",
            "Parking",
            "Attached Bathroom"
        ],
        image:
            "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=800&q=85",
        owner: "Amit Ghosh"
    },


    {
        id: 4,
        name: "Shree PG",
        type: "PG",
        roomType: "Shared Room",
        location: "Ballygunge, Kolkata",
        city: "Kolkata",
        price: 8000,
        gender: "Anyone",
        rating: 4.3,
        reviews: 76,
        verified: true,
        facilities: [
            "Food",
            "WiFi",
            "AC",
            "Washing Machine"
        ],
        image:
            "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=800&q=85",
        owner: "Rahul Sharma"
    },


    {
        id: 5,
        name: "Lake View Stay",
        type: "PG",
        roomType: "Single Room",
        location: "Rajarhat, Kolkata",
        city: "Kolkata",
        price: 7000,
        gender: "Boys",
        rating: 4.6,
        reviews: 112,
        verified: true,
        facilities: [
            "WiFi",
            "Food",
            "Parking"
        ],
        image:
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=85",
        owner: "Sourav Das"
    },


    {
        id: 6,
        name: "Student Nest",
        type: "Room",
        roomType: "Shared Room",
        location: "Jadavpur, Kolkata",
        city: "Kolkata",
        price: 6500,
        gender: "Anyone",
        rating: 4.4,
        reviews: 91,
        verified: true,
        facilities: [
            "WiFi",
            "Attached Bathroom"
        ],
        image:
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=85",
        owner: "Ananya Roy"
    },


    {
        id: 7,
        name: "Metro Living",
        type: "Flat",
        roomType: "Single Room",
        location: "Dum Dum, Kolkata",
        city: "Kolkata",
        price: 11000,
        gender: "Anyone",
        rating: 4.1,
        reviews: 54,
        verified: true,
        facilities: [
            "WiFi",
            "AC",
            "Parking"
        ],
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85",
        owner: "Rakesh Paul"
    },


    {
        id: 8,
        name: "Urban Nest",
        type: "PG",
        roomType: "Shared Room",
        location: "Park Street, Kolkata",
        city: "Kolkata",
        price: 12000,
        gender: "Girls",
        rating: 4.8,
        reviews: 143,
        verified: true,
        facilities: [
            "Food",
            "WiFi",
            "AC",
            "Parking"
        ],
        image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85",
        owner: "Moumita Roy"
    },


    {
        id: 9,
        name: "Siliguri Student Stay",
        type: "PG",
        roomType: "Single Room",
        location: "Sevoke Road, Siliguri",
        city: "Siliguri",
        price: 5500,
        gender: "Anyone",
        rating: 4.4,
        reviews: 65,
        verified: true,
        facilities: [
            "WiFi",
            "Food",
            "Parking"
        ],
        image:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=85",
        owner: "Arindam Roy"
    },


    {
        id: 10,
        name: "Durgapur Comfort Home",
        type: "Room",
        roomType: "Single Room",
        location: "City Centre, Durgapur",
        city: "Durgapur",
        price: 5000,
        gender: "Boys",
        rating: 4.2,
        reviews: 48,
        verified: true,
        facilities: [
            "WiFi",
            "Attached Bathroom"
        ],
        image:
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=85",
        owner: "Debashis Roy"
    },


    {
        id: 11,
        name: "Campus Stay",
        type: "PG",
        roomType: "Shared Room",
        location: "Bally, Kolkata",
        city: "Kolkata",
        price: 5800,
        gender: "Anyone",
        rating: 4.0,
        reviews: 39,
        verified: true,
        facilities: [
            "Food",
            "WiFi"
        ],
        image:
            "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=85",
        owner: "Suman Ghosh"
    },


    {
        id: 12,
        name: "Bright Rooms",
        type: "Room",
        roomType: "Single Room",
        location: "Howrah, Kolkata",
        city: "Kolkata",
        price: 6200,
        gender: "Girls",
        rating: 4.5,
        reviews: 72,
        verified: true,
        facilities: [
            "WiFi",
            "AC",
            "Attached Bathroom"
        ],
        image:
            "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=800&q=85",
        owner: "Sneha Das"
    }

];


/* =========================================================
   02. STATE
========================================================= */

let filteredProperties = [...properties];

let currentPage = 1;

const propertiesPerPage = 6;

let savedProperties = [];


try {

    savedProperties =
        JSON.parse(
            localStorage.getItem(
                "roomnestSavedProperties"
            ) || "[]"
        );

} catch {

    savedProperties = [];

}


/* =========================================================
   03. DOM
========================================================= */

const propertyGrid =
    document.getElementById("propertyGrid");

const resultCount =
    document.getElementById("resultCount");

const mobileResultCount =
    document.getElementById("mobileResultCount");

const pagination =
    document.getElementById("pagination");

const emptyState =
    document.getElementById("emptyState");

const activeFilters =
    document.getElementById("activeFilters");

const sortSelect =
    document.getElementById("sortSelect");

const locationFilter =
    document.getElementById("locationFilter");

const topLocation =
    document.getElementById("topLocation");

const topType =
    document.getElementById("topType");

const filterSidebar =
    document.getElementById("filterSidebar");

const filterOverlay =
    document.getElementById("filterOverlay");


/* =========================================================
   04. RENDER PROPERTIES
========================================================= */

function renderProperties() {

    propertyGrid.innerHTML = "";

    const start =
        (currentPage - 1) *
        propertiesPerPage;

    const end =
        start + propertiesPerPage;

    const pageItems =
        filteredProperties.slice(start, end);


    if (!pageItems.length) {

        emptyState.classList.add("show");

        pagination.innerHTML = "";

        updateCounts();

        return;

    }


    emptyState.classList.remove("show");


    pageItems.forEach(property => {

        propertyGrid.insertAdjacentHTML(
            "beforeend",
            createPropertyCard(property)
        );

    });


    renderPagination();

    updateCounts();

}


/* =========================================================
   05. PROPERTY CARD
========================================================= */

function createPropertyCard(property) {

    const isSaved =
        savedProperties.includes(
            String(property.id)
        );


    const facilities =
        property.facilities
            .slice(0, 4)
            .map(
                facility =>
                    `<span class="facility">${facility}</span>`
            )
            .join("");


    return `

        <article class="property-card">

            <div class="property-image">

                <img
                    src="${property.image}"
                    alt="${property.name}"
                    loading="lazy"
                >

                ${
                    property.verified
                        ? `
                            <span class="verified-badge">
                                ✓ Verified
                            </span>
                        `
                        : ""
                }

                <button
                    type="button"
                    class="save-property ${isSaved ? "saved" : ""}"
                    data-id="${property.id}"
                    title="Save property"
                >
                    ${isSaved ? "♥" : "♡"}
                </button>

            </div>


            <div class="property-content">

                <div class="property-top">

                    <div>

                        <span class="property-type">
                            ${property.type}
                        </span>

                        <h3>
                            ${property.name}
                        </h3>

                    </div>

                </div>


                <p class="property-location">
                    📍 ${property.location}
                </p>


                <div class="property-facilities">

                    ${facilities}

                </div>


                <div class="property-info">

                    <div class="property-price">

                        <strong>
                            ₹${property.price.toLocaleString("en-IN")}
                        </strong>

                        <span>
                            / month
                        </span>

                    </div>


                    <div class="rating">

                        ⭐ ${property.rating}

                        <small>
                            (${property.reviews})
                        </small>

                    </div>

                </div>


                <div class="property-actions">

                    <button
                        type="button"
                        class="view-property"
                        data-id="${property.id}"
                    >
                        View Details
                    </button>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   06. COUNTS
========================================================= */

function updateCounts() {

    resultCount.textContent =
        filteredProperties.length;

    mobileResultCount.textContent =
        `${filteredProperties.length} Properties`;

}


/* =========================================================
   07. PAGINATION
========================================================= */

function renderPagination() {

    pagination.innerHTML = "";

    const totalPages =
        Math.ceil(
            filteredProperties.length /
            propertiesPerPage
        );


    if (totalPages <= 1) {
        return;
    }


    const previous =
        document.createElement("button");

    previous.className =
        "page-button arrow";

    previous.textContent =
        "‹";

    previous.disabled =
        currentPage === 1;

    previous.addEventListener(
        "click",
        () => {

            if (currentPage > 1) {

                currentPage--;

                renderProperties();

                window.scrollTo({
                    top: 300,
                    behavior: "smooth"
                });

            }

        }
    );


    pagination.appendChild(previous);


    for (
        let page = 1;
        page <= totalPages;
        page++
    ) {

        const button =
            document.createElement("button");

        button.className =
            "page-button";

        if (page === currentPage) {
            button.classList.add("active");
        }

        button.textContent =
            page;


        button.addEventListener(
            "click",
            () => {

                currentPage = page;

                renderProperties();

                window.scrollTo({
                    top: 300,
                    behavior: "smooth"
                });

            }
        );


        pagination.appendChild(button);

    }


    const next =
        document.createElement("button");

    next.className =
        "page-button arrow";

    next.textContent =
        "›";

    next.disabled =
        currentPage === totalPages;

    next.addEventListener(
        "click",
        () => {

            if (currentPage < totalPages) {

                currentPage++;

                renderProperties();

                window.scrollTo({
                    top: 300,
                    behavior: "smooth"
                });

            }

        }
    );


    pagination.appendChild(next);

}


/* =========================================================
   08. GET SELECTED CHECKBOXES
========================================================= */

function getCheckedValues(name) {

    return [
        ...document.querySelectorAll(
            `input[name="${name}"]:checked`
        )
    ].map(
        input => input.value
    );

}


/* =========================================================
   09. FILTER PROPERTIES
========================================================= */

function applyFilters() {

    const location =
        locationFilter.value
            .trim()
            .toLowerCase();


    const budgets =
        getCheckedValues("budget");


    const types =
        getCheckedValues("propertyType");


    const gender =
        document.querySelector(
            'input[name="gender"]:checked'
        )?.value || "Anyone";


    const facilities =
        getCheckedValues("facility");


    filteredProperties =
        properties.filter(property => {


            /* LOCATION */

            if (
                location &&
                !property.location
                    .toLowerCase()
                    .includes(location) &&
                !property.city
                    .toLowerCase()
                    .includes(location)
            ) {

                return false;

            }


            /* PROPERTY TYPE */

            if (
                types.length &&
                !types.includes(property.type) &&
                !types.includes(property.roomType)
            ) {

                return false;

            }


            /* GENDER */

            if (
                gender !== "Anyone" &&
                property.gender !== "Anyone" &&
                property.gender !== gender
            ) {

                return false;

            }


            /* BUDGET */

            if (budgets.length) {

                const budgetMatch =
                    budgets.some(range => {

                        if (range === "0-5000") {

                            return property.price <= 5000;

                        }

                        if (range === "5000-8000") {

                            return (
                                property.price > 5000 &&
                                property.price <= 8000
                            );

                        }

                        if (range === "8000-12000") {

                            return (
                                property.price > 8000 &&
                                property.price <= 12000
                            );

                        }

                        if (range === "12000+") {

                            return property.price > 12000;

                        }

                        return true;

                    });


                if (!budgetMatch) {
                    return false;
                }

            }


            /* FACILITIES */

            if (facilities.length) {

                const hasFacilities =
                    facilities.every(
                        facility =>
                            property.facilities
                                .includes(facility)
                    );


                if (!hasFacilities) {
                    return false;
                }

            }


            return true;

        });


    sortProperties();

    currentPage = 1;

    renderProperties();

    renderActiveFilters();

}


/* =========================================================
   10. SORT
========================================================= */

function sortProperties() {

    const value =
        sortSelect.value;


    if (value === "price-low") {

        filteredProperties.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    else if (value === "price-high") {

        filteredProperties.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    else if (value === "rating") {

        filteredProperties.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }


    else {

        filteredProperties.sort(
            (a, b) =>
                b.id - a.id
        );

    }

}


/* =========================================================
   11. ACTIVE FILTERS
========================================================= */

function renderActiveFilters() {

    activeFilters.innerHTML = "";


    const location =
        locationFilter.value.trim();


    if (location) {

        addFilterTag(
            `Location: ${location}`,
            () => {

                locationFilter.value = "";

                applyFilters();

            }
        );

    }


    getCheckedValues("budget")
        .forEach(value => {

            addFilterTag(
                `Budget: ${value}`,
                () => {

                    const checkbox =
                        document.querySelector(
                            `input[name="budget"][value="${value}"]`
                        );

                    if (checkbox) {
                        checkbox.checked = false;
                    }

                    applyFilters();

                }
            );

        });


    getCheckedValues("propertyType")
        .forEach(value => {

            addFilterTag(
                value,
                () => {

                    const checkbox =
                        document.querySelector(
                            `input[name="propertyType"][value="${value}"]`
                        );

                    if (checkbox) {
                        checkbox.checked = false;
                    }

                    applyFilters();

                }
            );

        });


    getCheckedValues("facility")
        .forEach(value => {

            addFilterTag(
                value,
                () => {

                    const checkbox =
                        document.querySelector(
                            `input[name="facility"][value="${value}"]`
                        );

                    if (checkbox) {
                        checkbox.checked = false;
                    }

                    applyFilters();

                }
            );

        });

}


function addFilterTag(text, removeFunction) {

    const tag =
        document.createElement("div");

    tag.className =
        "filter-tag";

    tag.innerHTML = `

        <span>
            ${text}
        </span>

        <button
            type="button"
            aria-label="Remove filter"
        >
            ×
        </button>

    `;


    tag.querySelector("button")
        .addEventListener(
            "click",
            removeFunction
        );


    activeFilters.appendChild(tag);

}


/* =========================================================
   12. RESET FILTERS
========================================================= */

function resetFilters() {

    locationFilter.value = "";

    topLocation.value = "";

    document
        .querySelectorAll(
            'input[type="checkbox"]'
        )
        .forEach(input => {

            input.checked = false;

        });


    const anyone =
        document.querySelector(
            'input[name="gender"][value="Anyone"]'
        );

    if (anyone) {
        anyone.checked = true;
    }


    topType.value = "";

    sortSelect.value = "latest";

    filteredProperties =
        [...properties];

    currentPage = 1;

    renderActiveFilters();

    renderProperties();

}


/* =========================================================
   13. URL QUERY PARAMETERS
========================================================= */

function loadURLFilters() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const location =
        params.get("location");

    const type =
        params.get("type");

    const budget =
        params.get("budget");

    const gender =
        params.get("for");


    if (location) {

        locationFilter.value =
            location;

        topLocation.value =
            location;

    }


    if (type) {

        const normalized =
            type.toLowerCase();


        const typeMap = {

            pg: "PG",
            room: "Room",
            flat: "Flat"

        };


        const selectedType =
            typeMap[normalized];


        if (selectedType) {

            const checkbox =
                document.querySelector(
                    `input[name="propertyType"][value="${selectedType}"]`
                );

            if (checkbox) {
                checkbox.checked = true;
            }

            topType.value =
                selectedType;

        }

    }


    if (gender) {

        const genderValue =
            gender.toLowerCase();


        let target =
            "Anyone";


        if (genderValue === "boys") {
            target = "Boys";
        }

        if (genderValue === "girls") {
            target = "Girls";
        }


        const radio =
            document.querySelector(
                `input[name="gender"][value="${target}"]`
            );

        if (radio) {
            radio.checked = true;
        }

    }


    if (budget) {

        let target = null;


        const amount =
            Number(budget);


        if (amount <= 5000) {
            target = "0-5000";
        }

        else if (amount <= 8000) {
            target = "5000-8000";
        }

        else if (amount <= 12000) {
            target = "8000-12000";
        }

        else {
            target = "12000+";
        }


        const checkbox =
            document.querySelector(
                `input[name="budget"][value="${target}"]`
            );

        if (checkbox) {
            checkbox.checked = true;
        }

    }


    if (
        location ||
        type ||
        budget ||
        gender
    ) {

        applyFilters();

    }

}


/* =========================================================
   14. SAVE PROPERTY
========================================================= */

function saveProperty(id) {

    const stringId =
        String(id);


    const index =
        savedProperties.indexOf(
            stringId
        );


    if (index === -1) {

        savedProperties.push(
            stringId
        );

        showToast(
            "Property Saved",
            "Property added to your saved list."
        );

    }

    else {

        savedProperties.splice(
            index,
            1
        );

        showToast(
            "Property Removed",
            "Property removed from saved list."
        );

    }


    localStorage.setItem(
        "roomnestSavedProperties",
        JSON.stringify(savedProperties)
    );


    renderProperties();

}


/* =========================================================
   15. PROPERTY MODAL
========================================================= */

const propertyModal =
    document.getElementById("propertyModal");

const modalContent =
    document.getElementById("modalContent");

const modalClose =
    document.getElementById("modalClose");


function openPropertyModal(id) {

    const property =
        properties.find(
            item =>
                item.id === Number(id)
        );


    if (!property) {
        return;
    }


    modalContent.innerHTML = `

        <img
            class="modal-image"
            src="${property.image}"
            alt="${property.name}"
        >


        <div class="modal-body">

            <span class="modal-type">
                ${property.type} • ${property.roomType}
            </span>

            <h2>
                ${property.name}
            </h2>

            <p class="modal-location">
                📍 ${property.location}
            </p>


            <div class="modal-price">

                ₹${property.price.toLocaleString("en-IN")}

                <span>
                    / month
                </span>

            </div>


            <div class="modal-facilities">

                ${
                    property.facilities
                        .map(
                            item =>
                                `<span>${item}</span>`
                        )
                        .join("")
                }

            </div>


            <div class="modal-owner">

                <div class="owner-avatar">
                    👤
                </div>

                <div class="owner-info">

                    <strong>
                        ${property.owner}
                    </strong>

                    <span>
                        Property Owner
                    </span>

                </div>

            </div>


            <div class="modal-actions">

                <button
                    type="button"
                    class="primary"
                    onclick="contactOwner(${property.id})"
                >
                    Contact Owner
                </button>

                <a
                    href="../property/property.html?id=${property.id}"
                >
                    Full Details
                </a>

            </div>

        </div>

    `;


    propertyModal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


function closePropertyModal() {

    propertyModal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


function contactOwner(id) {

    const property =
        properties.find(
            item =>
                item.id === Number(id)
        );


    closePropertyModal();


    if (!property) {
        return;
    }


    showToast(
        "Login Required",
        "Please login to contact the property owner."
    );

}


/* =========================================================
   16. PROPERTY GRID CLICK
========================================================= */

propertyGrid.addEventListener(
    "click",
    event => {

        const saveButton =
            event.target.closest(
                ".save-property"
            );


        if (saveButton) {

            saveProperty(
                saveButton.dataset.id
            );

            return;

        }


        const viewButton =
            event.target.closest(
                ".view-property"
            );


        if (viewButton) {

            openPropertyModal(
                viewButton.dataset.id
            );

        }

    }
);


/* =========================================================
   17. TOP SEARCH
========================================================= */

document
    .getElementById("topSearch")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            locationFilter.value =
                topLocation.value.trim();


            const selectedType =
                topType.value;


            document
                .querySelectorAll(
                    'input[name="propertyType"]'
                )
                .forEach(input => {

                    input.checked =
                        input.value === selectedType;

                });


            applyFilters();

            window.scrollTo({
                top: 330,
                behavior: "smooth"
            });

        }
    );


/* =========================================================
   18. FILTER EVENTS
========================================================= */

document
    .getElementById("applyFilters")
    .addEventListener(
        "click",
        () => {

            applyFilters();

            closeMobileFilters();

        }
    );


document
    .getElementById("resetFilters")
    .addEventListener(
        "click",
        resetFilters
    );


document
    .getElementById("emptyResetButton")
    .addEventListener(
        "click",
        resetFilters
    );


sortSelect.addEventListener(
    "change",
    () => {

        sortProperties();

        currentPage = 1;

        renderProperties();

    }
);


/* =========================================================
   19. MOBILE FILTER
========================================================= */

document
    .getElementById("mobileFilterButton")
    .addEventListener(
        "click",
        () => {

            filterSidebar.classList.add(
                "open"
            );

            filterOverlay.classList.add(
                "show"
            );

            document.body.style.overflow =
                "hidden";

        }
    );


function closeMobileFilters() {

    filterSidebar.classList.remove(
        "open"
    );

    filterOverlay.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


filterOverlay.addEventListener(
    "click",
    closeMobileFilters
);


/* =========================================================
   20. MODAL CLOSE
========================================================= */

modalClose.addEventListener(
    "click",
    closePropertyModal
);


propertyModal.addEventListener(
    "click",
    event => {

        if (
            event.target === propertyModal
        ) {

            closePropertyModal();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closePropertyModal();

            closeMobileFilters();

        }

    }
);


/* =========================================================
   21. TOAST
========================================================= */

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");

let toastTimer;


function showToast(
    title,
    message
) {

    toastTitle.textContent =
        title;

    toastMessage.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2800
        );

}


/* =========================================================
   22. MOBILE MENU
========================================================= */

const mobileMenuButton =
    document.getElementById(
        "mobileMenuButton"
    );

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


mobileMenuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "open"
        );


        mobileMenuButton.textContent =
            mobileMenu.classList.contains(
                "open"
            )
                ? "✕"
                : "☰";

    }
);


/* =========================================================
   23. INITIAL LOAD
========================================================= */

loadURLFilters();

sortProperties();

renderActiveFilters();

renderProperties();


console.log(
    "RoomNest Search Page loaded successfully."
);