/* =========================================================
   ROOMNEST — OWNER EDIT PROPERTY
========================================================= */


/* =========================================================
   STATE
========================================================= */

let properties = [];

let currentProperty = null;

let newCoverImage = null;

let toastTimer = null;


/* =========================================================
   DOM
========================================================= */

const form =
    document.getElementById(
        "editPropertyForm"
    );

const notFound =
    document.getElementById(
        "notFound"
    );


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadProperties();

        loadOwner();

        findProperty();

        setupEvents();

    }
);


/* =========================================================
   LOAD PROPERTIES
========================================================= */

function loadProperties() {

    const saved =
        localStorage.getItem(
            "roomnestOwnerProperties"
        );


    if (!saved) {

        properties = [];

        return;

    }


    try {

        properties =
            JSON.parse(saved);

    } catch (error) {

        console.error(error);

        properties = [];

    }

}


/* =========================================================
   FIND PROPERTY
========================================================= */

function findProperty() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        params.get("id");


    if (!id) {

        showNotFound();

        return;

    }


    currentProperty =
        properties.find(
            property =>
                String(property.id) ===
                String(id)
        );


    if (!currentProperty) {

        showNotFound();

        return;

    }


    populateForm(
        currentProperty
    );

}


/* =========================================================
   NOT FOUND
========================================================= */

function showNotFound() {

    form.style.display = "none";

    notFound.classList.add(
        "show"
    );

}


/* =========================================================
   POPULATE FORM
========================================================= */

function populateForm(property) {

    document
        .getElementById("propertyTitle")
        .value =
        property.title || "";


    document
        .getElementById("propertyType")
        .value =
        property.type || "";


    document
        .getElementById("gender")
        .value =
        property.gender || "Both";


    document
        .getElementById("totalRooms")
        .value =
        property.rooms || "";


    document
        .getElementById("availableRooms")
        .value =
        property.available ?? "";


    document
        .getElementById("description")
        .value =
        property.description || "";


    document
        .getElementById("city")
        .value =
        property.city || extractCity(property.location);


    document
        .getElementById("area")
        .value =
        property.area || extractArea(property.location);


    document
        .getElementById("address")
        .value =
        property.address || "";


    document
        .getElementById("pincode")
        .value =
        property.pincode || "";


    document
        .getElementById("landmark")
        .value =
        property.landmark || "";


    document
        .getElementById("rent")
        .value =
        property.rent || "";


    document
        .getElementById("securityDeposit")
        .value =
        property.securityDeposit || "";


    document
        .getElementById("maintenance")
        .value =
        property.maintenance || "";


    document
        .getElementById("bookingAmount")
        .value =
        property.bookingAmount || "";


    document
        .getElementById("availabilityDate")
        .value =
        property.availabilityDate || "";


    document
        .getElementById("noticePeriod")
        .value =
        property.noticePeriod || "";


    /* AMENITIES */

    const amenities =
        Array.isArray(property.amenities)
            ? property.amenities
            : [];


    document
        .querySelectorAll(
            'input[name="amenities"]'
        )
        .forEach(input => {

            input.checked =
                amenities.includes(
                    input.value
                );

        });


    /* STATUS */

    const status =
        property.status === "inactive"
            ? "inactive"
            : "active";


    const statusRadio =
        document.querySelector(
            `input[name="status"][value="${status}"]`
        );


    if (statusRadio) {

        statusRadio.checked = true;

    }


    /* IMAGE */

    const image =
        property.image ||
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80";


    document
        .getElementById(
            "coverPreview"
        )
        .src = image;


    document
        .getElementById(
            "propertySubtitle"
        )
        .textContent =
        `Editing: ${property.title}`;


    updateCharacterCount();

}


/* =========================================================
   EXTRACT LOCATION
========================================================= */

function extractCity(location) {

    if (!location) return "";

    const parts =
        location
            .split(",")
            .map(item => item.trim());

    return parts.length
        ? parts[parts.length - 1]
        : "";

}


function extractArea(location) {

    if (!location) return "";

    const parts =
        location
            .split(",")
            .map(item => item.trim());

    return parts.length > 1
        ? parts[0]
        : "";

}


/* =========================================================
   OWNER
========================================================= */

function loadOwner() {

    const saved =
        localStorage.getItem(
            "roomnestOwner"
        );


    if (!saved) return;


    try {

        const owner =
            JSON.parse(saved);

        const name =
            owner.name ||
            "Arindam Roy";


        document
            .getElementById(
                "sidebarOwnerName"
            )
            .textContent =
            name;


        document
            .getElementById(
                "topOwnerName"
            )
            .textContent =
            name;


        const initials =
            getInitials(name);


        document
            .getElementById(
                "sidebarAvatar"
            )
            .textContent =
            initials;


        document
            .getElementById(
                "topAvatar"
            )
            .textContent =
            initials;


    } catch (error) {

        console.error(error);

    }

}


