/* =========================================================
   ROOMNEST — OWNER SETTINGS JS
========================================================= */

"use strict";


/* =========================================================
   STORAGE
========================================================= */

const OWNER_KEY =
    "roomnestOwner";

const SETTINGS_KEY =
    "roomnestOwnerSettings";

const TWO_FACTOR_KEY =
    "roomnestTwoFactor";


/* =========================================================
   DEFAULT SETTINGS
========================================================= */

const defaultSettings = {

    notifications: {

        inquiries: true,

        bookings: true,

        messages: true,

        reviews: true,

        system: true

    },

    privacy: {

        phone: true,

        email: false,

        profile: true

    },

    preferences: {

        language: "english",

        currency: "INR",

        dateFormat: "dd-mm-yyyy",

        propertyView: "grid",

        theme: "light"

    }

};


/* =========================================================
   STATE
========================================================= */

let settings = {};

let owner = {};


/* =========================================================
   DOM
========================================================= */

const sidebar =
    document.getElementById(
        "ownerSidebar"
    );

const overlay =
    document.getElementById(
        "sidebarOverlay"
    );

const toast =
    document.getElementById(
        "toast"
    );


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadOwner();

        loadSettings();

        setupSettingsNavigation();

        setupEvents();

        applySettingsToUI();

    }
);


/* =========================================================
   LOAD OWNER
========================================================= */

function loadOwner() {

    const saved =
        localStorage.getItem(
            OWNER_KEY
        );


    if (saved) {

        try {

            owner =
                JSON.parse(saved);

        } catch {

            owner = {};

        }

    }


    if (
        !owner ||
        typeof owner !==
        "object"
    ) {

        owner = {};

    }


    const name =
        owner.name ||
        owner.fullName ||
        "Subhadip Roy";


    const email =
        owner.email ||
        "owner@roomnest.com";


    const phone =
        owner.phone ||
        "";


    const city =
        owner.city ||
        "";


    const initials =
        getInitials(name);


    /* Top */

    document.getElementById(
        "topOwnerName"
    ).textContent =
        name;


    document.getElementById(
        "topAvatar"
    ).textContent =
        initials;


    /* Sidebar */

    document.getElementById(
        "sidebarOwnerName"
    ).textContent =
        name;


    document.getElementById(
        "sidebarAvatar"
    ).textContent =
        initials;


    /* Settings profile */

    document.getElementById(
        "settingsOwnerName"
    ).textContent =
        name;


    document.getElementById(
        "settingsOwnerEmail"
    ).textContent =
        email;


    document.getElementById(
        "settingsAvatar"
    ).textContent =
        initials;


    /* Account form */

    document.getElementById(
        "fullName"
    ).value =
        name;


    document.getElementById(
        "email"
    ).value =
        email;


    document.getElementById(
        "phone"
    ).value =
        phone;


    document.getElementById(
        "city"
    ).value =
        city;

}


/* =========================================================
   LOAD SETTINGS
========================================================= */

function loadSettings() {

    const saved =
        localStorage.getItem(
            SETTINGS_KEY
        );


    if (!saved) {

        settings =
            structuredClone(
                defaultSettings
            );

        saveSettings();

        return;

    }


    try {

        settings =
            JSON.parse(saved);

    } catch {

        settings =
            structuredClone(
                defaultSettings
            );

        saveSettings();

    }


    settings =
        mergeSettings(
            structuredClone(
                defaultSettings
            ),
            settings
        );

}


/* =========================================================
   MERGE SETTINGS
========================================================= */

function mergeSettings(
    defaults,
    saved
) {

    return {

        ...defaults,

        ...saved,

        notifications: {

            ...defaults.notifications,

            ...(saved.notifications || {})

        },

        privacy: {

            ...defaults.privacy,

            ...(saved.privacy || {})

        },

        preferences: {

            ...defaults.preferences,

            ...(saved.preferences || {})

        }

    };

}


/* =========================================================
   SAVE SETTINGS
========================================================= */

function saveSettings() {

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupSettingsNavigation() {

    document
        .querySelectorAll(
            ".settings-menu-item"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const section =
                            button.dataset.section;


                        document
                            .querySelectorAll(
                                ".settings-menu-item"
                            )
                            .forEach(
                                item =>
                                    item.classList.remove(
                                        "active"
                                    )
                            );


                        document
                            .querySelectorAll(
                                ".settings-section"
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


                        const target =
                            document.getElementById(
                                `section-${section}`
                            );


                        if (target) {

                            target.classList.add(
                                "active"
                            );

                        }


                        closeSidebar();

                    }
                );

            }
        );

}


