/* =========================================================
   ROOMNEST — ADMIN SETTINGS
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");

const logoutBtn = document.getElementById("logoutBtn");

const saveAllBtn = document.getElementById("saveAllBtn");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const settingsTabs =
    document.querySelectorAll(".settings-tab");

const settingsSections =
    document.querySelectorAll(".settings-section");


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

menuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("open");

});


document.addEventListener("click", (event) => {

    if (window.innerWidth > 850) return;

    if (
        !sidebar.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {

        sidebar.classList.remove("open");

    }

});


/* =========================================================
   SETTINGS TABS
========================================================= */

settingsTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const target =
            tab.dataset.section;


        settingsTabs.forEach(item => {

            item.classList.remove("active");

        });


        settingsSections.forEach(section => {

            section.classList.remove("active");

        });


        tab.classList.add("active");


        const targetSection =
            document.getElementById(target);


        if (targetSection) {

            targetSection.classList.add("active");

        }

    });

});


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================================
   SAVE SETTINGS
========================================================= */

saveAllBtn.addEventListener("click", () => {

    const settings = {

        adminName:
            document.getElementById("adminName")?.value,

        adminEmail:
            document.getElementById("adminEmail")?.value,

        adminPhone:
            document.getElementById("adminPhone")?.value,

        platformName:
            document.getElementById("platformName")?.value,

        supportEmail:
            document.getElementById("supportEmail")?.value,

        currency:
            document.getElementById("currency")?.value,

        propertyStatus:
            document.getElementById("propertyStatus")?.value,

        platformDescription:
            document.getElementById("platformDescription")?.value

    };


    localStorage.setItem(
        "roomnestAdminSettings",
        JSON.stringify(settings)
    );


    showToast("Settings saved successfully.");

});


/* =========================================================
   LOAD SETTINGS
========================================================= */

function loadSettings() {

    const saved =
        localStorage.getItem(
            "roomnestAdminSettings"
        );


    if (!saved) return;


    try {

        const settings =
            JSON.parse(saved);


        if (settings.adminName) {

            document.getElementById("adminName").value =
                settings.adminName;

        }


        if (settings.adminEmail) {

            document.getElementById("adminEmail").value =
                settings.adminEmail;

        }


        if (settings.adminPhone) {

            document.getElementById("adminPhone").value =
                settings.adminPhone;

        }


        if (settings.platformName) {

            document.getElementById("platformName").value =
                settings.platformName;

        }


        if (settings.supportEmail) {

            document.getElementById("supportEmail").value =
                settings.supportEmail;

        }


        if (settings.currency) {

            document.getElementById("currency").value =
                settings.currency;

        }


        if (settings.propertyStatus) {

            document.getElementById("propertyStatus").value =
                settings.propertyStatus;

        }


        if (settings.platformDescription) {

            document.getElementById(
                "platformDescription"
            ).value =
                settings.platformDescription;

        }

    }

    catch (error) {

        console.log(
            "Unable to load settings.",
            error
        );

    }

}


/* =========================================================
   CHANGE AVATAR
========================================================= */

const changeAvatarBtn =
    document.getElementById("changeAvatarBtn");


changeAvatarBtn.addEventListener("click", () => {

    showToast(
        "Avatar upload will be connected with backend later."
    );

});


/* =========================================================
   PASSWORD MODAL
========================================================= */

const passwordModal =
    document.getElementById("passwordModal");

const changePasswordBtn =
    document.getElementById("changePasswordBtn");

const closePassword =
    document.getElementById("closePassword");

const cancelPassword =
    document.getElementById("cancelPassword");


function openPasswordModal() {

    passwordModal.classList.add("show");

}


function closePasswordModal() {

    passwordModal.classList.remove("show");

}


changePasswordBtn.addEventListener(
    "click",
    openPasswordModal
);


closePassword.addEventListener(
    "click",
    closePasswordModal
);


cancelPassword.addEventListener(
    "click",
    closePasswordModal
);


passwordModal.addEventListener("click", (event) => {

    if (event.target === passwordModal) {

        closePasswordModal();

    }

});


/* =========================================================
   PASSWORD FORM
========================================================= */

const passwordForm =
    document.getElementById("passwordForm");


passwordForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const newPassword =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (newPassword !== confirmPassword) {

        showToast(
            "New passwords do not match."
        );

        return;

    }


    if (newPassword.length < 6) {

        showToast(
            "Password must contain at least 6 characters."
        );

        return;

    }


    closePasswordModal();

    passwordForm.reset();


    showToast(
        "Password updated in demo mode."
    );

});


/* =========================================================
   TWO FACTOR
========================================================= */

const twoFactor =
    document.getElementById("twoFactor");


twoFactor.addEventListener("change", () => {

    if (twoFactor.checked) {

        showToast(
            "Two-factor authentication enabled in demo mode."
        );

    }

    else {

        showToast(
            "Two-factor authentication disabled."
        );

    }

});


/* =========================================================
   LOGIN SESSIONS
========================================================= */

document
    .getElementById("sessionBtn")
    .addEventListener("click", () => {

        showToast(
            "Session management will be connected with backend later."
        );

    });


/* =========================================================
   MAINTENANCE MODE
========================================================= */

const maintenanceMode =
    document.getElementById("maintenanceMode");


maintenanceMode.addEventListener("change", () => {

    if (maintenanceMode.checked) {

        const confirmMode =
            confirm(
                "Enable maintenance mode?"
            );


        if (!confirmMode) {

            maintenanceMode.checked = false;

            return;

        }


        showToast(
            "Maintenance mode enabled in demo mode."
        );

    }

    else {

        showToast(
            "Maintenance mode disabled."
        );

    }

});


/* =========================================================
   CLEAR DATA
========================================================= */

document
    .getElementById("clearDataBtn")
    .addEventListener("click", () => {

        const confirmed =
            confirm(
                "Clear RoomNest demo settings from this browser?"
            );


        if (!confirmed) return;


        localStorage.removeItem(
            "roomnestAdminSettings"
        );


        showToast(
            "Temporary demo data cleared."
        );


        setTimeout(() => {

            location.reload();

        }, 900);

    });


/* =========================================================
   RESET SETTINGS
========================================================= */

document
    .getElementById("resetBtn")
    .addEventListener("click", () => {

        const confirmed =
            confirm(
                "Reset all demo settings to default?"
            );


        if (!confirmed) return;


        localStorage.removeItem(
            "roomnestAdminSettings"
        );


        showToast(
            "Demo settings reset successfully."
        );


        setTimeout(() => {

            location.reload();

        }, 900);

    });


/* =========================================================
   LOGOUT
========================================================= */

logoutBtn.addEventListener("click", () => {

    const confirmed =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmed) return;


    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");


    window.location.href =
        "../../public/auth/login.html";

});


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadSettings();

        console.log(
            "RoomNest Admin Settings loaded."
        );

    }
);