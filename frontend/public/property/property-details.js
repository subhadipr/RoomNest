/* =========================================================
   ROOMNEST — PROPERTY DETAIL
========================================================= */


/* =========================================================
   01. PROPERTY DATA
========================================================= */

const propertyData = {

    1: {
        name: "Green View PG",
        type: "PG",
        roomType: "Single Room",
        location: "Salt Lake, Kolkata",
        price: 7500,
        gender: "Anyone",
        rating: 4.5,
        reviews: 120,

        owner: "Rahul Sharma",

        description:
            "Fully furnished PG for students and working professionals. " +
            "The property is located in a convenient and well-connected " +
            "area with easy access to public transport, markets, restaurants " +
            "and educational institutions. Rooms are clean, comfortable and " +
            "maintained regularly. The property provides a peaceful environment " +
            "for students and working professionals.",

        facilities: [
            ["📶", "WiFi"],
            ["🍱", "Food"],
            ["❄️", "AC"],
            ["🚗", "Parking"],
            ["🚿", "Attached Bathroom"],
            ["🧺", "Washing Machine"],
            ["📹", "CCTV"],
            ["⚡", "Power Backup"],
            ["🪑", "Fully Furnished"]
        ],

        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=85"
        ]
    },


    2: {
        name: "Comfort Stay",
        type: "PG",
        roomType: "Shared Room",
        location: "New Town, Kolkata",
        price: 6000,
        gender: "Girls",
        rating: 4.2,
        reviews: 98,

        owner: "Priya Sen",

        description:
            "Comfortable and student-friendly accommodation in New Town. " +
            "The property provides furnished rooms, food facilities and " +
            "easy connectivity to offices, colleges and shopping areas.",

        facilities: [
            ["📶", "WiFi"],
            ["🍱", "Food"],
            ["❄️", "AC"],
            ["📹", "CCTV"],
            ["⚡", "Power Backup"],
            ["🪑", "Fully Furnished"]
        ],

        images: [
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=85"
        ]
    },


    3: {
        name: "Students Home",
        type: "Room",
        roomType: "Single Room",
        location: "Garia, Kolkata",
        price: 9000,
        gender: "Boys",
        rating: 4.7,
        reviews: 85,

        owner: "Amit Ghosh",

        description:
            "A comfortable single room specially suited for students. " +
            "Located close to transport facilities, local markets and " +
            "educational institutions.",

        facilities: [
            ["📶", "WiFi"],
            ["🚗", "Parking"],
            ["🚿", "Attached Bathroom"],
            ["📹", "CCTV"],
            ["🪑", "Fully Furnished"]
        ],

        images: [
            "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=85"
        ]
    },


    4: {
        name: "Shree PG",
        type: "PG",
        roomType: "Shared Room",
        location: "Ballygunge, Kolkata",
        price: 8000,
        gender: "Anyone",
        rating: 4.3,
        reviews: 76,

        owner: "Rahul Sharma",

        description:
            "Well-maintained PG with food, WiFi and air-conditioning. " +
            "Suitable for students and working professionals looking for " +
            "a comfortable stay in Ballygunge.",

        facilities: [
            ["📶", "WiFi"],
            ["🍱", "Food"],
            ["❄️", "AC"],
            ["🧺", "Washing Machine"],
            ["📹", "CCTV"]
        ],

        images: [
            "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=85",
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=85"
        ]
    }

};


/* =========================================================
   02. GET PROPERTY ID
========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );

const propertyId =
    params.get("id") || "1";


const property =
    propertyData[propertyId] ||
    propertyData[1];


/* =========================================================
   03. DOM
========================================================= */

const propertyName =
    document.getElementById("propertyName");

const propertyLocation =
    document.getElementById("propertyLocation");

const propertyRating =
    document.getElementById("propertyRating");

const propertyReviews =
    document.getElementById("propertyReviews");

const propertyType =
    document.getElementById("propertyType");

const propertyPrice =
    document.getElementById("propertyPrice");

const detailPropertyType =
    document.getElementById(
        "detailPropertyType"
    );

const detailRoomType =
    document.getElementById(
        "detailRoomType"
    );

const detailGender =
    document.getElementById(
        "detailGender"
    );

const propertyDescription =
    document.getElementById(
        "propertyDescription"
    );

const mainPropertyImage =
    document.getElementById(
        "mainPropertyImage"
    );

const thumbnailGrid =
    document.getElementById(
        "thumbnailGrid"
    );

