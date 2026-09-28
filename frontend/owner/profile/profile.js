/* =========================================================
   ROOMNEST — OWNER PROFILE
   File: profile.js
   Standalone JavaScript
========================================================= */

"use strict";


/* =========================================================
   01. DEFAULT OWNER DATA
========================================================= */

const defaultOwner = {

    name: "Arindam Roy",

    email: "arindam.roy@example.com",

    phone: "+91 98765 43210",

    dob: "15 March 1994",

    gender: "Male",

    city: "Kolkata",

    location: "Kolkata, West Bengal",

    bio:
        "Property owner providing comfortable and student-friendly accommodation in Kolkata.",

    initials: "AR"

};


/* =========================================================
   02. DOM ELEMENTS
========================================================= */

const ownerSidebar =
    document.getElementById("ownerSidebar");

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");

const logoutBtn =
    document.getElementById("logoutBtn");

const profileMenuBtn =
    document.getElementById("profileMenuBtn");

const editProfileBtn =
    document.getElementById("editProfileBtn");

const avatarEditBtn =
    document.getElementById("avatarEditBtn");

const avatarInput =
    document.getElementById("avatarInput");

const changePasswordBtn =
    document.getElementById("changePasswordBtn");

const twoFactorBtn =
    document.getElementById("twoFactorBtn");

const loginActivityBtn =
    document.getElementById("loginActivityBtn");

const searchBtn =
    document.getElementById("searchBtn");

const notificationBtn =
    document.getElementById("notificationBtn");

const editProfileModal =
    document.getElementById("editProfileModal");

const passwordModal =
    document.getElementById("passwordModal");

const searchModal =
    document.getElementById("searchModal");

const notificationModal =
    document.getElementById("notificationModal");

const profileForm =
    document.getElementById("profileForm");

const passwordForm =
    document.getElementById("passwordForm");

const dashboardSearch =
    document.getElementById("dashboardSearch");

const searchResults =
    document.getElementById("searchResults");

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");

const toastClose =
    document.getElementById("toastClose");

const inquiryToggle =
    document.getElementById("inquiryToggle");

const bookingToggle =
    document.getElementById("bookingToggle");

const emailToggle =
    document.getElementById("emailToggle");


/* =========================================================
   03. INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeProfile
);


function initializeProfile() {

    loadOwner();

    initializeSidebar();

    initializeEditProfile();

    initializePassword();

    initializeAvatar();

    initializePreferences();

    initializeSecurity();

    initializeSearch();

    initializeNotifications();

    initializeModals();

    initializeToast();

    initializeLogout();

    initializeKeyboard();

}


/* =========================================================
   04. LOAD OWNER
========================================================= */

function loadOwner() {

    let owner = getStoredOwner();

    updateProfileUI(owner);

}


/* =========================================================
   05. GET STORED OWNER
========================================================= */

function getStoredOwner() {

    const stored =
        localStorage.getItem(
            "roomnestOwner"
        );

    if (!stored) {

        localStorage.setItem(
            "roomnestOwner",
            JSON.stringify(defaultOwner)
        );

        return {
            ...defaultOwner
        };

    }


    try {

        return {
            ...defaultOwner,
            ...JSON.parse(stored)
        };

    } catch (error) {

        console.warn(
            "Invalid owner data found."
        );

        return {
            ...defaultOwner
        };

    }

}


/* =========================================================
   06. SAVE OWNER
========================================================= */

function saveOwner(owner) {

    localStorage.setItem(
        "roomnestOwner",
        JSON.stringify(owner)
    );

}


/* =========================================================
   07. UPDATE PROFILE UI
========================================================= */

