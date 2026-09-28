/* =========================================================
   ROOMNEST — OWNER INQUIRIES
   File: inquiries.js
   Standalone Demo / LocalStorage
========================================================= */


/* =========================================================
   01. DEMO DATA
========================================================= */

const defaultInquiries = [
    {
        id: 1,
        studentName: "Rahul Das",
        email: "rahul.das@example.com",
        phone: "+91 98765 12345",
        property: "Green View PG",
        type: "room",
        typeLabel: "Room Inquiry",
        status: "pending",
        date: "2026-09-15T10:30:00",
        moveIn: "2026-10-01",
        message:
            "Hello, I am looking for a single room near my college. Is a single room currently available? I would also like to know about the food and Wi-Fi facilities."
    },

    {
        id: 2,
        studentName: "Sneha Mukherjee",
        email: "sneha.mukherjee@example.com",
        phone: "+91 98302 45678",
        property: "Lake Side Residency",
        type: "property",
        typeLabel: "Property Inquiry",
        status: "replied",
        date: "2026-09-14T16:20:00",
        moveIn: "2026-10-10",
        message:
            "I saw your property on RoomNest and wanted to know whether the property is suitable for a female student. Please share the available room options and monthly rent."
    },

    {
        id: 3,
        studentName: "Amit Ghosh",
        email: "amit.ghosh@example.com",
        phone: "+91 90070 33221",
        property: "Urban Nest PG",
        type: "booking",
        typeLabel: "Booking Inquiry",
        status: "pending",
        date: "2026-09-14T11:45:00",
        moveIn: "2026-09-25",
        message:
            "I would like to reserve a room for next month. Could you please confirm the booking amount, security deposit and documents required for booking?"
    },

    {
        id: 4,
        studentName: "Priya Sharma",
        email: "priya.sharma@example.com",
        phone: "+91 62914 77881",
        property: "Green View PG",
        type: "general",
        typeLabel: "General",
        status: "replied",
        date: "2026-09-12T14:10:00",
        moveIn: "2026-10-05",
        message:
            "Can you please tell me the nearest metro station and whether visitors are allowed in the property?"
    },

    {
        id: 5,
        studentName: "Sourav Roy",
        email: "sourav.roy@example.com",
        phone: "+91 89104 66552",
        property: "City Comfort Rooms",
        type: "room",
        typeLabel: "Room Inquiry",
        status: "closed",
        date: "2026-09-10T09:25:00",
        moveIn: "2026-09-20",
        message:
            "I wanted to check if a furnished single room was available. Thank you for your response."
    },

    {
        id: 6,
        studentName: "Ananya Sen",
        email: "ananya.sen@example.com",
        phone: "+91 98365 11223",
        property: "Lake Side Residency",
        type: "room",
        typeLabel: "Room Inquiry",
        status: "pending",
        date: "2026-09-09T18:40:00",
        moveIn: "2026-10-15",
        message:
            "I am interested in a shared room. Please let me know the room sharing options and whether electricity and maintenance charges are included."
    },

    {
        id: 7,
        studentName: "Rohan Das",
        email: "rohan.das@example.com",
        phone: "+91 82409 33445",
        property: "Urban Nest PG",
        type: "property",
        typeLabel: "Property Inquiry",
        status: "closed",
        date: "2026-09-06T12:15:00",
        moveIn: "2026-09-18",
        message:
            "I wanted to know more about the property location and available amenities."
    }
];


/* =========================================================
   02. STORAGE
========================================================= */

const INQUIRY_STORAGE_KEY = "roomnestOwnerInquiries";


function getInquiries() {

    const stored =
        localStorage.getItem(INQUIRY_STORAGE_KEY);

    if (stored) {

        try {
            return JSON.parse(stored);
        } catch (error) {
            console.warn(
                "Invalid inquiry data. Resetting demo data."
            );
        }
    }

    localStorage.setItem(
        INQUIRY_STORAGE_KEY,
        JSON.stringify(defaultInquiries)
    );

    return [...defaultInquiries];
}


let inquiries = getInquiries();

let selectedInquiryId = null;


/* =========================================================
   03. DOM
========================================================= */

const inquiriesList =
    document.getElementById("inquiriesList");