function getInitials(name) {

    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

}


/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {


    form.addEventListener(
        "submit",
        handleSubmit
    );


    document
        .getElementById(
            "description"
        )
        .addEventListener(
            "input",
            updateCharacterCount
        );


    document
        .getElementById(
            "totalRooms"
        )
        .addEventListener(
            "input",
            validateRooms
        );


    document
        .getElementById(
            "availableRooms"
        )
        .addEventListener(
            "input",
            validateRooms
        );


    /* IMAGE */

    document
        .getElementById(
            "changeImageBtn"
        )
        .addEventListener(
            "click",
            () => {

                document
                    .getElementById(
                        "coverImage"
                    )
                    .click();

            }
        );


    document
        .getElementById(
            "coverImage"
        )
        .addEventListener(
            "change",
            handleImage
        );


    /* DRAFT */

    document
        .getElementById(
            "saveDraftBtn"
        )
        .addEventListener(
            "click",
            saveDraft
        );


    /* MOBILE */

    setupMobileSidebar();


    /* SEARCH */

    document
        .getElementById(
            "searchBtn"
        )
        .addEventListener(
            "click",
            openSearch
        );


    document
        .getElementById(
            "globalSearch"
        )
        .addEventListener(
            "input",
            handleSearch
        );


    /* NOTIFICATION */

    document
        .getElementById(
            "notificationBtn"
        )
        .addEventListener(
            "click",
            () => {

                openModal(
                    "notificationModal"
                );

            }
        );


    /* PROFILE */

    document
        .getElementById(
            "profileMenuBtn"
        )
        .addEventListener(
            "click",
            () => {

                window.location.href =
                    "../profile/profile.html";

            }
        );


    /* SUPPORT */

    document
        .getElementById(
            "supportBtn"
        )
        .addEventListener(
            "click",
            () => {

                showToast(
                    "Support",
                    "Support contact option opened.",
                    "info"
                );

            }
        );


    /* LOGOUT */

    document
        .getElementById(
            "logoutBtn"
        )
        .addEventListener(
            "click",
            logout
        );


    /* TOAST */

    document
        .getElementById(
            "toastClose"
        )
        .addEventListener(
            "click",
            hideToast
        );


    /* MODALS */

    document
        .querySelectorAll(
            "[data-close]"
        )
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


    /* ESC */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                document
                    .querySelectorAll(
                        ".modal-overlay.show"
                    )
                    .forEach(modal => {

                        modal.classList.remove(
                            "show"
                        );

                    });

                document.body.style.overflow =
                    "";

            }

        }
    );

}


/* =========================================================
   SUBMIT
========================================================= */

function handleSubmit(event) {

    event.preventDefault();


    if (!validateForm()) {

        showToast(
            "Incomplete Form",
            "Please correct the highlighted fields.",
            "error"
        );

        return;

    }


    const updated =
        collectUpdatedData();


    const index =
        properties.findIndex(
            property =>
                property.id ===
                currentProperty.id
        );


    if (index === -1) {

        showToast(
            "Error",
            "Property could not be updated.",
            "error"
        );

        return;

    }


    properties[index] =
        updated;


    localStorage.setItem(
        "roomnestOwnerProperties",
        JSON.stringify(properties)
    );


    currentProperty =
        updated;


    showToast(
        "Changes Saved",
        "Property information updated successfully.",
        "success"
    );


    setTimeout(() => {

        window.location.href =
            "../properties/properties.html";

    }, 1000);

}


/* =========================================================
   COLLECT UPDATED
========================================================= */