function updateProfileUI(owner) {

    const name =
        owner.name || defaultOwner.name;

    const initials =
        owner.initials ||
        createInitials(name);


    setElementText(
        "sidebarOwnerName",
        name
    );

    setElementText(
        "topbarOwnerName",
        name
    );

    setElementText(
        "profileDisplayName",
        name
    );

    setElementText(
        "profileInitials",
        initials
    );

    setElementText(
        "sidebarAvatar",
        initials
    );

    setElementText(
        "topbarAvatar",
        initials
    );

    setElementText(
        "fullName",
        name
    );

    setElementText(
        "emailAddress",
        owner.email
    );

    setElementText(
        "phoneNumber",
        owner.phone
    );

    setElementText(
        "dateOfBirth",
        owner.dob
    );

    setElementText(
        "gender",
        owner.gender
    );

    setElementText(
        "city",
        owner.city
    );


    const editName =
        document.getElementById(
            "editName"
        );

    const editEmail =
        document.getElementById(
            "editEmail"
        );

    const editPhone =
        document.getElementById(
            "editPhone"
        );

    const editCity =
        document.getElementById(
            "editCity"
        );

    const editGender =
        document.getElementById(
            "editGender"
        );

    const editBio =
        document.getElementById(
            "editBio"
        );


    if (editName) {
        editName.value = name;
    }

    if (editEmail) {
        editEmail.value =
            owner.email || "";
    }

    if (editPhone) {
        editPhone.value =
            owner.phone || "";
    }

    if (editCity) {
        editCity.value =
            owner.city || "";
    }

    if (editGender) {
        editGender.value =
            owner.gender || "Male";
    }

    if (editBio) {
        editBio.value =
            owner.bio || "";
    }


    updateLocation(owner);

}


/* =========================================================
   08. UPDATE LOCATION
========================================================= */

function updateLocation(owner) {

    const location =
        owner.location ||
        `${owner.city || "Kolkata"}, West Bengal`;


    const locationElement =
        document.querySelector(
            ".profile-hero-info > p"
        );

    if (locationElement) {

        locationElement.textContent =
            `📍 ${location}`;

    }

}


/* =========================================================
   09. SET TEXT
========================================================= */

function setElementText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (
        element &&
        value !== undefined &&
        value !== null
    ) {

        element.textContent =
            value;

    }

}


/* =========================================================
   10. CREATE INITIALS
========================================================= */

function createInitials(name) {

    if (!name) {
        return "AR";
    }

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join("")
        .toUpperCase();

}


/* =========================================================
   11. SIDEBAR
========================================================= */

function initializeSidebar() {

    if (mobileMenuBtn) {

        mobileMenuBtn.addEventListener(
            "click",
            toggleSidebar
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    if (
                        window.innerWidth <= 760
                    ) {

                        closeSidebar();

                    }

                }
            );

        });

}


function toggleSidebar() {

    if (ownerSidebar) {

        ownerSidebar.classList.toggle(
            "open"
        );

    }

    if (sidebarOverlay) {

        sidebarOverlay.classList.toggle(
            "show"
        );

    }

}


function closeSidebar() {

    if (ownerSidebar) {

        ownerSidebar.classList.remove(
            "open"
        );

    }

    if (sidebarOverlay) {

        sidebarOverlay.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   12. EDIT PROFILE
========================================================= */

function initializeEditProfile() {

    if (editProfileBtn) {

        editProfileBtn.addEventListener(
            "click",
            openEditProfile
        );

    }


    document
        .querySelectorAll(
            "[data-edit-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                openEditProfile
            );

        });


    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            saveProfileChanges
        );

    }

}


function openEditProfile() {

    const owner =
        getStoredOwner();

    populateProfileForm(owner);

    openModal(
        editProfileModal
    );

}


function populateProfileForm(owner) {

    const fields = {

        editName: owner.name,

        editEmail: owner.email,

        editPhone: owner.phone,

        editCity: owner.city,

        editGender: owner.gender,

        editBio: owner.bio

    };


    Object.entries(fields)
        .forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(
                        id
                    );

                if (element) {

                    element.value =
                        value || "";

                }

            }
        );

}


function saveProfileChanges(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "editName"
        ).value.trim();

    const email =
        document.getElementById(
            "editEmail"
        ).value.trim();

    const phone =
        document.getElementById(
            "editPhone"
        ).value.trim();

    const city =
        document.getElementById(
            "editCity"
        ).value.trim();

    const gender =
        document.getElementById(
            "editGender"
        ).value;

    const bio =
        document.getElementById(
            "editBio"
        ).value.trim();


    if (!name) {

        showToast(
            "Invalid Name",
            "Please enter your full name."
        );

        return;

    }


    if (!email) {

        showToast(
            "Invalid Email",
            "Please enter your email address."
        );

        return;

    }


    if (!phone) {

        showToast(
            "Invalid Phone",
            "Please enter your phone number."
        );

        return;

    }


    const currentOwner =
        getStoredOwner();


    const updatedOwner = {

        ...currentOwner,

        name,

        email,

        phone,

        city,

        gender,

        bio,

        location:
            `${city || "Kolkata"}, West Bengal`,

        initials:
            createInitials(name)

    };


    saveOwner(
        updatedOwner
    );


    updateProfileUI(
        updatedOwner
    );


    closeModal(
        editProfileModal
    );


    showToast(
        "Profile Updated",
        "Your profile information has been saved."
    );

}