/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {


    /* Account */

    document.getElementById(
        "saveAccountBtn"
    ).addEventListener(
        "click",
        saveAccount
    );


    document.getElementById(
        "editProfileBtn"
    ).addEventListener(
        "click",
        openEditProfile
    );


    document.getElementById(
        "editProfileForm"
    ).addEventListener(
        "submit",
        saveEditedProfile
    );


    document.getElementById(
        "closeEditProfile"
    ).addEventListener(
        "click",
        closeEditProfile
    );


    document.getElementById(
        "cancelEditProfile"
    ).addEventListener(
        "click",
        closeEditProfile
    );


    /* Notifications */

    document.getElementById(
        "saveNotificationsBtn"
    ).addEventListener(
        "click",
        saveNotifications
    );


    /* Security */

    document.getElementById(
        "changePasswordBtn"
    ).addEventListener(
        "click",
        openPasswordModal
    );


    document.getElementById(
        "closePasswordModal"
    ).addEventListener(
        "click",
        closePasswordModal
    );


    document.getElementById(
        "cancelPassword"
    ).addEventListener(
        "click",
        closePasswordModal
    );


    document.getElementById(
        "passwordForm"
    ).addEventListener(
        "submit",
        changePassword
    );


    document.getElementById(
        "twoFactorToggle"
    ).addEventListener(
        "change",
        saveTwoFactor
    );


    document.getElementById(
        "loginActivityBtn"
    ).addEventListener(
        "click",
        openActivityModal
    );


    document.getElementById(
        "closeActivityModal"
    ).addEventListener(
        "click",
        closeActivityModal
    );


    /* Privacy */

    document.getElementById(
        "savePrivacyBtn"
    ).addEventListener(
        "click",
        savePrivacy
    );


    /* Preferences */

    document.getElementById(
        "savePreferencesBtn"
    ).addEventListener(
        "click",
        savePreferences
    );


    document
        .querySelectorAll(
            ".theme-option"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () =>
                        selectTheme(
                            button.dataset.theme
                        )
                );

            }
        );


    /* Danger */

    document.getElementById(
        "logoutAllBtn"
    ).addEventListener(
        "click",
        logoutAll
    );


    document.getElementById(
        "deactivateBtn"
    ).addEventListener(
        "click",
        deactivateAccount
    );


    document.getElementById(
        "deleteAccountBtn"
    ).addEventListener(
        "click",
        deleteAccount
    );


    /* Search */

    document.getElementById(
        "searchBtn"
    ).addEventListener(
        "click",
        () =>
            openModal(
                document.getElementById(
                    "searchModal"
                )
            )
    );


    document.getElementById(
        "closeSearchModal"
    ).addEventListener(
        "click",
        () =>
            closeModal(
                document.getElementById(
                    "searchModal"
                )
            )
    );


    document.getElementById(
        "settingsSearch"
    ).addEventListener(
        "input",
        searchSettings
    );


    /* Notification */

    document.getElementById(
        "notificationBtn"
    ).addEventListener(
        "click",
        () =>
            openModal(
                document.getElementById(
                    "notificationModal"
                )
            )
    );


    document.getElementById(
        "closeNotificationModal"
    ).addEventListener(
        "click",
        () =>
            closeModal(
                document.getElementById(
                    "notificationModal"
                )
            )
    );


    /* Profile */

    document.getElementById(
        "profileMenuBtn"
    ).addEventListener(
        "click",
        () => {

            window.location.href =
                "../profile/profile.html";

        }
    );


    /* Mobile */

    document.getElementById(
        "mobileMenuBtn"
    ).addEventListener(
        "click",
        openSidebar
    );


    overlay.addEventListener(
        "click",
        closeSidebar
    );


    /* Logout */

    document.getElementById(
        "logoutBtn"
    ).addEventListener(
        "click",
        logout
    );


    /* Toast */

    document.getElementById(
        "toastClose"
    ).addEventListener(
        "click",
        hideToast
    );


    /* Outside click */

    document
        .querySelectorAll(
            ".modal-overlay"
        )
        .forEach(
            modal => {

                modal.addEventListener(
                    "click",
                    event => {

                        if (
                            event.target ===
                            modal
                        ) {

                            closeModal(
                                modal
                            );

                        }

                    }
                );

            }
        );


    /* Escape */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                document
                    .querySelectorAll(
                        ".modal-overlay"
                    )
                    .forEach(
                        closeModal
                    );

            }

        }
    );

}