function collectUpdatedData() {

    const amenities =
        [
            ...document.querySelectorAll(
                'input[name="amenities"]:checked'
            )
        ]
        .map(input => input.value);


    const selectedStatus =
        document.querySelector(
            'input[name="status"]:checked'
        );


    const city =
        document
            .getElementById("city")
            .value.trim();


    const area =
        document
            .getElementById("area")
            .value.trim();


    const image =
        newCoverImage ||
        currentProperty.image;


    return {

        ...currentProperty,

        title:
            document
                .getElementById(
                    "propertyTitle"
                )
                .value.trim(),

        type:
            document
                .getElementById(
                    "propertyType"
                )
                .value,

        gender:
            document
                .getElementById(
                    "gender"
                )
                .value,

        rooms:
            Number(
                document
                    .getElementById(
                        "totalRooms"
                    )
                    .value
            ),

        available:
            Number(
                document
                    .getElementById(
                        "availableRooms"
                    )
                    .value
            ),

        description:
            document
                .getElementById(
                    "description"
                )
                .value.trim(),

        city,

        area,

        location:
            `${area}, ${city}`,

        address:
            document
                .getElementById(
                    "address"
                )
                .value.trim(),

        pincode:
            document
                .getElementById(
                    "pincode"
                )
                .value.trim(),

        landmark:
            document
                .getElementById(
                    "landmark"
                )
                .value.trim(),

        rent:
            Number(
                document
                    .getElementById(
                        "rent"
                    )
                    .value
            ),

        securityDeposit:
            Number(
                document
                    .getElementById(
                        "securityDeposit"
                    )
                    .value
            ) || 0,

        maintenance:
            Number(
                document
                    .getElementById(
                        "maintenance"
                    )
                    .value
            ) || 0,

        bookingAmount:
            Number(
                document
                    .getElementById(
                        "bookingAmount"
                    )
                    .value
            ) || 0,

        availabilityDate:
            document
                .getElementById(
                    "availabilityDate"
                )
                .value,

        noticePeriod:
            document
                .getElementById(
                    "noticePeriod"
                )
                .value,

        amenities,

        image,

        status:
            selectedStatus
                ? selectedStatus.value
                : currentProperty.status,

        updatedAt:
            new Date().toISOString()

    };

}


/* =========================================================
   VALIDATE
========================================================= */

function validateForm() {

    clearErrors();

    let valid = true;


    const title =
        document
            .getElementById(
                "propertyTitle"
            )
            .value.trim();


    const total =
        Number(
            document
                .getElementById(
                    "totalRooms"
                )
                .value
        );


    const available =
        Number(
            document
                .getElementById(
                    "availableRooms"
                )
                .value
        );


    const description =
        document
            .getElementById(
                "description"
            )
            .value.trim();


    const pincode =
        document
            .getElementById(
                "pincode"
            )
            .value.trim();


    const rent =
        Number(
            document
                .getElementById(
                    "rent"
                )
                .value
        );


    if (!title) {

        showError(
            "titleError",
            "Property name is required."
        );

        valid = false;

    }


    if (!total || total < 1) {

        showError(
            "roomsError",
            "Enter a valid total room count."
        );

        valid = false;

    }


    if (
        available < 0 ||
        available > total
    ) {

        showError(
            "roomsError",
            "Available rooms cannot exceed total rooms."
        );

        valid = false;

    }


    if (description.length < 20) {

        showError(
            "descriptionError",
            "Description should contain at least 20 characters."
        );

        valid = false;

    }


    if (!/^\d{6}$/.test(pincode)) {

        showToast(
            "Invalid PIN",
            "Enter a valid 6-digit PIN code.",
            "error"
        );

        valid = false;

    }


    if (!rent || rent <= 0) {

        showToast(
            "Invalid Rent",
            "Please enter a valid monthly rent.",
            "error"
        );

        valid = false;

    }


    return valid;

}


/* =========================================================
   ERROR
========================================================= */

function showError(
    id,
    message
) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            message;

    }

}


function clearErrors() {

    document
        .querySelectorAll(
            ".field-error"
        )
        .forEach(element => {

            element.textContent = "";

        });

}


/* =========================================================
   ROOM VALIDATION
========================================================= */

function validateRooms() {

    const total =
        Number(
            document
                .getElementById(
                    "totalRooms"
                )
                .value
        );


    const available =
        Number(
            document
                .getElementById(
                    "availableRooms"
                )
                .value
        );


    if (
        total &&
        available > total
    ) {

        showError(
            "roomsError",
            "Available rooms cannot exceed total rooms."
        );

    } else {

        document
            .getElementById(
                "roomsError"
            )
            .textContent = "";

    }

}


/* =========================================================
   CHARACTER COUNT
========================================================= */

function updateCharacterCount() {

    const description =
        document.getElementById(
            "description"
        );


    document
        .getElementById(
            "characterCount"
        )
        .textContent =
        `${description.value.length} / 500`;

}


/* =========================================================
   IMAGE
========================================================= */