const photoCount =
    document.getElementById(
        "photoCount"
    );

const amenitiesGrid =
    document.getElementById(
        "amenitiesGrid"
    );

const ownerName =
    document.getElementById(
        "ownerName"
    );

const ownerAvatar =
    document.getElementById(
        "ownerAvatar"
    );

const mapLocation =
    document.getElementById(
        "mapLocation"
    );

const locationText =
    document.getElementById(
        "locationText"
    );

const reviewAverage =
    document.getElementById(
        "reviewAverage"
    );


/* =========================================================
   04. LOAD PROPERTY
========================================================= */

function loadProperty() {

    propertyName.textContent =
        property.name;

    propertyLocation.textContent =
        property.location;

    propertyRating.textContent =
        property.rating;

    propertyReviews.textContent =
        `(${property.reviews} reviews)`;

    propertyType.textContent =
        property.type;

    propertyPrice.textContent =
        property.price.toLocaleString(
            "en-IN"
        );

    detailPropertyType.textContent =
        property.type;

    detailRoomType.textContent =
        property.roomType;

    detailGender.textContent =
        property.gender;

    propertyDescription.textContent =
        property.description;

    ownerName.textContent =
        property.owner;

    ownerAvatar.textContent =
        getInitials(property.owner);

    mapLocation.textContent =
        property.location;

    locationText.textContent =
        property.location;

    reviewAverage.textContent =
        property.rating;

    photoCount.textContent =
        property.images.length;


    mainPropertyImage.src =
        property.images[0];

    mainPropertyImage.alt =
        property.name;


    renderThumbnails();

    renderAmenities();

}


/* =========================================================
   05. INITIALS
========================================================= */

function getInitials(name) {

    return name
        .split(" ")
        .map(
            word =>
                word.charAt(0)
        )
        .join("")
        .slice(0, 2)
        .toUpperCase();

}


/* =========================================================
   06. THUMBNAILS
========================================================= */

function renderThumbnails() {

    thumbnailGrid.innerHTML = "";


    property.images.forEach(
        (image, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "thumbnail";


            if (index === 0) {

                button.classList.add(
                    "active"
                );

            }


            if (
                index ===
                property.images.length - 1 &&
                property.images.length > 5
            ) {

                button.classList.add(
                    "more"
                );

            }


            button.innerHTML = `

                <img
                    src="${image}"
                    alt="${property.name} photo ${index + 1}"
                    loading="lazy"
                >

            `;


            button.addEventListener(
                "click",
                () => {

                    mainPropertyImage.src =
                        image;

                    document
                        .querySelectorAll(
                            ".thumbnail"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );

                    button.classList.add(
                        "active"
                    );

                }
            );


            thumbnailGrid.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   07. AMENITIES
========================================================= */

function renderAmenities() {

    amenitiesGrid.innerHTML = "";


    property.facilities.forEach(
        facility => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "amenity";


            item.innerHTML = `

                <span class="amenity-icon">
                    ${facility[0]}
                </span>

                <span>
                    ${facility[1]}
                </span>

            `;


            amenitiesGrid.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   08. SAVE PROPERTY
========================================================= */

const saveButton =
    document.getElementById(
        "saveButton"
    );


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


function updateSaveButton() {

    const isSaved =
        savedProperties.includes(
            String(propertyId)
        );


    saveButton.classList.toggle(
        "saved",
        isSaved
    );


    saveButton.textContent =
        isSaved
            ? "♥ Saved"
            : "♡ Save";

}


saveButton.addEventListener(
    "click",
    () => {

        const id =
            String(propertyId);

        const index =
            savedProperties.indexOf(
                id
            );


        if (index === -1) {

            savedProperties.push(id);

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
                "Property removed from your saved list."
            );

        }


        localStorage.setItem(
            "roomnestSavedProperties",
            JSON.stringify(
                savedProperties
            )
        );


        updateSaveButton();

    }
);


/* =========================================================
   09. CONTACT MODAL
========================================================= */

const contactModal =
    document.getElementById(
        "contactModal"
    );

const contactModalClose =
    document.getElementById(
        "contactModalClose"
    );


function openContactModal() {

    contactModal.classList.add(
        "show"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeContactModal() {

    contactModal.classList.remove(
        "show"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


document
    .getElementById("callOwnerButton")
    .addEventListener(
        "click",
        openContactModal
    );


document
    .getElementById("messageOwnerButton")
    .addEventListener(
        "click",
        openContactModal
    );


document
    .getElementById("inquiryButton")
    .addEventListener(
        "click",
        openContactModal
    );


contactModalClose.addEventListener(
    "click",
    closeContactModal
);


contactModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            contactModal
        ) {

            closeContactModal();

        }

    }
);


/* =========================================================
   10. SHARE
========================================================= */

const shareModal =
    document.getElementById(
        "shareModal"
    );

const shareModalClose =
    document.getElementById(
        "shareModalClose"
    );

const shareButton =
    document.getElementById(
        "shareButton"
    );


shareButton.addEventListener(
    "click",
    () => {

        shareModal.classList.add(
            "show"
        );

        document.body.classList.add(
            "modal-open"
        );

    }
);


shareModalClose.addEventListener(
    "click",
    () => {

        shareModal.classList.remove(
            "show"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }
);


shareModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            shareModal
        ) {

            shareModal.classList.remove(
                "show"
            );

            document.body.classList.remove(
                "modal-open"
            );

        }

    }
);


/* =========================================================
   11. SHARE OPTIONS
========================================================= */

document
    .querySelectorAll(
        "[data-share]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                async () => {

                    const type =
                        button.dataset.share;

                    const url =
                        window.location.href;


                    if (
                        type === "whatsapp"
                    ) {

                        const text =
                            encodeURIComponent(
                                `Check out ${property.name} on RoomNest: ${url}`
                            );


                        window.open(
                            `https://wa.me/?text=${text}`,
                            "_blank"
                        );

                    }


                    if (
                        type === "copy"
                    ) {

                        try {

                            await navigator.clipboard.writeText(
                                url
                            );

                            showToast(
                                "Link Copied",
                                "Property link copied successfully."
                            );

                        }

                        catch {

                            showToast(
                                "Copy Failed",
                                "Please copy the URL from your browser."
                            );

                        }

                    }


                    shareModal.classList.remove(
                        "show"
                    );

                    document.body.classList.remove(
                        "modal-open"
                    );

                }
            );

        }
    );