const emptyState =
    document.getElementById("emptyState");

const inquirySearch =
    document.getElementById("inquirySearch");

const statusFilter =
    document.getElementById("statusFilter");

const typeFilter =
    document.getElementById("typeFilter");

const sortFilter =
    document.getElementById("sortFilter");

const resultsCount =
    document.getElementById("resultsCount");

const totalCount =
    document.getElementById("totalCount");

const pendingCount =
    document.getElementById("pendingCount");

const repliedCount =
    document.getElementById("repliedCount");

const closedCount =
    document.getElementById("closedCount");

const sidebarInquiryBadge =
    document.getElementById("sidebarInquiryBadge");


/* =========================================================
   04. HELPERS
========================================================= */

function saveInquiries() {

    localStorage.setItem(
        INQUIRY_STORAGE_KEY,
        JSON.stringify(inquiries)
    );
}


function getInitials(name) {

    if (!name) {
        return "RN";
    }

    const parts =
        name.trim().split(/\s+/);

    if (parts.length === 1) {
        return parts[0]
            .substring(0, 2)
            .toUpperCase();
    }

    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();
}


function formatDate(dateString) {

    if (!dateString) {
        return "—";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


function formatDateTime(dateString) {

    if (!dateString) {
        return "—";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    ) + " • " +
    date.toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


function formatMoveIn(dateString) {

    if (!dateString) {
        return "Not specified";
    }

    return formatDate(dateString);
}


function escapeHTML(value) {

    if (value === undefined || value === null) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function statusLabel(status) {

    const labels = {
        pending: "Pending",
        replied: "Replied",
        closed: "Closed"
    };

    return labels[status] || "Pending";
}


/* =========================================================
   05. STATS
========================================================= */

function updateStats() {

    const total =
        inquiries.length;

    const pending =
        inquiries.filter(
            item => item.status === "pending"
        ).length;

    const replied =
        inquiries.filter(
            item => item.status === "replied"
        ).length;

    const closed =
        inquiries.filter(
            item => item.status === "closed"
        ).length;


    totalCount.textContent = total;

    pendingCount.textContent = pending;

    repliedCount.textContent = replied;

    closedCount.textContent = closed;


    if (pending > 0) {
        sidebarInquiryBadge.textContent = pending;
        sidebarInquiryBadge.style.display = "flex";
    } else {
        sidebarInquiryBadge.style.display = "none";
    }
}


/* =========================================================
   06. FILTER
========================================================= */

function getFilteredInquiries() {

    const search =
        inquirySearch.value
            .trim()
            .toLowerCase();

    const status =
        statusFilter.value;

    const type =
        typeFilter.value;

    const sort =
        sortFilter.value;


    let filtered =
        inquiries.filter(item => {

            const matchesSearch =
                !search ||
                item.studentName
                    .toLowerCase()
                    .includes(search) ||
                item.property
                    .toLowerCase()
                    .includes(search) ||
                item.message
                    .toLowerCase()
                    .includes(search) ||
                item.email
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                status === "all" ||
                item.status === status;


            const matchesType =
                type === "all" ||
                item.type === type;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesType
            );
        });


    filtered.sort((a, b) => {

        const dateA =
            new Date(a.date).getTime();

        const dateB =
            new Date(b.date).getTime();

        if (sort === "oldest") {
            return dateA - dateB;
        }

        return dateB - dateA;
    });


    return filtered;
}


/* =========================================================
   07. RENDER
========================================================= */

function renderInquiries() {

    const filtered =
        getFilteredInquiries();


    resultsCount.textContent =
        filtered.length;


    if (filtered.length === 0) {

        inquiriesList.innerHTML = "";

        emptyState.classList.add("visible");

        return;
    }


    emptyState.classList.remove("visible");


    inquiriesList.innerHTML =
        filtered.map(item => {

            const initials =
                getInitials(item.studentName);


            return `
                <article class="inquiry-card">

                    <div class="inquiry-card-top">

                        <div class="inquiry-student-avatar">
                            ${escapeHTML(initials)}
                        </div>


                        <div class="inquiry-main">

                            <div class="inquiry-name-row">

                                <h3 class="inquiry-name">
                                    ${escapeHTML(item.studentName)}
                                </h3>

                                <span class="inquiry-type">
                                    ${escapeHTML(item.typeLabel)}
                                </span>

                            </div>


                            <div class="inquiry-property">

                                <i class="fa-solid fa-building"></i>

                                ${escapeHTML(item.property)}

                            </div>


                            <p class="inquiry-message-preview">
                                ${escapeHTML(item.message)}
                            </p>


                            <div class="inquiry-meta">

                                <span>
                                    <i class="fa-regular fa-calendar"></i>
                                    ${formatDateTime(item.date)}
                                </span>

                                <span>
                                    <i class="fa-solid fa-right-to-bracket"></i>
                                    Move-in:
                                    ${formatMoveIn(item.moveIn)}
                                </span>

                            </div>

                        </div>


                        <div class="inquiry-side">

                            <span class="status-badge ${escapeHTML(item.status)}">
                                ${escapeHTML(statusLabel(item.status))}
                            </span>


                            <div class="inquiry-actions">

                                <button
                                    class="card-action"
                                    data-action="view"
                                    data-id="${item.id}"
                                >
                                    <i class="fa-regular fa-eye"></i>
                                    View
                                </button>


                                ${
                                    item.status !== "closed"
                                    ? `
                                        <button
                                            class="card-action primary"
                                            data-action="reply"
                                            data-id="${item.id}"
                                        >
                                            <i class="fa-solid fa-reply"></i>
                                            Reply
                                        </button>
                                    `
                                    : `
                                        <button
                                            class="card-action close-action"
                                            data-action="reopen"
                                            data-id="${item.id}"
                                        >
                                            <i class="fa-solid fa-rotate-left"></i>
                                            Reopen
                                        </button>
                                    `
                                }

                            </div>

                        </div>

                    </div>

                </article>
            `;

        }).join("");
}


/* =========================================================
   08. VIEW INQUIRY
========================================================= */

function openInquiryModal(id) {

    const inquiry =
        inquiries.find(
            item => item.id === Number(id)
        );

    if (!inquiry) {
        return;
    }


    selectedInquiryId =
        inquiry.id;


    document.getElementById(
        "modalInquiryTitle"
    ).textContent =
        inquiry.typeLabel;


    document.getElementById(
        "modalStudentAvatar"
    ).textContent =
        getInitials(inquiry.studentName);


    document.getElementById(
        "modalStudentName"
    ).textContent =
        inquiry.studentName;


    document.getElementById(
        "modalStudentEmail"
    ).textContent =
        inquiry.email;


    document.getElementById(
        "modalStudentPhone"
    ).textContent =
        inquiry.phone;


    document.getElementById(
        "modalProperty"
    ).textContent =
        inquiry.property;


    document.getElementById(
        "modalType"
    ).textContent =
        inquiry.typeLabel;


    document.getElementById(
        "modalDate"
    ).textContent =
        formatDateTime(inquiry.date);


    document.getElementById(
        "modalMoveIn"
    ).textContent =
        formatMoveIn(inquiry.moveIn);


    document.getElementById(
        "modalMessage"
    ).textContent =
        inquiry.message;


    const statusElement =
        document.getElementById("modalStatus");

    statusElement.textContent =
        statusLabel(inquiry.status);

    statusElement.className =
        `status-badge ${inquiry.status}`;


    const replyButton =
        document.getElementById("modalReplyBtn");

    const closeButton =
        document.getElementById(
            "modalCloseInquiryBtn"
        );


    if (inquiry.status === "pending") {

        replyButton.style.display = "flex";
        replyButton.innerHTML =
            `<i class="fa-solid fa-reply"></i> Mark as Replied`;

    } else if (inquiry.status === "replied") {

        replyButton.style.display = "flex";
        replyButton.innerHTML =
            `<i class="fa-solid fa-reply"></i> Mark as Replied`;

    } else {

        replyButton.style.display = "none";
    }


    if (inquiry.status === "closed") {

        closeButton.innerHTML =
            `<i class="fa-solid fa-rotate-left"></i> Reopen Inquiry`;

    } else {

        closeButton.innerHTML =
            `<i class="fa-solid fa-check"></i> Close Inquiry`;
    }


    openModal("inquiryModal");
}


/* =========================================================
   09. STATUS ACTIONS
========================================================= */

function markAsReplied(id) {

    const inquiry =
        inquiries.find(
            item => item.id === Number(id)
        );

    if (!inquiry) {
        return;
    }


    inquiry.status = "replied";

    saveInquiries();

    updateStats();

    renderInquiries();

    closeModal("inquiryModal");


    showToast(
        "Inquiry Updated",
        `${inquiry.studentName}'s inquiry has been marked as replied.`,
        "success"
    );
}


function closeInquiry(id) {

    const inquiry =
        inquiries.find(
            item => item.id === Number(id)
        );

    if (!inquiry) {
        return;
    }


    inquiry.status = "closed";

    saveInquiries();

    updateStats();

    renderInquiries();

    closeModal("inquiryModal");


    showToast(
        "Inquiry Closed",
        `The inquiry from ${inquiry.studentName} has been closed.`,
        "success"
    );
}


function reopenInquiry(id) {

    const inquiry =
        inquiries.find(
            item => item.id === Number(id)
        );

    if (!inquiry) {
        return;
    }


    inquiry.status = "pending";

    saveInquiries();

    updateStats();

    renderInquiries();


    showToast(
        "Inquiry Reopened",
        `The inquiry from ${inquiry.studentName} is pending again.`,
        "success"
    );
}


/* =========================================================
   10. MESSAGE STUDENT
========================================================= */

function messageStudent(id) {

    const inquiry =
        inquiries.find(
            item => item.id === Number(id)
        );

    if (!inquiry) {
        return;
    }


    /*
       Later this can pass student/property ID
       to the real Owner Messages panel.
    */

    localStorage.setItem(
        "roomnestSelectedStudent",
        JSON.stringify({
            name: inquiry.studentName,
            email: inquiry.email,
            phone: inquiry.phone,
            property: inquiry.property,
            inquiryId: inquiry.id
        })
    );


    showToast(
        "Message Student",
        `Opening conversation with ${inquiry.studentName}.`,
        "info"
    );


    /*
       Messages panel will be connected here later.

       Example:
       window.location.href =
       "../messages/messages.html?student=" + inquiry.id;
    */
}


/* =========================================================
   11. MODALS
========================================================= */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) {
        return;
    }

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    if (
        !document.querySelector(
            ".modal-overlay.active"
        )
    ) {
        document.body.style.overflow = "";
    }
}


function closeAllModals() {

    document
        .querySelectorAll(".modal-overlay.active")
        .forEach(modal => {

            modal.classList.remove("active");
        });

    document.body.style.overflow = "";
}


/* =========================================================
   12. TOAST
========================================================= */

let toastTimer = null;


function showToast(
    title,
    message,
    type = "success"
) {

    const toast =
        document.getElementById("toast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");

    const toastIcon =
        document.getElementById("toastIcon");


    toastTitle.textContent =
        title;

    toastMessage.textContent =
        message;


    const iconMap = {
        success: "fa-check",
        info: "fa-info",
        warning: "fa-exclamation",
        error: "fa-xmark"
    };


    toastIcon.innerHTML =
        `<i class="fa-solid ${iconMap[type] || iconMap.success}"></i>`;


    toastIcon.style.background =
        type === "error"
            ? "var(--danger-bg)"
            : type === "warning"
            ? "var(--warning-bg)"
            : type === "info"
            ? "var(--blue-bg)"
            : "var(--success-bg)";


    toastIcon.style.color =
        type === "error"
            ? "var(--danger)"
            : type === "warning"
            ? "var(--warning)"
            : type === "info"
            ? "var(--blue)"
            : "var(--success)";


    toast.classList.add("show");


    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3500);
}