/* =========================================================
   13. PASSWORD
========================================================= */

function initializePassword() {

    if (changePasswordBtn) {

        changePasswordBtn.addEventListener(
            "click",
            () => {

                openModal(
                    passwordModal
                );

            }
        );

    }


    if (passwordForm) {

        passwordForm.addEventListener(
            "submit",
            handlePasswordChange
        );

    }

}


function handlePasswordChange(event) {

    event.preventDefault();


    const currentPassword =
        document.getElementById(
            "currentPassword"
        ).value;

    const newPassword =
        document.getElementById(
            "newPassword"
        ).value;

    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        ).value;


    if (!currentPassword) {

        showToast(
            "Password",
            "Enter your current password."
        );

        return;

    }


    if (newPassword.length < 6) {

        showToast(
            "Password",
            "New password must contain at least 6 characters."
        );

        return;

    }


    if (
        newPassword !==
        confirmPassword
    ) {

        showToast(
            "Password",
            "New passwords do not match."
        );

        return;

    }


    /*
     * Demo only.
     * Real password update will be handled
     * by the backend after authentication
     * is connected.
     */

    closeModal(
        passwordModal
    );


    passwordForm.reset();


    showToast(
        "Password Updated",
        "Password update simulated successfully."
    );

}


/* =========================================================
   14. AVATAR
========================================================= */

function initializeAvatar() {

    if (avatarEditBtn) {

        avatarEditBtn.addEventListener(
            "click",
            () => {

                if (avatarInput) {

                    avatarInput.click();

                }

            }
        );

    }


    if (avatarInput) {

        avatarInput.addEventListener(
            "change",
            handleAvatarChange
        );

    }

}


function handleAvatarChange(event) {

    const file =
        event.target.files[0];


    if (!file) {
        return;
    }


    if (
        !file.type.startsWith(
            "image/"
        )
    ) {

        showToast(
            "Invalid File",
            "Please select an image file."
        );

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        function () {

            const imageUrl =
                reader.result;


            updateAvatarPreview(
                imageUrl
            );


            localStorage.setItem(
                "roomnestOwnerAvatar",
                imageUrl
            );


            showToast(
                "Profile Photo",
                "Profile photo updated in demo mode."
            );

        };


    reader.readAsDataURL(
        file
    );

}


function updateAvatarPreview(
    imageUrl
) {

    const avatars =
        document.querySelectorAll(
            ".large-profile-avatar, .owner-avatar, .topbar-avatar"
        );


    avatars.forEach(
        avatar => {

            if (
                avatar.classList.contains(
                    "large-profile-avatar"
                )
            ) {

                avatar.style.backgroundImage =
                    `url("${imageUrl}")`;

                avatar.style.backgroundSize =
                    "cover";

                avatar.style.backgroundPosition =
                    "center";


                const initials =
                    avatar.querySelector(
                        "span"
                    );

                if (initials) {

                    initials.style.display =
                        "none";

                }

                return;

            }


            avatar.style.backgroundImage =
                `url("${imageUrl}")`;

            avatar.style.backgroundSize =
                "cover";

            avatar.style.backgroundPosition =
                "center";

            avatar.style.color =
                "transparent";

        }
    );

}


/* =========================================================
   15. LOAD SAVED AVATAR
========================================================= */

function loadSavedAvatar() {

    const imageUrl =
        localStorage.getItem(
            "roomnestOwnerAvatar"
        );


    if (imageUrl) {

        updateAvatarPreview(
            imageUrl
        );

    }

}


/* =========================================================
   16. PREFERENCES
========================================================= */

function initializePreferences() {

    restorePreference(
        inquiryToggle,
        "roomnestInquiryPreference",
        true
    );

    restorePreference(
        bookingToggle,
        "roomnestBookingPreference",
        true
    );

    restorePreference(
        emailToggle,
        "roomnestEmailPreference",
        true
    );


    setupPreference(
        inquiryToggle,
        "roomnestInquiryPreference",
        "New inquiry settings updated."
    );

    setupPreference(
        bookingToggle,
        "roomnestBookingPreference",
        "Booking request settings updated."
    );

    setupPreference(
        emailToggle,
        "roomnestEmailPreference",
        "Email notification settings updated."
    );

}


function restorePreference(
    element,
    storageKey,
    defaultValue
) {

    if (!element) {
        return;
    }


    const saved =
        localStorage.getItem(
            storageKey
        );


    if (saved === null) {

        element.checked =
            defaultValue;

        return;

    }


    element.checked =
        saved === "true";

}


function setupPreference(
    element,
    storageKey,
    message
) {

    if (!element) {
        return;
    }


    element.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                storageKey,
                String(
                    element.checked
                )
            );


            showToast(
                "Preference Updated",
                message
            );

        }
    );

}


