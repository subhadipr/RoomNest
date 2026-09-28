/* =========================================================
   ROOMNEST — ADMIN OWNERS
   File: owners.js
========================================================= */

"use strict";


/* =========================================================
   DOM
========================================================= */

const sidebar =
    document.getElementById("adminSidebar");

const sidebarToggle =
    document.getElementById("sidebarToggle");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");

const logoutBtn =
    document.getElementById("logoutBtn");

const notificationBtn =
    document.getElementById("notificationBtn");

const ownerSearch =
    document.getElementById("ownerSearch");

const topSearch =
    document.getElementById("topSearch");

const statusFilter =
    document.getElementById("statusFilter");

const verificationFilter =
    document.getElementById("verificationFilter");

const selectAll =
    document.getElementById("selectAll");

const selectedCount =
    document.getElementById("selectedCount");

const addOwnerBtn =
    document.getElementById("addOwnerBtn");

const currentYear =
    document.getElementById("currentYear");


/* =========================================================
   YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   SIDEBAR
========================================================= */

function openSidebar() {

    sidebar?.classList.add(
        "sidebar-open"
    );

    sidebarOverlay?.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


function closeSidebar() {

    sidebar?.classList.remove(
        "sidebar-open"
    );

    sidebarOverlay?.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


sidebarToggle?.addEventListener(
    "click",
    function () {

        if (
            sidebar?.classList.contains(
                "sidebar-open"
            )
        ) {

            closeSidebar();

        } else {

            openSidebar();

        }

    }
);


sidebarOverlay?.addEventListener(
    "click",
    closeSidebar
);


/* =========================================================
   FILTER OWNERS
========================================================= */

function filterOwners() {

    const searchValue =
        ownerSearch?.value
            .trim()
            .toLowerCase() || "";


    const statusValue =
        statusFilter?.value || "all";


    const verificationValue =
        verificationFilter?.value || "all";


    const rows =
        document.querySelectorAll(
            "#ownersTableBody tr"
        );


    rows.forEach(function (row) {

        const name =
            row.dataset.name
                ?.toLowerCase() || "";


        const email =
            row.dataset.email
                ?.toLowerCase() || "";


        const phone =
            row.dataset.phone
                ?.toLowerCase() || "";


        const status =
            row.dataset.status || "";


        const verification =
            row.dataset.verification || "";


        const matchesSearch =
            searchValue === "" ||
            name.includes(searchValue) ||
            email.includes(searchValue) ||
            phone.includes(searchValue);


        const matchesStatus =
            statusValue === "all" ||
            status === statusValue;


        const matchesVerification =
            verificationValue === "all" ||
            verification === verificationValue;


        row.style.display =
            matchesSearch &&
            matchesStatus &&
            matchesVerification
                ? ""
                : "none";

    });

}


ownerSearch?.addEventListener(
    "input",
    filterOwners
);


statusFilter?.addEventListener(
    "change",
    filterOwners
);


verificationFilter?.addEventListener(
    "change",
    filterOwners
);


/* =========================================================
   TOP SEARCH
========================================================= */

topSearch?.addEventListener(
    "input",
    function () {

        if (ownerSearch) {

            ownerSearch.value =
                this.value;

        }

        filterOwners();

    }
);


/* =========================================================
   SELECT ALL
========================================================= */

selectAll?.addEventListener(
    "change",
    function () {

        const checkboxes =
            document.querySelectorAll(
                ".owner-checkbox"
            );


        checkboxes.forEach(
            function (checkbox) {

                checkbox.checked =
                    selectAll.checked;

            }
        );


        updateSelectedCount();

    }
);


/* =========================================================
   INDIVIDUAL CHECKBOX
========================================================= */

document
    .querySelectorAll(".owner-checkbox")
    .forEach(function (checkbox) {

        checkbox.addEventListener(
            "change",
            updateSelectedCount
        );

    });


function updateSelectedCount() {

    const selected =
        document.querySelectorAll(
            ".owner-checkbox:checked"
        ).length;


    if (selectedCount) {

        selectedCount.textContent =
            `${selected} selected`;

    }


    const total =
        document.querySelectorAll(
            ".owner-checkbox"
        ).length;


    if (selectAll) {

        selectAll.checked =
            selected > 0 &&
            selected === total;

    }

}


/* =========================================================
   VIEW OWNER
========================================================= */

document
    .querySelectorAll(".action-btn.view")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    this.closest("tr");


                const name =
                    row
                        ?.querySelector(
                            ".owner-cell strong"
                        )
                        ?.textContent
                        .trim();


                showToast(
                    `Viewing owner: ${name}`,
                    "info"
                );

            }
        );

    });


