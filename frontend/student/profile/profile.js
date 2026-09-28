/* =========================================================
   ROOMNEST — STUDENT PROFILE JS
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const sidebar =
    document.getElementById("studentSidebar");

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");

const logoutBtn =
    document.getElementById("logoutBtn");

const notificationBtn =
    document.getElementById("notificationBtn");

const toast =
    document.getElementById("profileToast");

const toastMessage =
    document.getElementById("toastMessage");

const editProfileCard =
    document.getElementById("editProfileCard");

const profileForm =
    document.getElementById("profileForm");


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

mobileMenuBtn.addEventListener("click", () => {

    sidebar.classList.add("open");

    sidebarOverlay.classList.add("show");

});


sidebarOverlay.addEventListener("click", () => {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("show");

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

    }, 2800);

}


/* =========================================================
   NOTIFICATION
========================================================= */

notificationBtn.addEventListener("click", () => {

    showToast(
        "You have 5 unread notifications."
    );

});


/* =========================================================
   OPEN EDIT PROFILE
========================================================= */

const editButtons =
    document.querySelectorAll(".edit-btn");


editButtons.forEach(button => {

    button.addEventListener("click", () => {

        editProfileCard.classList.add("show");

        setTimeout(() => {

            editProfileCard.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    });

});


/* =========================================================
   CLOSE EDIT
========================================================= */

const closeEditBtn =
    document.getElementById("closeEditBtn");

const cancelEditBtn =
    document.getElementById("cancelEditBtn");


function closeEditProfile() {

    editProfileCard.classList.remove("show");

}


closeEditBtn.addEventListener(
    "click",
    closeEditProfile
);


cancelEditBtn.addEventListener(
    "click",
    closeEditProfile
);


/* =========================================================
   PROFILE DATA
========================================================= */

function getProfileData() {

    return {

        name:
            document.getElementById("nameInput").value,

        email:
            document.getElementById("emailInput").value,

        phone:
            document.getElementById("phoneInput").value,

        dob:
            document.getElementById("dobInput").value,

        gender:
            document.getElementById("genderInput").value,

        city:
            document.getElementById("cityInput").value,

        college:
            document.getElementById("collegeInput").value,

        course:
            document.getElementById("courseInput").value,

        year:
            document.getElementById("yearInput").value,

        minBudget:
            document.getElementById("minBudgetInput").value,

        maxBudget:
            document.getElementById("maxBudgetInput").value,

        roomType:
            document.getElementById("roomTypeInput").value,

        food:
            document.getElementById("foodInput").value,

        location:
            document.getElementById("locationInput").value

    };

}


/* =========================================================
   SAVE PROFILE
========================================================= */

profileForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const data =
            getProfileData();


        localStorage.setItem(
            "roomnestStudentProfile",
            JSON.stringify(data)
        );


        updateProfileDisplay(data);


        showToast(
            "Profile updated successfully."
        );


        closeEditProfile();

    }
);


/* =========================================================
   UPDATE DISPLAY
========================================================= */

function updateProfileDisplay(data) {

    document.getElementById(
        "profileDisplayName"
    ).textContent =
        data.name;


    document.getElementById(
        "displayName"
    ).textContent =
        data.name;


    document.getElementById(
        "displayEmail"
    ).textContent =
        data.email;


    document.getElementById(
        "displayPhone"
    ).textContent =
        data.phone;


    document.getElementById(
        "displayGender"
    ).textContent =
        data.gender;


    document.getElementById(
        "displayCity"
    ).textContent =
        data.city;


    document.getElementById(
        "displayCollege"
    ).textContent =
        data.college;


    document.getElementById(
        "displayCourse"
    ).textContent =
        data.course;


    document.getElementById(
        "displayYear"
    ).textContent =
        data.year;


    document.getElementById(
        "displayBudget"
    ).textContent =
        `${data.minBudget} — ${data.maxBudget}`;


    document.getElementById(
        "displayRoomType"
    ).textContent =
        data.roomType;


    document.getElementById(
        "displayLocation"
    ).textContent =
        data.location;


    document.getElementById(
        "displayFood"
    ).textContent =
        data.food;

}