/* =========================================================
   13. MOBILE SIDEBAR
========================================================= */

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const ownerSidebar =
    document.getElementById("ownerSidebar");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");


function openSidebar() {

    ownerSidebar.classList.add("open");

    sidebarOverlay.classList.add("active");
}


function closeSidebar() {

    ownerSidebar.classList.remove("open");

    sidebarOverlay.classList.remove("active");
}


mobileMenuBtn.addEventListener(
    "click",
    openSidebar
);


sidebarOverlay.addEventListener(
    "click",
    closeSidebar
);


/* =========================================================
   14. CARD ACTION EVENTS
========================================================= */

inquiriesList.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-action]"
            );

        if (!button) {
            return;
        }


        const action =
            button.dataset.action;

        const id =
            Number(button.dataset.id);


        if (action === "view") {

            openInquiryModal(id);

        }


        else if (action === "reply") {

            markAsReplied(id);

        }


        else if (action === "reopen") {

            reopenInquiry(id);

        }

    }
);


/* =========================================================
   15. MODAL BUTTONS
========================================================= */

document
    .getElementById("modalMessageBtn")
    .addEventListener(
        "click",
        () => {

            if (selectedInquiryId !== null) {

                messageStudent(
                    selectedInquiryId
                );
            }
        }
    );