/* =========================================================
   12. GOOGLE MAPS
========================================================= */

document
    .getElementById("mapButton")
    .addEventListener(
        "click",
        () => {

            const location =
                encodeURIComponent(
                    property.location
                );


            window.open(
                `https://www.google.com/maps/search/?api=1&query=${location}`,
                "_blank"
            );

        }
    );


/* =========================================================
   13. READ MORE
========================================================= */

const readMoreButton =
    document.getElementById(
        "readMoreButton"
    );


let descriptionExpanded =
    false;


const fullDescription =
    property.description;


function updateDescription() {

    if (
        descriptionExpanded
    ) {

        propertyDescription.textContent =
            fullDescription;

        readMoreButton.textContent =
            "Show Less";

    }

    else {

        if (
            fullDescription.length > 210
        ) {

            propertyDescription.textContent =
                `${fullDescription.substring(0, 210)}...`;

            readMoreButton.textContent =
                "Read More";

        }

        else {

            propertyDescription.textContent =
                fullDescription;

            readMoreButton.style.display =
                "none";

        }

    }

}


readMoreButton.addEventListener(
    "click",
    () => {

        descriptionExpanded =
            !descriptionExpanded;

        updateDescription();

    }
);


/* =========================================================
   14. REVIEWS
========================================================= */

document
    .getElementById("allReviewsButton")
    .addEventListener(
        "click",
        () => {

            showToast(
                "Reviews",
                "More reviews will be available here."
            );

        }
    );


/* =========================================================
   15. REPORT
========================================================= */

document
    .getElementById("reportButton")
    .addEventListener(
        "click",
        () => {

            showToast(
                "Report Listing",
                "Please login to report this property."
            );

        }
    );


/* =========================================================
   16. TOAST
========================================================= */

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


let toastTimer;


function showToast(
    title,
    message
) {

    toastTitle.textContent =
        title;

    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


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
   17. MOBILE MENU
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
   18. ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            contactModal.classList.remove(
                "show"
            );

            shareModal.classList.remove(
                "show"
            );

            document.body.classList.remove(
                "modal-open"
            );

        }

    }
);


/* =========================================================
   19. INITIALIZE
========================================================= */

loadProperty();

updateSaveButton();

updateDescription();


console.log(
    "RoomNest Property Detail Page loaded."
);