/* =========================================================
   17. SECURITY OPTIONS
========================================================= */

function initializeSecurity() {

    if (twoFactorBtn) {

        twoFactorBtn.addEventListener(
            "click",
            toggleTwoFactor
        );

    }


    if (loginActivityBtn) {

        loginActivityBtn.addEventListener(
            "click",
            () => {

                showToast(
                    "Login Activity",
                    "Recent login activity will appear here."
                );

            }
        );

    }


    updateTwoFactorUI();

}


function toggleTwoFactor() {

    const current =
        localStorage.getItem(
            "roomnestTwoFactor"
        ) === "true";


    const newValue =
        !current;


    localStorage.setItem(
        "roomnestTwoFactor",
        String(newValue)
    );


    updateTwoFactorUI();


    showToast(
        "Security",
        newValue
            ? "Two-factor authentication enabled in demo mode."
            : "Two-factor authentication disabled."
    );

}


function updateTwoFactorUI() {

    if (!twoFactorBtn) {
        return;
    }


    const enabled =
        localStorage.getItem(
            "roomnestTwoFactor"
        ) === "true";


    const status =
        twoFactorBtn.querySelector(
            ".security-status"
        );


    if (status) {

        status.textContent =
            enabled ? "ON" : "OFF";

        status.style.background =
            enabled
                ? "#eaf8f2"
                : "#f2f4f4";

        status.style.color =
            enabled
                ? "#18a874"
                : "#7c8987";

    }

}


/* =========================================================
   18. SEARCH
========================================================= */

function initializeSearch() {

    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            () => {

                openModal(
                    searchModal
                );

                setTimeout(
                    () => {

                        if (dashboardSearch) {

                            dashboardSearch.focus();

                        }

                    },
                    120
                );

            }
        );

    }


    if (dashboardSearch) {

        dashboardSearch.addEventListener(
            "input",
            handleSearch
        );

    }

}


function handleSearch(event) {

    const query =
        event.target.value
            .trim()
            .toLowerCase();


    if (!query) {

        searchResults.innerHTML = `
            <p>
                Search properties, inquiries,
                bookings or settings.
            </p>
        `;

        return;

    }


    const results = [

        {
            icon: "🏠",
            title: "My Properties",
            description: "Manage your PG and room listings.",
            url: "../properties/properties.html"
        },

        {
            icon: "➕",
            title: "Add Property",
            description: "Create a new property listing.",
            url: "../add-property/add-property.html"
        },

        {
            icon: "📩",
            title: "Inquiries",
            description: "View student inquiries.",
            url: "../inquiries/inquiries.html"
        },

        {
            icon: "📅",
            title: "Bookings",
            description: "Manage property bookings.",
            url: "../bookings/bookings.html"
        },

        {
            icon: "💬",
            title: "Messages",
            description: "Chat with students.",
            url: "../messages/messages.html"
        },

        {
            icon: "⭐",
            title: "Reviews",
            description: "View student reviews.",
            url: "../reviews/reviews.html"
        },

        {
            icon: "⚙️",
            title: "Settings",
            description: "Manage owner settings.",
            url: "../settings/settings.html"
        }

    ];


    const filtered =
        results.filter(item => {

            return (
                item.title
                    .toLowerCase()
                    .includes(query) ||

                item.description
                    .toLowerCase()
                    .includes(query)
            );

        });


    renderSearchResults(
        filtered
    );

}