document
    .getElementById("modalReplyBtn")
    .addEventListener(
        "click",
        () => {

            if (selectedInquiryId !== null) {

                markAsReplied(
                    selectedInquiryId
                );
            }
        }
    );


document
    .getElementById(
        "modalCloseInquiryBtn"
    )
    .addEventListener(
        "click",
        () => {

            if (selectedInquiryId === null) {
                return;
            }


            const inquiry =
                inquiries.find(
                    item =>
                        item.id ===
                        selectedInquiryId
                );


            if (!inquiry) {
                return;
            }


            if (inquiry.status === "closed") {

                reopenInquiry(
                    selectedInquiryId
                );

                closeModal(
                    "inquiryModal"
                );

            } else {

                closeInquiry(
                    selectedInquiryId
                );
            }

        }
    );


/* =========================================================
   16. CLOSE MODALS
========================================================= */

document
    .querySelectorAll(
        "[data-close-modal]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeModal(
                    button.dataset.closeModal
                );

            }
        );
    });


document
    .querySelectorAll(".modal-overlay")
    .forEach(overlay => {

        overlay.addEventListener(
            "click",
            event => {

                if (
                    event.target === overlay
                ) {
                    closeModal(
                        overlay.id
                    );
                }

            }
        );
    });


/* =========================================================
   17. SEARCH & FILTER
========================================================= */

