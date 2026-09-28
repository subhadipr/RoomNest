/* =========================================================
   ROOMNEST — ADMIN USERS
   File: users.js
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

const topSearch =
    document.getElementById("topSearch");

const userSearch =
    document.getElementById("userSearch");

const statusFilter =
    document.getElementById("statusFilter");

const sortFilter =
    document.getElementById("sortFilter");

const selectAll =
    document.getElementById("selectAll");

const selectedCount =
    document.getElementById("selectedCount");

const addUserBtn =
    document.getElementById("addUserBtn");

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

    sidebar?.classList.add("sidebar-open");

    sidebarOverlay?.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeSidebar() {

    sidebar?.classList.remove("sidebar-open");

    sidebarOverlay?.classList.remove("active");

    document.body.style.overflow = "";
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
   SEARCH + FILTER
========================================================= */

function filterUsers() {

    const searchValue =
        userSearch?.value
            .trim()
            .toLowerCase() || "";

    const statusValue =
        statusFilter?.value || "all";

    const rows =
        document.querySelectorAll(
            "#usersTableBody tr"
        );


    rows.forEach(function (row) {

        const name =
            row.dataset.name
                ?.toLowerCase() || "";

        const email =
            row.dataset.email
                ?.toLowerCase() || "";

        const status =
            row.dataset.status || "";


        const matchesSearch =
            searchValue === "" ||
            name.includes(searchValue) ||
            email.includes(searchValue);


        const matchesStatus =
            statusValue === "all" ||
            status === statusValue;


        row.style.display =
            matchesSearch && matchesStatus
                ? ""
                : "none";

    });

}


userSearch?.addEventListener(
    "input",
    filterUsers
);


statusFilter?.addEventListener(
    "change",
    filterUsers
);


/* Top search */

topSearch?.addEventListener(
    "input",
    function () {

        if (userSearch) {
            userSearch.value =
                this.value;
        }

        filterUsers();

    }
);


/* =========================================================
   SORT
========================================================= */

sortFilter?.addEventListener(
    "change",
    function () {

        const tbody =
            document.getElementById(
                "usersTableBody"
            );

        const rows =
            Array.from(
                tbody.querySelectorAll("tr")
            );


        if (this.value === "name") {

            rows.sort(function (a, b) {

                return a.dataset.name
                    .localeCompare(
                        b.dataset.name
                    );

            });

        }


        if (this.value === "newest") {

            rows.reverse();

        }


        rows.forEach(function (row) {

            tbody.appendChild(row);

        });

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
                ".user-checkbox"
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
    .querySelectorAll(".user-checkbox")
    .forEach(function (checkbox) {

        checkbox.addEventListener(
            "change",
            updateSelectedCount
        );

    });


function updateSelectedCount() {

    const selected =
        document.querySelectorAll(
            ".user-checkbox:checked"
        ).length;

    if (selectedCount) {

        selectedCount.textContent =
            `${selected} selected`;

    }


    const all =
        document.querySelectorAll(
            ".user-checkbox"
        ).length;


    if (selectAll) {

        selectAll.checked =
            selected > 0 &&
            selected === all;

    }

}


/* =========================================================
   USER ACTIONS
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
                            ".user-cell strong"
                        )
                        ?.textContent
                        .trim();

                showToast(
                    `Viewing ${name}`,
                    "info"
                );

            }
        );

    });


/* Edit */

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
                            ".user-cell strong"
                        )
                        ?.textContent
                        .trim();

                showToast(
                    `Edit user: ${name}`,
                    "info"
                );

            }
        );

    });


/* Delete */

document
    .querySelectorAll(".action-btn.delete")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    this.closest("tr");

                const name =
                    row
                        ?.querySelector(
                            ".user-cell strong"
                        )
                        ?.textContent
                        .trim();


                const confirmDelete =
                    window.confirm(
                        `Delete ${name}?`
                    );


                if (!confirmDelete) {
                    return;
                }


                row.remove();

                updateSelectedCount();

                showToast(
                    `${name} removed successfully.`,
                    "success"
                );

            }
        );

    });


/* =========================================================
   ADD USER
========================================================= */

addUserBtn?.addEventListener(
    "click",
    function () {

        showToast(
            "Add User form will be connected to the backend later.",
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

            filterUsers();

            showToast(
                "User filters applied.",
                "success"
            );

        }
    );


/* =========================================================
   NOTIFICATIONS
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
            ".users-toast"
        );

    oldToast?.remove();


    const toast =
        document.createElement("div");

    toast.className =
        `users-toast users-toast-${type}`;


    let icon =
        "fa-circle-info";


    if (type === "success") {
        icon = "fa-circle-check";
    }


    if (type === "error") {
        icon = "fa-circle-xmark";
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


    document.body.appendChild(toast);


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
   INITIAL LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateSelectedCount();

        console.log(
            "RoomNest Admin Users page loaded."
        );

    }
);