/* =========================================================
   APPLY UI
========================================================= */

function applySettingsToUI() {


    /* Notifications */

    document.getElementById(
        "newInquiryToggle"
    ).checked =
        settings.notifications.inquiries;


    document.getElementById(
        "newBookingToggle"
    ).checked =
        settings.notifications.bookings;


    document.getElementById(
        "messageToggle"
    ).checked =
        settings.notifications.messages;


    document.getElementById(
        "reviewToggle"
    ).checked =
        settings.notifications.reviews;


    document.getElementById(
        "systemToggle"
    ).checked =
        settings.notifications.system;


    /* Privacy */

    document.getElementById(
        "phoneVisibilityToggle"
    ).checked =
        settings.privacy.phone;


    document.getElementById(
        "emailVisibilityToggle"
    ).checked =
        settings.privacy.email;


    document.getElementById(
        "profileVisibilityToggle"
    ).checked =
        settings.privacy.profile;


    /* Preferences */

    document.getElementById(
        "languageSelect"
    ).value =
        settings.preferences.language;


    document.getElementById(
        "currencySelect"
    ).value =
        settings.preferences.currency;


    document.getElementById(
        "dateFormatSelect"
    ).value =
        settings.preferences.dateFormat;


    document.getElementById(
        "propertyViewSelect"
    ).value =
        settings.preferences.propertyView;


    /* Theme */

    selectThemeButton(
        settings.preferences.theme
    );


    /* Two Factor */

    const twoFactor =
        localStorage.getItem(
            TWO_FACTOR_KEY
        ) === "true";


    document.getElementById(
        "twoFactorToggle"
    ).checked =
        twoFactor;


    updateTwoFactorText(
        twoFactor
    );

}


/* =========================================================
   SAVE ACCOUNT
========================================================= */

function saveAccount() {

    const name =
        document.getElementById(
            "fullName"
        ).value.trim();


    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const phone =
        document.getElementById(
            "phone"
        ).value.trim();


    const city =
        document.getElementById(
            "city"
        ).value.trim();


    if (!name) {

        showToast(
            "Name required",
            "Please enter your full name."
        );

        return;

    }


    if (!email) {

        showToast(
            "Email required",
            "Please enter your email address."
        );

        return;

    }


    owner = {

        ...owner,

        name,

        email,

        phone,

        city

    };


    localStorage.setItem(
        OWNER_KEY,
        JSON.stringify(owner)
    );


    loadOwner();


    showToast(
        "Account updated",
        "Your account information has been saved."
    );

}


/* =========================================================
   EDIT PROFILE
========================================================= */

function openEditProfile() {

    document.getElementById(
        "editName"
    ).value =
        owner.name ||
        owner.fullName ||
        "Subhadip Roy";


    document.getElementById(
        "editEmail"
    ).value =
        owner.email ||
        "owner@roomnest.com";


    document.getElementById(
        "editPhone"
    ).value =
        owner.phone ||
        "";


    document.getElementById(
        "editCity"
    ).value =
        owner.city ||
        "";


    openModal(
        document.getElementById(
            "editProfileModal"
        )
    );

}


function saveEditedProfile(
    event
) {

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


    if (!name || !email) {

        showToast(
            "Invalid information",
            "Name and email are required."
        );

        return;

    }


    owner = {

        ...owner,

        name,

        email,

        phone,

        city

    };


    localStorage.setItem(
        OWNER_KEY,
        JSON.stringify(owner)
    );


    loadOwner();

    closeEditProfile();


    showToast(
        "Profile updated",
        "Your profile has been updated successfully."
    );

}