/* =========================================================
   LOAD SAVED PROFILE
========================================================= */

function loadSavedProfile() {

    const saved =
        localStorage.getItem(
            "roomnestStudentProfile"
        );


    if (!saved) return;


    try {

        const data =
            JSON.parse(saved);


        document.getElementById(
            "nameInput"
        ).value =
            data.name || "";


        document.getElementById(
            "emailInput"
        ).value =
            data.email || "";


        document.getElementById(
            "phoneInput"
        ).value =
            data.phone || "";


        document.getElementById(
            "dobInput"
        ).value =
            data.dob || "";


        document.getElementById(
            "genderInput"
        ).value =
            data.gender || "Male";


        document.getElementById(
            "cityInput"
        ).value =
            data.city || "";


        document.getElementById(
            "collegeInput"
        ).value =
            data.college || "";


        document.getElementById(
            "courseInput"
        ).value =
            data.course || "";


        document.getElementById(
            "yearInput"
        ).value =
            data.year || "Graduate";


        document.getElementById(
            "minBudgetInput"
        ).value =
            data.minBudget || "₹5,000";


        document.getElementById(
            "maxBudgetInput"
        ).value =
            data.maxBudget || "₹8,000";


        document.getElementById(
            "roomTypeInput"
        ).value =
            data.roomType || "Single / Double";


        document.getElementById(
            "foodInput"
        ).value =
            data.food || "Both Veg & Non-Veg";


        document.getElementById(
            "locationInput"
        ).value =
            data.location || "";


        updateProfileDisplay(data);

    }

    catch (error) {

        console.log(
            "Unable to load saved profile.",
            error
        );

    }

}


/* =========================================================
   AVATAR
========================================================= */

document
    .getElementById("avatarEditBtn")
    .addEventListener("click", () => {

        showToast(
            "Profile photo upload will be connected with backend later."
        );

    });


/* =========================================================
   PASSWORD MODAL
========================================================= */

const passwordModal =
    document.getElementById("passwordModal");

const changePasswordBtn =
    document.getElementById("changePasswordBtn");

const closePasswordModal =
    document.getElementById("closePasswordModal");

const cancelPasswordBtn =
    document.getElementById("cancelPasswordBtn");

const passwordForm =
    document.getElementById("passwordForm");


function openPasswordModal() {

    passwordModal.classList.add("show");

}


function closePassword() {

    passwordModal.classList.remove("show");

}


changePasswordBtn.addEventListener(
    "click",
    openPasswordModal
);


closePasswordModal.addEventListener(
    "click",
    closePassword
);


cancelPasswordBtn.addEventListener(
    "click",
    closePassword
);


passwordModal.addEventListener(
    "click",
    event => {

        if (event.target === passwordModal) {

            closePassword();

        }

    }
);


/* =========================================================
   PASSWORD UPDATE
========================================================= */

passwordForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const newPassword =
            document.getElementById(
                "newPassword"
            ).value;


        const confirmPassword =
            document.getElementById(
                "confirmPassword"
            ).value;


        if (newPassword.length < 6) {

            showToast(
                "Password must contain at least 6 characters."
            );

            return;

        }


        if (newPassword !== confirmPassword) {

            showToast(
                "Passwords do not match."
            );

            return;

        }


        passwordForm.reset();

        closePassword();


        showToast(
            "Password updated in demo mode."
        );

    }
);


/* =========================================================
   LOGOUT
========================================================= */

logoutBtn.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Are you sure you want to logout?"
            );


        if (!confirmed) return;


        localStorage.removeItem(
            "studentToken"
        );

        localStorage.removeItem(
            "studentUser"
        );


        window.location.href =
            "../../public/auth/login.html";

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadSavedProfile();

        console.log(
            "RoomNest Student Profile loaded successfully."
        );

    }
);