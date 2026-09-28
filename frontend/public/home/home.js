/* =========================================================
   ROOMNEST PUBLIC HOME
   File: home.js
========================================================= */


/* =========================================================
   01. MOBILE MENU
========================================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (mobileMenuButton && mobileMenu) {

    mobileMenuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

        const isOpen =
            mobileMenu.classList.contains("open");

        mobileMenuButton.textContent =
            isOpen ? "✕" : "☰";

    });


    document.querySelectorAll(".mobile-link").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            mobileMenuButton.textContent = "☰";

        });

    });

}


/* =========================================================
   02. HOME SEARCH
========================================================= */

const homeSearch =
    document.getElementById("homeSearch");

const searchLocation =
    document.getElementById("searchLocation");

const searchType =
    document.getElementById("searchType");

const searchBudget =
    document.getElementById("searchBudget");

const searchFor =
    document.getElementById("searchFor");


if (homeSearch) {

    homeSearch.addEventListener("submit", event => {

        event.preventDefault();


        const location =
            searchLocation.value.trim();

        const type =
            searchType.value;

        const budget =
            searchBudget.value;

        const gender =
            searchFor.value;


        const params =
            new URLSearchParams();


        if (location) {
            params.set("location", location);
        }

        if (type) {
            params.set("type", type);
        }

        if (budget) {
            params.set("budget", budget);
        }

        if (gender) {
            params.set("for", gender);
        }


        const query =
            params.toString();


        if (query) {

            window.location.href =
                `../search/search.html?${query}`;

        } else {

            window.location.href =
                "../search/search.html";

        }

    });

}


/* =========================================================
   03. SAVE PROPERTY
========================================================= */

let savedProperties = [];


try {

    savedProperties =
        JSON.parse(
            localStorage.getItem(
                "roomnestSavedProperties"
            ) || "[]"
        );

} catch (error) {

    savedProperties = [];

}


const saveButtons =
    document.querySelectorAll(".save-button");


function saveProperties() {

    localStorage.setItem(
        "roomnestSavedProperties",
        JSON.stringify(savedProperties)
    );

}


function updateSavedButtons() {

    saveButtons.forEach(button => {

        const id =
            button.dataset.property;


        if (savedProperties.includes(id)) {

            button.classList.add("saved");

            button.textContent = "♥";

        } else {

            button.classList.remove("saved");

            button.textContent = "♡";

        }

    });

}


saveButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();

        event.stopPropagation();


        const id =
            button.dataset.property;


        const existingIndex =
            savedProperties.indexOf(id);


        if (existingIndex === -1) {

            savedProperties.push(id);

            showToast(
                "Property Saved",
                "Property added to your saved list."
            );

        } else {

            savedProperties.splice(
                existingIndex,
                1
            );

            showToast(
                "Property Removed",
                "Property removed from saved list."
            );

        }


        saveProperties();

        updateSavedButtons();

    });

});


updateSavedButtons();


/* =========================================================
   04. TOAST
========================================================= */

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");


let toastTimer;


function showToast(title, message) {

    if (!toast) {
        return;
    }


    toastTitle.textContent =
        title;

    toastMessage.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

}


/* =========================================================
   05. MOBILE OUTSIDE CLICK
========================================================= */

document.addEventListener("click", event => {

    if (
        !mobileMenu ||
        !mobileMenuButton
    ) {
        return;
    }


    const clickedMenu =
        mobileMenu.contains(event.target);

    const clickedButton =
        mobileMenuButton.contains(event.target);


    if (
        mobileMenu.classList.contains("open") &&
        !clickedMenu &&
        !clickedButton
    ) {

        mobileMenu.classList.remove("open");

        mobileMenuButton.textContent = "☰";

    }

});


/* =========================================================
   06. ESCAPE KEY
========================================================= */

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        mobileMenu &&
        mobileMenu.classList.contains("open")
    ) {

        mobileMenu.classList.remove("open");

        mobileMenuButton.textContent = "☰";

    }

});


/* =========================================================
   07. IMAGE ERROR FALLBACK
========================================================= */

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

        image.style.background =
            "#eaf4f1";

        image.style.objectFit =
            "cover";

    });

});


/* =========================================================
   08. CONSOLE
========================================================= */

console.log(
    "RoomNest Public Home loaded successfully."
);