function renderSearchResults(
    results
) {

    if (!searchResults) {
        return;
    }


    if (!results.length) {

        searchResults.innerHTML = `
            <p>
                No matching section found.
            </p>
        `;

        return;

    }


    searchResults.innerHTML =
        results
            .map(item => {

                return `
                    <div
                        class="search-result-item"
                        data-url="${item.url}">

                        <div class="search-result-icon">
                            ${item.icon}
                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(item.title)}
                            </strong>

                            <span>
                                ${escapeHTML(item.description)}
                            </span>

                        </div>

                    </div>
                `;

            })
            .join("");


    document
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
   19. ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   20. NOTIFICATIONS
========================================================= */

function initializeNotifications() {

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            () => {

                openModal(
                    notificationModal
                );

            }
        );

    }

}


/* =========================================================
   21. MODALS
========================================================= */

function initializeModals() {

    document
        .querySelectorAll(
            "[data-close]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const modalId =
                        button.dataset.close;

                    const modal =
                        document.getElementById(
                            modalId
                        );

                    closeModal(
                        modal
                    );

                }
            );

        });


    document
        .querySelectorAll(
            ".modal-overlay"
        )
        .forEach(modal => {

            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target === modal
                    ) {

                        closeModal(
                            modal
                        );

                    }

                }
            );

        });

}


function openModal(modal) {

    if (!modal) {
        return;
    }


    modal.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}


function closeModal(modal) {

    if (!modal) {
        return;
    }


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
   22. TOAST
========================================================= */

let toastTimer = null;


function initializeToast() {

    if (toastClose) {

        toastClose.addEventListener(
            "click",
            hideToast
        );

    }

}


function showToast(
    title,
    message
) {

    if (!toast) {
        return;
    }


    if (toastTitle) {

        toastTitle.textContent =
            title || "Success";

    }


    if (toastMessage) {

        toastMessage.textContent =
            message || "Action completed.";

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

    if (toast) {

        toast.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   23. PROFILE MENU
========================================================= */

if (profileMenuBtn) {

    profileMenuBtn.addEventListener(
        "click",
        () => {

            showToast(
                "Profile",
                "You are currently viewing your profile."
            );

        }
    );

}


/* =========================================================
   24. LOGOUT
========================================================= */

function initializeLogout() {

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            handleLogout
        );

    }

}


function handleLogout() {

    const confirmLogout =
        window.confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {
        return;
    }


    /*
     * Demo logout.
     *
     * We keep profile information so the demo
     * can be reopened later.
     */

    showToast(
        "Logged Out",
        "You have been logged out successfully."
    );


    setTimeout(
        () => {

            window.location.href =
                "../../public/auth/login.html";

        },
        900
    );

}


/* =========================================================
   25. KEYBOARD SHORTCUTS
========================================================= */

function initializeKeyboard() {

    document.addEventListener(
        "keydown",
        event => {

            /* ESC */

            if (
                event.key === "Escape"
            ) {

                closeAllOverlays();

            }


            /* CTRL + K */

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                openModal(
                    searchModal
                );

                setTimeout(
                    () => {

                        if (dashboardSearch) {

                            dashboardSearch.focus();

                        }

                    },
                    100
                );

            }

        }
    );

}


function closeAllOverlays() {

    document
        .querySelectorAll(
            ".modal-overlay.show"
        )
        .forEach(modal => {

            closeModal(
                modal
            );

        });


    closeSidebar();

}


/* =========================================================
   26. WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 760
        ) {

            closeSidebar();

        }

    }
);


/* =========================================================
   27. INITIAL AVATAR
========================================================= */

loadSavedAvatar();


/* =========================================================
   28. CONSOLE
========================================================= */

console.log(
    "RoomNest Owner Profile loaded successfully."
);

console.log(
    "Profile currently running in demo/frontend mode."
);


/* =========================================================
   END
========================================================= */