function applyFilters() {

    renderInquiries();

    updateSearchClearButton();
}


inquirySearch.addEventListener(
    "input",
    applyFilters
);


statusFilter.addEventListener(
    "change",
    applyFilters
);


typeFilter.addEventListener(
    "change",
    applyFilters
);


sortFilter.addEventListener(
    "change",
    applyFilters
);


/* =========================================================
   CLEAR SEARCH
========================================================= */

const clearSearch =
    document.getElementById(
        "clearSearch"
    );


function updateSearchClearButton() {

    if (
        inquirySearch.value.trim()
    ) {

        clearSearch.classList.add(
            "visible"
        );

    } else {

        clearSearch.classList.remove(
            "visible"
        );
    }
}


clearSearch.addEventListener(
    "click",
    () => {

        inquirySearch.value = "";

        renderInquiries();

        updateSearchClearButton();

        inquirySearch.focus();

    }
);


/* =========================================================
   RESET FILTERS
========================================================= */

document
    .getElementById(
        "resetFiltersBtn"
    )
    .addEventListener(
        "click",
        () => {

            inquirySearch.value = "";

            statusFilter.value = "all";

            typeFilter.value = "all";

            sortFilter.value = "latest";

            renderInquiries();

            updateSearchClearButton();

            showToast(
                "Filters Reset",
                "All inquiry filters have been reset.",
                "info"
            );

        }
    );


/* =========================================================
   REFRESH
========================================================= */

document
    .getElementById("refreshBtn")
    .addEventListener(
        "click",
        () => {

            inquiries =
                getInquiries();

            updateStats();

            renderInquiries();

            showToast(
                "Refreshed",
                "Inquiry list has been refreshed.",
                "success"
            );

        }
    );


/* =========================================================
   18. GLOBAL SEARCH MODAL
========================================================= */

const globalSearch =
    document.getElementById(
        "globalSearch"
    );

const globalSearchResults =
    document.getElementById(
        "globalSearchResults"
    );


