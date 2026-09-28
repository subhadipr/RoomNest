/* =========================================================
   ROOMNEST — OWNER ADD PROPERTY
========================================================= */


/* =========================================================
   STATE
========================================================= */

let selectedImages = [];

let toastTimer = null;


/* =========================================================
   DOM
========================================================= */

const propertyForm =
    document.getElementById("propertyForm");

const propertyImages =
    document.getElementById("propertyImages");

const uploadArea =
    document.getElementById("uploadArea");

const imagePreviewGrid =
    document.getElementById("imagePreviewGrid");

const characterCount =
    document.getElementById("characterCount");


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadOwnerInfo();

        setupEvents();

        loadDraft();

    }
);


/* =========================================================
   OWNER INFO
========================================================= */

function loadOwnerInfo() {

    const saved =
        localStorage.getItem("roomnestOwner");

    if (!saved) return;


    try {

        const owner =
            JSON.parse(saved);

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
            .getElementById("sidebarAvatar")
            .textContent = initials;

        document
            .getElementById("topAvatar")
            .textContent = initials;


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
   EVENTS
========================================================= */

function setupEvents() {


    /* FORM */

    propertyForm.addEventListener(
        "submit",
        handleSubmit
    );


    propertyForm.addEventListener(
        "reset",
        () => {

            setTimeout(() => {

                selectedImages = [];

                renderImagePreviews();

                clearErrors();

                updateCharacterCount();

            }, 0);

        }
    );


    /* DESCRIPTION */

    document
        .getElementById("description")
        .addEventListener(
            "input",
            updateCharacterCount
        );


    /* AVAILABLE ROOMS */

    document
        .getElementById("totalRooms")
        .addEventListener(
            "input",
            validateRoomCount
        );

    document
        .getElementById("availableRooms")
        .addEventListener(
            "input",
            validateRoomCount
        );


    /* IMAGE UPLOAD */

    document
        .getElementById("chooseImagesBtn")
        .addEventListener(
            "click",
            () => propertyImages.click()
        );


    propertyImages.addEventListener(
        "change",
        handleImageSelection
    );


    /* DRAG & DROP */

    uploadArea.addEventListener(
        "dragover",
        event => {

            event.preventDefault();

            uploadArea.classList.add(
                "dragover"
            );

        }
    );


    uploadArea.addEventListener(
        "dragleave",
        () => {

            uploadArea.classList.remove(
                "dragover"
            );

        }
    );


    uploadArea.addEventListener(
        "drop",
        event => {

            event.preventDefault();

            uploadArea.classList.remove(
                "dragover"
            );

            const files =
                [...event.dataTransfer.files];

            processImages(files);

        }
    );


    uploadArea.addEventListener(
        "click",
        event => {

            if (
                event.target.closest(
                    ".upload-btn"
                )
            ) return;

            propertyImages.click();

        }
    );


    /* DRAFT */

    document
        .getElementById("saveDraftBtn")
        .addEventListener(
            "click",
            saveDraft
        );


    /* MOBILE SIDEBAR */

    setupMobileSidebar();


    /* SEARCH */

    document
        .getElementById("searchBtn")
        .addEventListener(
            "click",
            openSearch
        );


    document
        .getElementById("globalSearch")
        .addEventListener(
            "input",
            handleGlobalSearch
        );


    /* NOTIFICATION */

    document
        .getElementById("notificationBtn")
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
        .getElementById("profileMenuBtn")
        .addEventListener(
            "click",
            () => {

                window.location.href =
                    "../profile/profile.html";

            }
        );


    /* SUPPORT */

    document
        .getElementById("supportBtn")
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
        .getElementById("logoutBtn")
        .addEventListener(
            "click",
            logout
        );


    /* TOAST */

    document
        .getElementById("toastClose")
        .addEventListener(
            "click",
            hideToast
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


    /* SUCCESS */

    document
        .getElementById("successOkBtn")
        .addEventListener(
            "click",
            () => {

                window.location.href =
                    "../properties/properties.html";

            }
        );


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
   FORM SUBMIT
========================================================= */

function handleSubmit(event) {

    event.preventDefault();


    clearErrors();


    if (!validateForm()) {

        showToast(
            "Incomplete Form",
            "Please complete the required fields.",
            "error"
        );

        return;
    }


    const property =
        collectFormData();


    saveProperty(property);


    localStorage.removeItem(
        "roomnestOwnerPropertyDraft"
    );


    openModal("successModal");


    propertyForm.reset();

    selectedImages = [];

    renderImagePreviews();

}


/* =========================================================
   VALIDATE
========================================================= */

function validateForm() {

    let valid = true;


    const title =
        document
            .getElementById("propertyTitle")
            .value.trim();

    const type =
        document
            .getElementById("propertyType")
            .value;

    const gender =
        document
            .getElementById("gender")
            .value;

    const totalRooms =
        Number(
            document
                .getElementById("totalRooms")
                .value
        );

    const availableRooms =
        Number(
            document
                .getElementById("availableRooms")
                .value
        );

    const description =
        document
            .getElementById("description")
            .value.trim();

    const city =
        document
            .getElementById("city")
            .value.trim();

    const area =
        document
            .getElementById("area")
            .value.trim();

    const address =
        document
            .getElementById("address")
            .value.trim();

    const pincode =
        document
            .getElementById("pincode")
            .value.trim();

    const rent =
        Number(
            document
                .getElementById("rent")
                .value
        );

    const terms =
        document
            .getElementById("termsCheck")
            .checked;


    if (!title) {

        showFieldError(
            "titleError",
            "Property name is required."
        );

        valid = false;

    }


    if (!type) {

        showFieldError(
            "typeError",
            "Please select a property type."
        );

        valid = false;

    }


    if (!gender) {

        showFieldError(
            "genderError",
            "Please select suitable category."
        );

        valid = false;

    }


    if (!totalRooms || totalRooms < 1) {

        showFieldError(
            "roomsError",
            "Enter a valid room count."
        );

        valid = false;

    }


    if (
        availableRooms < 0 ||
        availableRooms > totalRooms
    ) {

        showFieldError(
            "availableError",
            "Available rooms cannot exceed total rooms."
        );

        valid = false;

    }


    if (description.length < 20) {

        showFieldError(
            "descriptionError",
            "Description should contain at least 20 characters."
        );

        valid = false;

    }


    if (!city) {

        showToast(
            "Location Required",
            "Please enter the city.",
            "error"
        );

        valid = false;

    }


    if (!area) {

        showToast(
            "Location Required",
            "Please enter the locality.",
            "error"
        );

        valid = false;

    }


    if (!address) {

        showToast(
            "Address Required",
            "Please enter the full address.",
            "error"
        );

        valid = false;

    }


    if (!/^\d{6}$/.test(pincode)) {

        showToast(
            "Invalid PIN",
            "Please enter a valid 6-digit PIN code.",
            "error"
        );

        valid = false;

    }


    if (!rent || rent <= 0) {

        showToast(
            "Rent Required",
            "Please enter a valid monthly rent.",
            "error"
        );

        valid = false;

    }


    if (!terms) {

        showToast(
            "Confirmation Required",
            "Please confirm the listing information.",
            "error"
        );

        valid = false;

    }


    return valid;

}


/* =========================================================
   FIELD ERROR
========================================================= */

function showFieldError(
    elementId,
    message
) {

    const element =
        document.getElementById(
            elementId
        );

    if (element) {
        element.textContent = message;
    }

}


function clearErrors() {

    document
        .querySelectorAll(".field-error")
        .forEach(element => {

            element.textContent = "";

        });

}


/* =========================================================
   ROOM VALIDATION
========================================================= */

function validateRoomCount() {

    const total =
        Number(
            document
                .getElementById("totalRooms")
                .value
        );

    const available =
        Number(
            document
                .getElementById("availableRooms")
                .value
        );


    if (
        total &&
        available > total
    ) {

        showFieldError(
            "availableError",
            "Available rooms cannot exceed total rooms."
        );

    } else {

        const error =
            document.getElementById(
                "availableError"
            );

        error.textContent = "";

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

    const count =
        description.value.length;

    characterCount.textContent =
        `${count} / 500`;

}


/* =========================================================
   COLLECT FORM DATA
========================================================= */

function collectFormData() {

    const amenities =
        [
            ...document.querySelectorAll(
                'input[name="amenities"]:checked'
            )
        ]
        .map(input => input.value);


    return {

        id: Date.now(),

        title:
            document
                .getElementById("propertyTitle")
                .value.trim(),

        type:
            document
                .getElementById("propertyType")
                .value,

        gender:
            document
                .getElementById("gender")
                .value,

        rooms:
            Number(
                document
                    .getElementById("totalRooms")
                    .value
            ),

        available:
            Number(
                document
                    .getElementById("availableRooms")
                    .value
            ),

        description:
            document
                .getElementById("description")
                .value.trim(),

        city:
            document
                .getElementById("city")
                .value.trim(),

        area:
            document
                .getElementById("area")
                .value.trim(),

        address:
            document
                .getElementById("address")
                .value.trim(),

        pincode:
            document
                .getElementById("pincode")
                .value.trim(),

        landmark:
            document
                .getElementById("landmark")
                .value.trim(),

        rent:
            Number(
                document
                    .getElementById("rent")
                    .value
            ),

        securityDeposit:
            Number(
                document
                    .getElementById("securityDeposit")
                    .value
            ) || 0,

        maintenance:
            Number(
                document
                    .getElementById("maintenance")
                    .value
            ) || 0,

        bookingAmount:
            Number(
                document
                    .getElementById("bookingAmount")
                    .value
            ) || 0,

        availabilityDate:
            document
                .getElementById("availabilityDate")
                .value,

        noticePeriod:
            document
                .getElementById("noticePeriod")
                .value,

        amenities,

        images:
            selectedImages.map(
                image => image.data
            ),

        status: "pending",

        rating: 0,

        reviews: 0,

        created:
            new Date().toISOString()

    };

}


/* =========================================================
   SAVE PROPERTY
========================================================= */

function saveProperty(property) {

    let properties = [];


    const saved =
        localStorage.getItem(
            "roomnestOwnerProperties"
        );


    if (saved) {

        try {

            properties =
                JSON.parse(saved);

        } catch {

            properties = [];

        }

    }


    properties.push(property);


    localStorage.setItem(
        "roomnestOwnerProperties",
        JSON.stringify(properties)
    );

}


/* =========================================================
   IMAGE SELECTION
========================================================= */

function handleImageSelection(event) {

    const files =
        [...event.target.files];

    processImages(files);

    event.target.value = "";

}


function processImages(files) {

    if (!files.length) return;


    const imageFiles =
        files.filter(
            file =>
                file.type.startsWith("image/")
        );


    if (!imageFiles.length) {

        showToast(
            "Invalid File",
            "Please select image files only.",
            "error"
        );

        return;

    }


    const remaining =
        5 - selectedImages.length;


    if (remaining <= 0) {

        showToast(
            "Maximum Reached",
            "You can upload a maximum of 5 images.",
            "error"
        );

        return;

    }


    imageFiles
        .slice(0, remaining)
        .forEach(file => {

            const reader =
                new FileReader();


            reader.onload = event => {

                selectedImages.push({

                    name: file.name,

                    data: event.target.result

                });


                renderImagePreviews();

            };


            reader.readAsDataURL(file);

        });


    if (imageFiles.length > remaining) {

        showToast(
            "Image Limit",
            "Only 5 images can be uploaded.",
            "info"
        );

    }

}


/* =========================================================
   RENDER IMAGE PREVIEW
========================================================= */

function renderImagePreviews() {

    imagePreviewGrid.innerHTML = "";


    selectedImages.forEach(
        (image, index) => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "preview-item";


            item.innerHTML = `

                <img
                    src="${image.data}"
                    alt="Property preview"
                >

                <button
                    type="button"
                    class="remove-preview"
                    data-index="${index}"
                    title="Remove image"
                >
                    ×
                </button>

            `;


            item
                .querySelector(
                    ".remove-preview"
                )
                .addEventListener(
                    "click",
                    () => {

                        selectedImages.splice(
                            index,
                            1
                        );

                        renderImagePreviews();

                    }
                );


            imagePreviewGrid.appendChild(item);

        }
    );

}


/* =========================================================
   SAVE DRAFT
========================================================= */

function saveDraft() {

    const draft =
        collectFormData();


    draft.status = "draft";


    localStorage.setItem(
        "roomnestOwnerPropertyDraft",
        JSON.stringify(draft)
    );


    showToast(
        "Draft Saved",
        "Your property draft has been saved.",
        "success"
    );

}


/* =========================================================
   LOAD DRAFT
========================================================= */

function loadDraft() {

    const saved =
        localStorage.getItem(
            "roomnestOwnerPropertyDraft"
        );


    if (!saved) return;


    try {

        const draft =
            JSON.parse(saved);


        if (draft.title) {

            document
                .getElementById(
                    "propertyTitle"
                )
                .value =
                draft.title;

        }


        if (draft.type) {

            document
                .getElementById(
                    "propertyType"
                )
                .value =
                draft.type;

        }


        if (draft.gender) {

            document
                .getElementById(
                    "gender"
                )
                .value =
                draft.gender;

        }


        if (draft.rooms) {

            document
                .getElementById(
                    "totalRooms"
                )
                .value =
                draft.rooms;

        }


        if (
            draft.available !== undefined
        ) {

            document
                .getElementById(
                    "availableRooms"
                )
                .value =
                draft.available;

        }


        if (draft.description) {

            document
                .getElementById(
                    "description"
                )
                .value =
                draft.description;

        }


        if (draft.city) {

            document
                .getElementById(
                    "city"
                )
                .value =
                draft.city;

        }


        if (draft.area) {

            document
                .getElementById(
                    "area"
                )
                .value =
                draft.area;

        }


        if (draft.address) {

            document
                .getElementById(
                    "address"
                )
                .value =
                draft.address;

        }


        if (draft.pincode) {

            document
                .getElementById(
                    "pincode"
                )
                .value =
                draft.pincode;

        }


        if (draft.landmark) {

            document
                .getElementById(
                    "landmark"
                )
                .value =
                draft.landmark;

        }


        if (draft.rent) {

            document
                .getElementById(
                    "rent"
                )
                .value =
                draft.rent;

        }


        if (draft.securityDeposit) {

            document
                .getElementById(
                    "securityDeposit"
                )
                .value =
                draft.securityDeposit;

        }


        if (draft.maintenance) {

            document
                .getElementById(
                    "maintenance"
                )
                .value =
                draft.maintenance;

        }


        if (draft.bookingAmount) {

            document
                .getElementById(
                    "bookingAmount"
                )
                .value =
                draft.bookingAmount;

        }


        if (draft.availabilityDate) {

            document
                .getElementById(
                    "availabilityDate"
                )
                .value =
                draft.availabilityDate;

        }


        if (draft.noticePeriod) {

            document
                .getElementById(
                    "noticePeriod"
                )
                .value =
                draft.noticePeriod;

        }


        if (Array.isArray(draft.amenities)) {

            document
                .querySelectorAll(
                    'input[name="amenities"]'
                )
                .forEach(input => {

                    input.checked =
                        draft.amenities.includes(
                            input.value
                        );

                });

        }


        updateCharacterCount();


        showToast(
            "Draft Restored",
            "Your saved draft has been restored.",
            "info"
        );


    } catch (error) {

        console.error(
            "Draft error:",
            error
        );

    }

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

        sidebar.classList.add("open");

        overlay.classList.add("show");

    }


    function closeSidebar() {

        sidebar.classList.remove("open");

        overlay.classList.remove("show");

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

    openModal("searchModal");


    setTimeout(() => {

        document
            .getElementById(
                "globalSearch"
            )
            .focus();

    }, 100);

}


function handleGlobalSearch(event) {

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
            url: "../dashboard/dashboard.html",
            icon: "📊"
        },

        {
            title: "My Properties",
            url: "../properties/properties.html",
            icon: "🏠"
        },

        {
            title: "Add Property",
            url: "add-property.html",
            icon: "➕"
        },

        {
            title: "Inquiries",
            url: "../inquiries/inquiries.html",
            icon: "💬"
        },

        {
            title: "Bookings",
            url: "../bookings/bookings.html",
            icon: "📅"
        },

        {
            title: "Messages",
            url: "../messages/messages.html",
            icon: "✉️"
        },

        {
            title: "Reviews",
            url: "../reviews/reviews.html",
            icon: "⭐"
        },

        {
            title: "My Profile",
            url: "../profile/profile.html",
            icon: "👤"
        },

        {
            title: "Settings",
            url: "../settings/settings.html",
            icon: "⚙️"
        }

    ];


    const results =
        pages.filter(page =>
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
        results
            .map(page => `

                <div
                    class="search-result-item"
                    data-url="${page.url}"
                    style="
                        padding:12px;
                        display:flex;
                        align-items:center;
                        gap:10px;
                        border-bottom:1px solid #edf1f1;
                        cursor:pointer;
                        font-size:11px;
                    "
                >

                    <span style="
                        width:35px;
                        height:35px;
                        display:grid;
                        place-items:center;
                        border-radius:8px;
                        background:#e9faf5;
                    ">
                        ${page.icon}
                    </span>

                    <strong>
                        ${page.title}
                    </strong>

                </div>

            `)
            .join("");


    resultBox
        .querySelectorAll(
            ".search-result-item"
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
   MODAL
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

    const toastTitle =
        document.getElementById(
            "toastTitle"
        );

    const toastMessage =
        document.getElementById(
            "toastMessage"
        );

    const toastIcon =
        document.getElementById(
            "toastIcon"
        );


    toastTitle.textContent =
        title;

    toastMessage.textContent =
        message;


    if (type === "error") {

        toastIcon.textContent = "!";

        toastIcon.style.background =
            "#fff0f0";

        toastIcon.style.color =
            "#e65353";

    }

    else if (type === "info") {

        toastIcon.textContent = "i";

        toastIcon.style.background =
            "#e8f0ff";

        toastIcon.style.color =
            "#4385e5";

    }

    else {

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