function handleImage(event) {

    const file =
        event.target.files[0];


    if (!file) return;


    if (
        !file.type.startsWith(
            "image/"
        )
    ) {

        showToast(
            "Invalid Image",
            "Please select an image file.",
            "error"
        );

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        function(e) {

            newCoverImage =
                e.target.result;


            document
                .getElementById(
                    "coverPreview"
                )
                .src =
                newCoverImage;


            showToast(
                "Image Updated",
                "New cover image selected.",
                "success"
            );

        };


    reader.readAsDataURL(file);

}


/* =========================================================
   SAVE DRAFT
========================================================= */

function saveDraft() {

    if (!currentProperty) return;


    const draft =
        collectUpdatedData();


    draft.status = "draft";


    localStorage.setItem(
        "roomnestEditPropertyDraft",
        JSON.stringify(draft)
    );


    showToast(
        "Draft Saved",
        "Your property changes were saved as draft.",
        "success"
    );

}


/* =========================================================
   MOBILE SIDEBAR
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

    const menuBtn =
        document.getElementById(
            "mobileMenuBtn"
        );

    const closeBtn =
        document.getElementById(
            "sidebarClose"
        );


    function openSidebar() {

        sidebar.classList.add(
            "open"
        );

        overlay.classList.add(
            "show"
        );

    }


    function closeSidebar() {

        sidebar.classList.remove(
            "open"
        );

        overlay.classList.remove(
            "show"
        );

    }


    menuBtn.addEventListener(
        "click",
        openSidebar
    );


    closeBtn.addEventListener(
        "click",
        closeSidebar
    );


    overlay.addEventListener(
        "click",
        closeSidebar
    );


    document
        .querySelectorAll(
            ".sidebar .nav-item"
        )
        .forEach(item => {

            item.addEventListener(
                "click",
                closeSidebar
            );

        });

}


/* =========================================================
   SEARCH
========================================================= */

function openSearch() {

    openModal(
        "searchModal"
    );


    setTimeout(() => {

        document
            .getElementById(
                "globalSearch"
            )
            .focus();

    }, 100);

}


function handleSearch(event) {

    const query =
        event.target.value
            .trim()
            .toLowerCase();


    const resultBox =
        document.getElementById(
            "globalSearchResults"
        );


    if (!query) {

        resultBox.textContent =
            "Start typing to search.";

        return;

    }


    const pages = [

        {
            title: "Dashboard",
            icon: "📊",
            url: "../dashboard/dashboard.html"
        },

        {
            title: "My Properties",
            icon: "🏠",
            url: "../properties/properties.html"
        },

        {
            title: "Add Property",
            icon: "➕",
            url: "../add-property/add-property.html"
        },

        {
            title: "Inquiries",
            icon: "💬",
            url: "../inquiries/inquiries.html"
        },

        {
            title: "Bookings",
            icon: "📅",
            url: "../bookings/bookings.html"
        },

        {
            title: "Messages",
            icon: "✉️",
            url: "../messages/messages.html"
        },

        {
            title: "Reviews",
            icon: "⭐",
            url: "../reviews/reviews.html"
        },

        {
            title: "Profile",
            icon: "👤",
            url: "../profile/profile.html"
        },

        {
            title: "Settings",
            icon: "⚙️",
            url: "../settings/settings.html"
        }

    ];


    const results =
        pages.filter(
            page =>
                page.title
                    .toLowerCase()
                    .includes(query)
        );


    if (!results.length) {

        resultBox.textContent =
            "No matching page found.";

        return;

    }


    resultBox.innerHTML =
        results.map(page => `

            <div
                data-url="${page.url}"
                style="
                    padding:12px;
                    display:flex;
                    align-items:center;
                    gap:10px;
                    border-bottom:1px solid #edf1f1;
                    cursor:pointer;
                "
            >

                <span>
                    ${page.icon}
                </span>

                <strong>
                    ${page.title}
                </strong>

            </div>

        `).join("");


    resultBox
        .querySelectorAll(
            "[data-url]"
        )
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    window.location.href =
                        item.dataset.url;

                }
            );

        });

}


/* =========================================================
   MODALS
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

    modal.classList.remove(
        "show"
    );

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
   LOGOUT
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
   TOAST
========================================================= */

function showToast(
    title,
    message,
    type = "success"
) {

    const toast =
        document.getElementById(
            "toast"
        );

    const icon =
        document.getElementById(
            "toastIcon"
        );


    document
        .getElementById(
            "toastTitle"
        )
        .textContent =
        title;


    document
        .getElementById(
            "toastMessage"
        )
        .textContent =
        message;


    if (type === "error") {

        icon.textContent = "!";

        icon.style.background =
            "#fff0f0";

        icon.style.color =
            "#e65353";

    }

    else if (type === "info") {

        icon.textContent = "i";

        icon.style.background =
            "#e8f0ff";

        icon.style.color =
            "#4385e5";

    }

    else {

        icon.textContent = "✓";

        icon.style.background =
            "#e9faf5";

        icon.style.color =
            "#12a889";

    }


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            hideToast,
            3500
        );

}


function hideToast() {

    document
        .getElementById(
            "toast"
        )
        .classList.remove(
            "show"
        );

}


/* =========================================================
   OUTSIDE MODAL CLICK
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