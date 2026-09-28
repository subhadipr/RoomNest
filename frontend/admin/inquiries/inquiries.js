/* =========================================================
   ROOMNEST ADMIN — INQUIRIES JS
========================================================= */


/* =========================================================
   DEMO DATA
========================================================= */

let inquiries = [

    {
        id: "INQ-3001",
        student: "Ankit Sharma",
        initials: "AS",
        email: "ankit@gmail.com",
        property: "Green View PG",
        propertyId: "PR-1001",
        owner: "Rahul Das",
        message: "Is a single room available from next month?",
        date: "16 Sep 2026",
        status: "new"
    },

    {
        id: "INQ-3002",
        student: "Priya Das",
        initials: "PD",
        email: "priya@gmail.com",
        property: "City Nest Hostel",
        propertyId: "PR-1002",
        owner: "Amit Ghosh",
        message: "I want to know about food and Wi-Fi facilities.",
        date: "16 Sep 2026",
        status: "new"
    },

    {
        id: "INQ-3003",
        student: "Sourav Paul",
        initials: "SP",
        email: "sourav@gmail.com",
        property: "University View PG",
        propertyId: "PR-1005",
        owner: "Ankit Paul",
        message: "Can I visit the property this weekend?",
        date: "15 Sep 2026",
        status: "progress"
    },

    {
        id: "INQ-3004",
        student: "Riya Sen",
        initials: "RS",
        email: "riya@gmail.com",
        property: "Lake Side Rooms",
        propertyId: "PR-1004",
        owner: "Sourav Roy",
        message: "Is the rent inclusive of electricity?",
        date: "15 Sep 2026",
        status: "resolved"
    },

    {
        id: "INQ-3005",
        student: "Abhishek Roy",
        initials: "AR",
        email: "abhishek@gmail.com",
        property: "Peaceful Stay PG",
        propertyId: "PR-1007",
        owner: "Debjit Sen",
        message: "Are there any restrictions for students?",
        date: "14 Sep 2026",
        status: "progress"
    },

    {
        id: "INQ-3006",
        student: "Rahul Ghosh",
        initials: "RG",
        email: "rahul@gmail.com",
        property: "Campus Corner Hostel",
        propertyId: "PR-1008",
        owner: "Rakesh Mondal",
        message: "Is parking available for bikes?",
        date: "14 Sep 2026",
        status: "new"
    },

    {
        id: "INQ-3007",
        student: "Sneha Roy",
        initials: "SR",
        email: "sneha@gmail.com",
        property: "Student Comfort House",
        propertyId: "PR-1003",
        owner: "Priya Sen",
        message: "Can two students share one room?",
        date: "13 Sep 2026",
        status: "resolved"
    },

    {
        id: "INQ-3008",
        student: "Kunal Das",
        initials: "KD",
        email: "kunal@gmail.com",
        property: "Royal Residency",
        propertyId: "PR-1006",
        owner: "Arindam Bose",
        message: "Please share the exact location of the property.",
        date: "12 Sep 2026",
        status: "resolved"
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const tableBody =
    document.getElementById("inquiryTableBody");

const inquirySearch =
    document.getElementById("inquirySearch");

const statusFilter =
    document.getElementById("statusFilter");

const emptyState =
    document.getElementById("emptyState");

const viewOverlay =
    document.getElementById("viewOverlay");

const viewContent =
    document.getElementById("viewContent");

const replyOverlay =
    document.getElementById("replyOverlay");

const replyMessage =
    document.getElementById("replyMessage");

let selectedInquiryId = null;


/* =========================================================
   INIT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    renderInquiries();

    updateStats();

    setupSidebar();

    setupEvents();

});


/* =========================================================
   RENDER
========================================================= */

function renderInquiries() {

    const search =
        inquirySearch.value
            .toLowerCase()
            .trim();

    const status =
        statusFilter.value;


    const filtered =
        inquiries.filter(inquiry => {

            const matchesSearch =

                inquiry.student
                    .toLowerCase()
                    .includes(search) ||

                inquiry.email
                    .toLowerCase()
                    .includes(search) ||

                inquiry.property
                    .toLowerCase()
                    .includes(search) ||

                inquiry.owner
                    .toLowerCase()
                    .includes(search) ||

                inquiry.message
                    .toLowerCase()
                    .includes(search) ||

                inquiry.id
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                status === "all" ||
                inquiry.status === status;


            return matchesSearch && matchesStatus;

        });


    tableBody.innerHTML = "";


    document.getElementById("resultCount")
        .textContent = filtered.length;


    if (filtered.length === 0) {

        emptyState.classList.add("show");

        document.querySelector(".table-wrapper")
            .style.display = "none";

    } else {

        emptyState.classList.remove("show");

        document.querySelector(".table-wrapper")
            .style.display = "block";


        filtered.forEach(inquiry => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>

                    <div class="student-cell">

                        <div class="student-avatar">
                            ${inquiry.initials}
                        </div>

                        <div>

                            <span class="student-name">
                                ${inquiry.student}
                            </span>

                            <span class="student-email">
                                ${inquiry.email}
                            </span>

                        </div>

                    </div>

                </td>


                <td>

                    <div class="property-name-cell">

                        <strong>
                            ${inquiry.property}
                        </strong>

                        <span>
                            ${inquiry.propertyId}
                        </span>

                    </div>

                </td>


                <td>

                    <span class="owner-name">
                        ${inquiry.owner}
                    </span>

                </td>


                <td>

                    <div
                        class="message-preview"
                        title="${inquiry.message}"
                    >
                        ${inquiry.message}
                    </div>

                </td>


                <td>
                    ${inquiry.date}
                </td>


                <td>

                    <span class="inquiry-status ${inquiry.status}">
                        ${getStatusText(inquiry.status)}
                    </span>

                </td>


                <td>

                    <div class="inquiry-actions">

                        <button
                            class="inquiry-action"
                            title="View"
                            onclick="viewInquiry('${inquiry.id}')"
                        >

                            <i class="fa-regular fa-eye"></i>

                        </button>


                        <button
                            class="inquiry-action"
                            title="Reply"
                            onclick="openReply('${inquiry.id}')"
                        >

                            <i class="fa-solid fa-reply"></i>

                        </button>


                        <button
                            class="inquiry-action"
                            title="Resolve"
                            onclick="resolveInquiry('${inquiry.id}')"
                        >

                            <i class="fa-solid fa-check"></i>

                        </button>


                        <button
                            class="inquiry-action delete"
                            title="Delete"
                            onclick="deleteInquiry('${inquiry.id}')"
                        >

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </td>

            `;


            tableBody.appendChild(row);

        });

    }


    document.getElementById("paginationInfo")
        .textContent =
        `Showing ${filtered.length} of ${inquiries.length} inquiries`;

}


/* =========================================================
   STATUS TEXT
========================================================= */

function getStatusText(status) {

    if (status === "new") {

        return "New";

    }

    if (status === "progress") {

        return "In Progress";

    }

    if (status === "resolved") {

        return "Resolved";

    }

    return status;

}


/* =========================================================
   STATS
========================================================= */

function updateStats() {

    const total =
        inquiries.length;


    const newCount =
        inquiries.filter(
            item => item.status === "new"
        ).length;


    const progress =
        inquiries.filter(
            item => item.status === "progress"
        ).length;


    const resolved =
        inquiries.filter(
            item => item.status === "resolved"
        ).length;


    document.getElementById("totalInquiries")
        .textContent = total;


    document.getElementById("newInquiries")
        .textContent = newCount;


    document.getElementById("progressInquiries")
        .textContent = progress;


    document.getElementById("resolvedInquiries")
        .textContent = resolved;


    document.querySelector(".inquiry-badge")
        .textContent = newCount;

}


/* =========================================================
   SEARCH / FILTER
========================================================= */

inquirySearch.addEventListener(
    "input",
    renderInquiries
);


statusFilter.addEventListener(
    "change",
    renderInquiries
);


/* =========================================================
   RESET
========================================================= */

document
    .getElementById("resetFilters")
    .addEventListener("click", () => {

        inquirySearch.value = "";

        statusFilter.value = "all";

        renderInquiries();

    });


/* =========================================================
   VIEW INQUIRY
========================================================= */

function viewInquiry(id) {

    const inquiry =
        inquiries.find(
            item => item.id === id
        );


    if (!inquiry) return;


    viewContent.innerHTML = `

        <div class="view-header">

            <h2>
                Inquiry Details
            </h2>

            <span>
                ${inquiry.id} • ${inquiry.date}
            </span>

        </div>


        <div class="view-body">

            <div class="view-grid">

                <div class="view-info">

                    <span>Student</span>

                    <strong>
                        ${inquiry.student}
                    </strong>

                </div>


                <div class="view-info">

                    <span>Email</span>

                    <strong>
                        ${inquiry.email}
                    </strong>

                </div>


                <div class="view-info">

                    <span>Property</span>

                    <strong>
                        ${inquiry.property}
                    </strong>

                </div>


                <div class="view-info">

                    <span>Owner</span>

                    <strong>
                        ${inquiry.owner}
                    </strong>

                </div>


                <div class="view-info">

                    <span>Property ID</span>

                    <strong>
                        ${inquiry.propertyId}
                    </strong>

                </div>


                <div class="view-info">

                    <span>Status</span>

                    <strong>
                        ${getStatusText(inquiry.status)}
                    </strong>

                </div>

            </div>


            <div class="view-message">

                <label>
                    STUDENT MESSAGE
                </label>

                <p>
                    ${inquiry.message}
                </p>

            </div>

        </div>

    `;


    viewOverlay.classList.add("show");

}


/* =========================================================
   CLOSE VIEW
========================================================= */

document
    .getElementById("viewClose")
    .addEventListener(
        "click",
        closeView
    );


viewOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target === viewOverlay
        ) {

            closeView();

        }

    }
);


function closeView() {

    viewOverlay.classList.remove("show");

}


/* =========================================================
   REPLY
========================================================= */

function openReply(id) {

    const inquiry =
        inquiries.find(
            item => item.id === id
        );


    if (!inquiry) return;


    selectedInquiryId = id;


    document.getElementById("replyStudent")
        .textContent =
        `Reply to ${inquiry.student} regarding ${inquiry.property}.`;


    replyMessage.value = "";


    replyOverlay.classList.add("show");

}


document
    .getElementById("sendReply")
    .addEventListener(
        "click",
        () => {

            const message =
                replyMessage.value.trim();


            if (!message) {

                showToast(
                    "Please write a reply message."
                );

                replyMessage.focus();

                return;

            }


            const inquiry =
                inquiries.find(
                    item =>
                        item.id === selectedInquiryId
                );


            if (!inquiry) return;


            inquiry.status = "progress";


            replyOverlay.classList.remove("show");


            renderInquiries();

            updateStats();


            showToast(
                "Reply sent successfully."
            );

        }
    );


/* =========================================================
   CLOSE REPLY
========================================================= */

function closeReply() {

    replyOverlay.classList.remove("show");

    selectedInquiryId = null;

}


document
    .getElementById("replyClose")
    .addEventListener(
        "click",
        closeReply
    );


document
    .getElementById("cancelReply")
    .addEventListener(
        "click",
        closeReply
    );


replyOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target === replyOverlay
        ) {

            closeReply();

        }

    }
);


/* =========================================================
   RESOLVE
========================================================= */

function resolveInquiry(id) {

    const inquiry =
        inquiries.find(
            item => item.id === id
        );


    if (!inquiry) return;


    if (inquiry.status === "resolved") {

        showToast(
            "This inquiry is already resolved."
        );

        return;

    }


    const confirmed =
        confirm(
            `Mark inquiry ${inquiry.id} as resolved?`
        );


    if (!confirmed) return;


    inquiry.status = "resolved";


    renderInquiries();

    updateStats();


    showToast(
        "Inquiry marked as resolved."
    );

}


/* =========================================================
   DELETE
========================================================= */

function deleteInquiry(id) {

    const inquiry =
        inquiries.find(
            item => item.id === id
        );


    if (!inquiry) return;


    const confirmed =
        confirm(
            `Delete inquiry ${inquiry.id}?`
        );


    if (!confirmed) return;


    inquiries =
        inquiries.filter(
            item => item.id !== id
        );


    renderInquiries();

    updateStats();


    showToast(
        "Inquiry deleted successfully."
    );

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const toast =
        document.getElementById("inquiryToast");

    const messageElement =
        document.getElementById("toastMessage");


    messageElement.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);

}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

document
    .getElementById("globalSearch")
    .addEventListener(
        "input",
        event => {

            inquirySearch.value =
                event.target.value;

            renderInquiries();

        }
    );


/* =========================================================
   NOTIFICATION
========================================================= */

document
    .getElementById("notificationBtn")
    .addEventListener(
        "click",
        () => {

            showToast(
                "You have new student inquiries."
            );

        }
    );


/* =========================================================
   SIDEBAR
========================================================= */

function setupSidebar() {

    const sidebar =
        document.getElementById(
            "inquirySidebar"
        );

    const overlay =
        document.getElementById(
            "sidebarOverlay"
        );

    const menu =
        document.getElementById(
            "mobileMenuBtn"
        );


    menu.addEventListener(
        "click",
        () => {

            sidebar.classList.add("open");

            overlay.classList.add("show");

        }
    );


    overlay.addEventListener(
        "click",
        () => {

            sidebar.classList.remove("open");

            overlay.classList.remove("show");

        }
    );

}


/* =========================================================
   LOGOUT
========================================================= */

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmed) return;


            localStorage.removeItem(
                "adminToken"
            );


            window.location.href =
                "../../public/auth/login.html";

        }
    );