/* =========================================================
   EDIT OWNER
========================================================= */

document
    .querySelectorAll(".action-btn.edit")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    this.closest("tr");


                const name =
                    row
                        ?.querySelector(
                            ".owner-cell strong"
                        )
                        ?.textContent
                        .trim();


                showToast(
                    `Edit owner: ${name}`,
                    "info"
                );

            }
        );

    });


/* =========================================================
   SUSPEND OWNER
========================================================= */

document
    .querySelectorAll(".action-btn.suspend")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    this.closest("tr");


                const name =
                    row
                        ?.querySelector(
                            ".owner-cell strong"
                        )
                        ?.textContent
                        .trim();


                const confirmAction =
                    window.confirm(
                        `Suspend ${name}?`
                    );


                if (!confirmAction) {
                    return;
                }


                showToast(
                    `${name} has been suspended.`,
                    "success"
                );

            }
        );

    });


/* =========================================================
   VERIFY OWNER
========================================================= */

document
    .querySelectorAll(".action-btn.verify")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    this.closest("tr");


                const name =
                    row
                        ?.querySelector(
                            ".owner-cell strong"
                        )
                        ?.textContent
                        .trim();


                showToast(
                    `${name} verification approved.`,
                    "success"
                );

            }
        );

    });


/* =========================================================
   ACTIVATE OWNER
========================================================= */

document
    .querySelectorAll(".action-btn.activate")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    this.closest("tr");


                const name =
                    row
                        ?.querySelector(
                            ".owner-cell strong"
                        )
                        ?.textContent
                        .trim();


                showToast(
                    `${name} has been activated.`,
                    "success"
                );

            }
        );

    });


/* =========================================================
   ADD OWNER
========================================================= */

addOwnerBtn?.addEventListener(
    "click",
    function () {

        showToast(
            "Add Owner form will be connected to the backend later.",
            "info"
        );

    }
);


/* =========================================================
   FILTER BUTTON
========================================================= */

document
    .getElementById("filterBtn")
    ?.addEventListener(
        "click",
        function () {

            filterOwners();

            showToast(
                "Owner filters applied.",
                "success"
            );

        }
    );


/* =========================================================
   NOTIFICATION
========================================================= */

notificationBtn?.addEventListener(
    "click",
    function () {

        showToast(
            "You have 12 new notifications.",
            "info"
        );

    }
);


/* =========================================================
   LOGOUT
========================================================= */

logoutBtn?.addEventListener(
    "click",
    function () {

        const confirmLogout =
            window.confirm(
                "Are you sure you want to logout?"
            );


        if (!confirmLogout) {
            return;
        }


        localStorage.removeItem(
            "adminToken"
        );

        localStorage.removeItem(
            "adminUser"
        );


        showToast(
            "Logging out...",
            "info"
        );


        setTimeout(function () {

            window.location.href =
                "../../public/auth/login.html";

        }, 700);

    }
);


/* =========================================================
   TOAST
========================================================= */

function showToast(
    message,
    type = "info"
) {

    const oldToast =
        document.querySelector(
            ".owner-toast"
        );


    oldToast?.remove();


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "owner-toast";


    let icon =
        "fa-circle-info";


    if (type === "success") {

        icon =
            "fa-circle-check";

    }


    if (type === "error") {

        icon =
            "fa-circle-xmark";

    }


    toast.innerHTML = `

        <i class="fa-solid ${icon}"></i>

        <span>
            ${message}
        </span>

        <button type="button">

            <i class="fa-solid fa-xmark"></i>

        </button>

    `;


    Object.assign(
        toast.style,
        {
            position: "fixed",
            right: "24px",
            bottom: "24px",
            zIndex: "9999",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "13px 15px",
            minWidth: "270px",
            background: "#ffffff",
            border: "1px solid #e6eaf0",
            borderRadius: "10px",
            boxShadow:
                "0 12px 35px rgba(20,35,50,.15)",
            color: "#172033",
            fontSize: "12px",
            fontWeight: "600"
        }
    );


    if (type === "success") {

        toast.style.borderLeft =
            "4px solid #159570";

    } else if (type === "error") {

        toast.style.borderLeft =
            "4px solid #d95353";

    } else {

        toast.style.borderLeft =
            "4px solid #0fa88a";

    }


    document.body.appendChild(
        toast
    );


    toast
        .querySelector("button")
        ?.addEventListener(
            "click",
            function () {

                toast.remove();

            }
        );


    setTimeout(function () {

        toast.remove();

    }, 3500);

}


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeSidebar();

        }

    }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (window.innerWidth > 768) {

            closeSidebar();

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateSelectedCount();

        console.log(
            "RoomNest Admin Owners page loaded."
        );

    }
);