document
    .getElementById("searchBtn")
    .addEventListener(
        "click",
        () => {

            openModal("searchModal");

            globalSearch.value = "";

            globalSearchResults.textContent =
                "Start typing to search.";

            setTimeout(
                () => globalSearch.focus(),
                150
            );

        }
    );


globalSearch.addEventListener(
    "input",
    () => {

        const query =
            globalSearch.value
                .trim()
                .toLowerCase();


        if (!query) {

            globalSearchResults.textContent =
                "Start typing to search.";

            return;
        }


        const results =
            inquiries.filter(item =>

                item.studentName
                    .toLowerCase()
                    .includes(query) ||

                item.property
                    .toLowerCase()
                    .includes(query) ||

                item.message
                    .toLowerCase()
                    .includes(query)
            );


        if (results.length === 0) {

            globalSearchResults.textContent =
                "No inquiries found.";

            return;
        }


        globalSearchResults.innerHTML =
            results
                .slice(0, 6)
                .map(item => `
                    <div
                        class="search-result-item"
                        data-search-id="${item.id}"
                    >

                        <strong>
                            ${escapeHTML(item.studentName)}
                        </strong>

                        <span>
                            ${escapeHTML(item.property)}
                            •
                            ${escapeHTML(item.typeLabel)}
                        </span>

                    </div>
                `)
                .join("");
    }
);


globalSearchResults.addEventListener(
    "click",
    event => {

        const result =
            event.target.closest(
                "[data-search-id]"
            );

        if (!result) {
            return;
        }


        const id =
            Number(result.dataset.searchId);


        closeModal("searchModal");

        openInquiryModal(id);
    }
);


/* =========================================================
   19. NOTIFICATION
========================================================= */

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


/* =========================================================
   20. PROFILE
========================================================= */

document
    .getElementById("profileMenuBtn")
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "../profile/profile.html";

        }
    );


/* =========================================================
   21. OWNER DATA
========================================================= */

function loadOwnerData() {

    const storedOwner =
        localStorage.getItem(
            "roomnestOwner"
        );


    if (!storedOwner) {
        return;
    }


    try {

        const owner =
            JSON.parse(storedOwner);


        if (owner.name) {

            document.getElementById(
                "sidebarOwnerName"
            ).textContent =
                owner.name;


            document.getElementById(
                "topOwnerName"
            ).textContent =
                owner.name;


            const initials =
                getInitials(owner.name);


            document.getElementById(
                "sidebarAvatar"
            ).textContent =
                initials;


            document.getElementById(
                "topAvatar"
            ).textContent =
                initials;
        }


        if (owner.avatar) {

            setOwnerAvatar(
                owner.avatar
            );
        }

    } catch (error) {

        console.warn(
            "Could not load owner data."
        );
    }
}


/* =========================================================
   OWNER AVATAR
========================================================= */

function setOwnerAvatar(src) {

    const topAvatar =
        document.getElementById(
            "topAvatar"
        );


    const sidebarAvatar =
        document.getElementById(
            "sidebarAvatar"
        );


    topAvatar.innerHTML =
        `<img src="${src}" alt="Owner">`;


    sidebarAvatar.innerHTML =
        `<img src="${src}" alt="Owner">`;
}


/* =========================================================
   22. LOGOUT
========================================================= */

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        () => {

            const confirmed =
                window.confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmed) {
                return;
            }


            /*
               Demo logout.
               Later backend JWT/session logout
               can be added here.
            */

            localStorage.removeItem(
                "roomnestOwnerToken"
            );

            localStorage.removeItem(
                "roomnestOwner"
            );


            window.location.href =
                "../../public/auth/login.html";

        }
    );


/* =========================================================
   23. KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeAllModals();

            closeSidebar();
        }


        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openModal("searchModal");

            setTimeout(
                () => globalSearch.focus(),
                100
            );
        }

    }
);


/* =========================================================
   24. TOAST CLOSE
========================================================= */

document
    .getElementById("toastClose")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("toast")
                .classList.remove("show");

            clearTimeout(toastTimer);

        }
    );


/* =========================================================
   25. INITIALIZE
========================================================= */

loadOwnerData();

updateStats();

renderInquiries();

updateSearchClearButton();


console.log(
    "RoomNest Owner Inquiries loaded successfully."
);