function closeEditProfile() {

    closeModal(
        document.getElementById(
            "editProfileModal"
        )
    );

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function saveNotifications() {

    settings.notifications = {

        inquiries:
            document.getElementById(
                "newInquiryToggle"
            ).checked,

        bookings:
            document.getElementById(
                "newBookingToggle"
            ).checked,

        messages:
            document.getElementById(
                "messageToggle"
            ).checked,

        reviews:
            document.getElementById(
                "reviewToggle"
            ).checked,

        system:
            document.getElementById(
                "systemToggle"
            ).checked

    };


    saveSettings();


    showToast(
        "Notifications saved",
        "Your notification preferences have been updated."
    );

}


/* =========================================================
   SECURITY
========================================================= */

function openPasswordModal() {

    document
        .getElementById(
            "passwordForm"
        )
        .reset();


    openModal(
        document.getElementById(
            "passwordModal"
        )
    );

}


function closePasswordModal() {

    closeModal(
        document.getElementById(
            "passwordModal"
        )
    );

}


function changePassword(
    event
) {

    event.preventDefault();


    const current =
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


    if (
        newPassword.length <
        8
    ) {

        showToast(
            "Weak password",
            "New password must contain at least 8 characters."
        );

        return;

    }


    if (
        newPassword !==
        confirmPassword
    ) {

        showToast(
            "Password mismatch",
            "New password and confirmation do not match."
        );

        return;

    }


    if (!current) {

        showToast(
            "Current password required",
            "Please enter your current password."
        );

        return;

    }


    /*
       Demo only.
       Real password verification will be handled
       by backend authentication later.
    */


    localStorage.setItem(
        "roomnestOwnerPasswordUpdated",
        "true"
    );


    closePasswordModal();


    showToast(
        "Password updated",
        "Your password has been updated in demo mode."
    );

}


function saveTwoFactor() {

    const enabled =
        document.getElementById(
            "twoFactorToggle"
        ).checked;


    localStorage.setItem(
        TWO_FACTOR_KEY,
        String(enabled)
    );


    updateTwoFactorText(
        enabled
    );


    showToast(
        enabled
            ? "2FA enabled"
            : "2FA disabled",
        enabled
            ? "Two-factor authentication is enabled."
            : "Two-factor authentication is disabled."
    );

}


function updateTwoFactorText(
    enabled
) {

    document.getElementById(
        "twoFactorText"
    ).textContent =
        enabled

            ? "Two-factor authentication is currently enabled."

            : "Add an extra layer of security to your account.";

}


function openActivityModal() {

    openModal(
        document.getElementById(
            "activityModal"
        )
    );

}


function closeActivityModal() {

    closeModal(
        document.getElementById(
            "activityModal"
        )
    );

}


/* =========================================================
   PRIVACY
========================================================= */

function savePrivacy() {

    settings.privacy = {

        phone:
            document.getElementById(
                "phoneVisibilityToggle"
            ).checked,

        email:
            document.getElementById(
                "emailVisibilityToggle"
            ).checked,

        profile:
            document.getElementById(
                "profileVisibilityToggle"
            ).checked

    };


    saveSettings();


    showToast(
        "Privacy saved",
        "Your privacy settings have been updated."
    );

}


/* =========================================================
   PREFERENCES
========================================================= */

function savePreferences() {

    settings.preferences = {

        ...settings.preferences,

        language:
            document.getElementById(
                "languageSelect"
            ).value,

        currency:
            document.getElementById(
                "currencySelect"
            ).value,

        dateFormat:
            document.getElementById(
                "dateFormatSelect"
            ).value,

        propertyView:
            document.getElementById(
                "propertyViewSelect"
            ).value

    };


    saveSettings();


    showToast(
        "Preferences saved",
        "Your dashboard preferences have been saved."
    );

}


function selectTheme(
    theme
) {

    settings.preferences.theme =
        theme;


    saveSettings();


    selectThemeButton(
        theme
    );


    showToast(
        "Theme updated",
        `${capitalize(theme)} theme selected.`
    );

}


function selectThemeButton(
    theme
) {

    document
        .querySelectorAll(
            ".theme-option"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.theme ===
                        theme
                );

            }
        );

}


/* =========================================================
   SEARCH
========================================================= */

const searchableSettings = [

    {
        name: "Account Information",
        section: "account",
        description: "Name, email, phone and city",
        icon: "fa-user"
    },

    {
        name: "Notification Settings",
        section: "notifications",
        description: "Inquiries, bookings and messages",
        icon: "fa-bell"
    },

    {
        name: "Security",
        section: "security",
        description: "Password and two-factor authentication",
        icon: "fa-shield-halved"
    },

    {
        name: "Privacy",
        section: "privacy",
        description: "Profile and contact visibility",
        icon: "fa-lock"
    },

    {
        name: "Preferences",
        section: "preferences",
        description: "Language, currency and theme",
        icon: "fa-sliders"
    },

    {
        name: "Danger Zone",
        section: "danger",
        description: "Account deactivation and deletion",
        icon: "fa-triangle-exclamation"
    }

];


function searchSettings(
    event
) {

    const value =
        event.target.value
            .trim()
            .toLowerCase();


    const container =
        document.getElementById(
            "searchResults"
        );


    if (!value) {

        container.innerHTML = `

            <p>
                Search account, notifications, security or privacy.
            </p>

        `;

        return;

    }


    const results =
        searchableSettings.filter(
            item => {

                return (

                    item.name
                        .toLowerCase()
                        .includes(value)

                    ||

                    item.description
                        .toLowerCase()
                        .includes(value)

                );

            }
        );


    if (
        results.length === 0
    ) {

        container.innerHTML = `

            <p>
                No settings found.
            </p>

        `;

        return;

    }


    container.innerHTML =
        results
            .map(
                item => `

                    <div
                        class="search-result"
                        data-section="${item.section}">

                        <div class="search-result-icon">

                            <i class="fa-solid ${item.icon}"></i>

                        </div>

                        <div>

                            <strong>
                                ${item.name}
                            </strong>

                            <span>
                                ${item.description}
                            </span>

                        </div>

                    </div>

                `
            )
            .join("");


    container
        .querySelectorAll(
            ".search-result"
        )
        .forEach(
            result => {

                result.addEventListener(
                    "click",
                    () => {

                        closeModal(
                            document.getElementById(
                                "searchModal"
                            )
                        );


                        activateSection(
                            result.dataset.section
                        );

                    }
                );

            }
        );

}


/* =========================================================
   ACTIVATE SECTION
========================================================= */

function activateSection(
    section
) {

    document
        .querySelectorAll(
            ".settings-menu-item"
        )
        .forEach(
            item => {

                item.classList.toggle(
                    "active",
                    item.dataset.section ===
                        section
                );

            }
        );


    document
        .querySelectorAll(
            ".settings-section"
        )
        .forEach(
            item => {

                item.classList.remove(
                    "active"
                );

            }
        );


    const target =
        document.getElementById(
            `section-${section}`
        );


    if (target) {

        target.classList.add(
            "active"
        );

    }

}


/* =========================================================
   DANGER ACTIONS
========================================================= */

function logoutAll() {

    const confirmed =
        confirm(
            "Log out from all RoomNest devices?"
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(
        "roomnestOwnerToken"
    );


    showToast(
        "Sessions ended",
        "All active sessions have been cleared in demo mode."
    );

}


function deactivateAccount() {

    const confirmed =
        confirm(
            "Are you sure you want to deactivate your owner account?"
        );


    if (!confirmed) {
        return;
    }


    localStorage.setItem(
        "roomnestOwnerDeactivated",
        "true"
    );


    showToast(
        "Account deactivated",
        "Your account has been marked as deactivated in demo mode."
    );

}


function deleteAccount() {

    const confirmed =
        confirm(
            "This action cannot be undone. Delete your owner account?"
        );


    if (!confirmed) {
        return;
    }


    const secondConfirm =
        confirm(
            "Are you absolutely sure?"
        );


    if (!secondConfirm) {
        return;
    }


    localStorage.removeItem(
        OWNER_KEY
    );

    localStorage.removeItem(
        SETTINGS_KEY
    );

    localStorage.removeItem(
        TWO_FACTOR_KEY
    );


    showToast(
        "Account deleted",
        "Owner account data has been removed from this demo."
    );


    setTimeout(
        () => {

            window.location.href =
                "../../public/auth/login.html";

        },
        1200
    );

}


/* =========================================================
   MODALS
========================================================= */

function openModal(
    modal
) {

    if (!modal) {
        return;
    }

    modal.classList.add(
        "show"
    );

}


function closeModal(
    modal
) {

    if (!modal) {
        return;
    }

    modal.classList.remove(
        "show"
    );

}


/* =========================================================
   SIDEBAR
========================================================= */

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


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    const confirmed =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(
        "roomnestOwner"
    );

    localStorage.removeItem(
        "roomnestOwnerToken"
    );


    window.location.href =
        "../../public/auth/login.html";

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(
    title,
    message
) {

    document.getElementById(
        "toastTitle"
    ).textContent =
        title;


    document.getElementById(
        "toastMessage"
    ).textContent =
        message;


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

    toast.classList.remove(
        "show"
    );

}


/* =========================================================
   HELPERS
========================================================= */

function getInitials(
    name
) {

    if (!name) {
        return "RN";
    }


    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(
            word =>
                word.charAt(0)
        )
        .join("")
        .toUpperCase();

}


function capitalize(
    value
) {

    if (!value) {
        return "";
    }


    return value
        .charAt(0)
        .toUpperCase() +
        value.slice(1);

}


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth >
            1000
        ) {

            closeSidebar();

        }

    }
);