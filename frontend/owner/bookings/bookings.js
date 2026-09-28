/* =========================================================
   ROOMNEST — OWNER BOOKINGS
   File: bookings.js
   Standalone Demo / LocalStorage
========================================================= */


/* =========================================================
   01. DEFAULT DEMO BOOKINGS
========================================================= */

const defaultBookings = [

    {
        id: 1001,
        bookingId: "RN-BK-1001",

        studentName: "Rahul Das",
        email: "rahul.das@example.com",
        phone: "+91 98765 12345",

        property: "Green View PG",
        roomType: "Single Room",

        status: "pending",

        bookingDate: "2026-09-15T10:30:00",
        moveInDate: "2026-10-01",

        rent: 8500,
        bookingAmount: 2000,
        deposit: 8500,

        paymentStatus: "Pending",

        note:
            "I would like to book this single room for the upcoming academic session. Please confirm availability."
    },


    {
        id: 1002,
        bookingId: "RN-BK-1002",

        studentName: "Sneha Mukherjee",
        email: "sneha.mukherjee@example.com",
        phone: "+91 98302 45678",

        property: "Lake Side Residency",
        roomType: "Twin Sharing",

        status: "confirmed",

        bookingDate: "2026-09-14T15:20:00",
        moveInDate: "2026-10-05",

        rent: 6500,
        bookingAmount: 1500,
        deposit: 6500,

        paymentStatus: "Paid",

        note:
            "I have selected the twin sharing room. Please let me know the final move-in procedure."
    },


    {
        id: 1003,
        bookingId: "RN-BK-1003",

        studentName: "Amit Ghosh",
        email: "amit.ghosh@example.com",
        phone: "+91 90070 33221",

        property: "Urban Nest PG",
        roomType: "Single Room",

        status: "pending",

        bookingDate: "2026-09-14T11:45:00",
        moveInDate: "2026-09-25",

        rent: 9000,
        bookingAmount: 2500,
        deposit: 9000,

        paymentStatus: "Pending",

        note:
            "I need the room from the last week of September. Please confirm whether the room is available."
    },


    {
        id: 1004,
        bookingId: "RN-BK-1004",

        studentName: "Priya Sharma",
        email: "priya.sharma@example.com",
        phone: "+91 62914 77881",

        property: "Green View PG",
        roomType: "Twin Sharing",

        status: "confirmed",

        bookingDate: "2026-09-12T14:10:00",
        moveInDate: "2026-10-10",

        rent: 6200,
        bookingAmount: 1500,
        deposit: 6200,

        paymentStatus: "Paid",

        note:
            "Booking confirmed after speaking with the owner. I will move in on the mentioned date."
    },


    {
        id: 1005,
        bookingId: "RN-BK-1005",

        studentName: "Sourav Roy",
        email: "sourav.roy@example.com",
        phone: "+91 89104 66552",

        property: "City Comfort Rooms",
        roomType: "Single Room",

        status: "cancelled",

        bookingDate: "2026-09-10T09:25:00",
        moveInDate: "2026-09-20",

        rent: 7800,
        bookingAmount: 2000,
        deposit: 7800,

        paymentStatus: "Refund Pending",

        note:
            "I am unable to continue with the booking because my plans have changed."
    },


    {
        id: 1006,
        bookingId: "RN-BK-1006",

        studentName: "Ananya Sen",
        email: "ananya.sen@example.com",
        phone: "+91 98365 11223",

        property: "Lake Side Residency",
        roomType: "Single Room",

        status: "confirmed",

        bookingDate: "2026-09-08T18:40:00",
        moveInDate: "2026-09-28",

        rent: 8200,
        bookingAmount: 2000,
        deposit: 8200,

        paymentStatus: "Paid",

        note:
            "Everything looks good. I would like to proceed with the reservation."
    },


    {
        id: 1007,
        bookingId: "RN-BK-1007",

        studentName: "Rohan Das",
        email: "rohan.das@example.com",
        phone: "+91 82409 33445",

        property: "Urban Nest PG",
        roomType: "Triple Sharing",

        status: "completed",

        bookingDate: "2026-08-20T12:15:00",
        moveInDate: "2026-09-01",

        rent: 5200,
        bookingAmount: 1000,
        deposit: 5200,

        paymentStatus: "Paid",

        note:
            "Booking successfully completed and student has moved into the property."
    }

];


/* =========================================================
   02. STORAGE
========================================================= */

const BOOKING_STORAGE_KEY =
    "roomnestOwnerBookings";


function getBookings() {

    const stored =
        localStorage.getItem(
            BOOKING_STORAGE_KEY
        );


    if (stored) {

        try {

            return JSON.parse(stored);

        } catch (error) {

            console.warn(
                "Invalid booking data. Resetting demo data."
            );
        }
    }


    localStorage.setItem(
        BOOKING_STORAGE_KEY,
        JSON.stringify(defaultBookings)
    );


    return [...defaultBookings];
}


let bookings =
    getBookings();


let selectedBookingId =
    null;


/* =========================================================
   03. DOM ELEMENTS
========================================================= */

const bookingsList =
    document.getElementById(
        "bookingsList"
    );

const emptyState =
    document.getElementById(
        "emptyState"
    );

const bookingSearch =
    document.getElementById(
        "bookingSearch"
    );

const statusFilter =
    document.getElementById(
        "statusFilter"
    );

const propertyFilter =
    document.getElementById(
        "propertyFilter"
    );

const sortFilter =
    document.getElementById(
        "sortFilter"
    );

const resultsCount =
    document.getElementById(
        "resultsCount"
    );

const totalCount =
    document.getElementById(
        "totalCount"
    );

const upcomingCount =
    document.getElementById(
        "upcomingCount"
    );

const confirmedCount =
    document.getElementById(
        "confirmedCount"
    );

const pendingCount =
    document.getElementById(
        "pendingCount"
    );

const cancelledCount =
    document.getElementById(
        "cancelledCount"
    );

const sidebarBookingBadge =
    document.getElementById(
        "sidebarBookingBadge"
    );


/* =========================================================
   04. SAVE
========================================================= */

function saveBookings() {

    localStorage.setItem(
        BOOKING_STORAGE_KEY,
        JSON.stringify(bookings)
    );
}


/* =========================================================
   05. HELPERS
========================================================= */

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


function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


function formatDate(dateString) {

    if (!dateString) {
        return "—";
    }


    const date =
        new Date(dateString);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
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


    const date =
        new Date(dateString);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "—";
    }


    return (
        date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        )
        +
        " • "
        +
        date.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        )
    );
}


function formatCurrency(amount) {

    const number =
        Number(amount) || 0;


    return number.toLocaleString(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    );
}


function statusLabel(status) {

    const labels = {

        pending: "Pending",

        confirmed: "Confirmed",

        cancelled: "Cancelled",

        completed: "Completed"
    };


    return (
        labels[status] ||
        "Pending"
    );
}


/* =========================================================
   06. UPCOMING CHECK
========================================================= */

function isUpcoming(booking) {

    if (
        !booking.moveInDate ||
        booking.status === "cancelled" ||
        booking.status === "completed"
    ) {
        return false;
    }


    const moveIn =
        new Date(
            booking.moveInDate
        );

    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    return moveIn >= today;
}


/* =========================================================
   07. STATS
========================================================= */

function updateStats() {

    const total =
        bookings.length;


    const upcoming =
        bookings.filter(
            booking =>
                isUpcoming(booking)
        ).length;


    const confirmed =
        bookings.filter(
            booking =>
                booking.status ===
                "confirmed"
        ).length;


    const pending =
        bookings.filter(
            booking =>
                booking.status ===
                "pending"
        ).length;


    const cancelled =
        bookings.filter(
            booking =>
                booking.status ===
                "cancelled"
        ).length;


    totalCount.textContent =
        total;

    upcomingCount.textContent =
        upcoming;

    confirmedCount.textContent =
        confirmed;

    pendingCount.textContent =
        pending;

    cancelledCount.textContent =
        cancelled;


    if (pending > 0) {

        sidebarBookingBadge.textContent =
            pending;

        sidebarBookingBadge.style.display =
            "flex";

    } else {

        sidebarBookingBadge.style.display =
            "none";
    }
}


/* =========================================================
   08. PROPERTY FILTER
========================================================= */

function populatePropertyFilter() {

    const currentValue =
        propertyFilter.value;


    const properties =
        [
            ...new Set(
                bookings.map(
                    booking =>
                        booking.property
                )
            )
        ]
        .sort();


    propertyFilter.innerHTML = `
        <option value="all">
            All Properties
        </option>

        ${
            properties
                .map(
                    property => `
                        <option value="${escapeHTML(property)}">
                            ${escapeHTML(property)}
                        </option>
                    `
                )
                .join("")
        }
    `;


    if (
        properties.includes(
            currentValue
        )
    ) {

        propertyFilter.value =
            currentValue;

    } else {

        propertyFilter.value =
            "all";
    }
}


/* =========================================================
   09. FILTER BOOKINGS
========================================================= */

function getFilteredBookings() {

    const search =
        bookingSearch.value
            .trim()
            .toLowerCase();


    const status =
        statusFilter.value;


    const property =
        propertyFilter.value;


    const sort =
        sortFilter.value;


    let filtered =
        bookings.filter(
            booking => {


                const matchesSearch =
                    !search ||

                    booking.studentName
                        .toLowerCase()
                        .includes(search) ||

                    booking.property
                        .toLowerCase()
                        .includes(search) ||

                    booking.bookingId
                        .toLowerCase()
                        .includes(search) ||

                    booking.roomType
                        .toLowerCase()
                        .includes(search);


                const matchesStatus =
                    status === "all" ||
                    booking.status === status;


                const matchesProperty =
                    property === "all" ||
                    booking.property === property;


                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesProperty
                );
            }
        );


    filtered.sort(
        (a, b) => {

            if (
                sort === "movein"
            ) {

                return (
                    new Date(
                        a.moveInDate
                    ).getTime()
                    -
                    new Date(
                        b.moveInDate
                    ).getTime()
                );
            }


            const dateA =
                new Date(
                    a.bookingDate
                ).getTime();


            const dateB =
                new Date(
                    b.bookingDate
                ).getTime();


            if (
                sort === "oldest"
            ) {

                return dateA - dateB;
            }


            return dateB - dateA;
        }
    );


    return filtered;
}


/* =========================================================
   10. RENDER BOOKINGS
========================================================= */

function renderBookings() {

    const filtered =
        getFilteredBookings();


    resultsCount.textContent =
        filtered.length;


    if (
        filtered.length === 0
    ) {

        bookingsList.innerHTML = "";

        emptyState.classList.add(
            "visible"
        );

        return;
    }


    emptyState.classList.remove(
        "visible"
    );


    bookingsList.innerHTML =
        filtered
            .map(
                booking => {

                    const initials =
                        getInitials(
                            booking.studentName
                        );


                    const status =
                        booking.status;


                    let primaryAction = "";


                    if (
                        status ===
                        "pending"
                    ) {

                        primaryAction = `
                            <button
                                class="card-action success"
                                data-action="confirm"
                                data-id="${booking.id}"
                            >
                                <i class="fa-solid fa-check"></i>
                                Confirm
                            </button>
                        `;

                    } else if (
                        status ===
                        "confirmed"
                    ) {

                        primaryAction = `
                            <button
                                class="card-action danger"
                                data-action="cancel"
                                data-id="${booking.id}"
                            >
                                <i class="fa-solid fa-xmark"></i>
                                Cancel
                            </button>
                        `;

                    } else if (
                        status ===
                        "cancelled"
                    ) {

                        primaryAction = `
                            <button
                                class="card-action"
                                data-action="restore"
                                data-id="${booking.id}"
                            >
                                <i class="fa-solid fa-rotate-left"></i>
                                Restore
                            </button>
                        `;
                    }


                    return `

                        <article
                            class="booking-card"
                        >

                            <div
                                class="booking-card-top"
                            >


                                <div
                                    class="booking-student-avatar"
                                >
                                    ${escapeHTML(initials)}
                                </div>


                                <div
                                    class="booking-main"
                                >


                                    <div
                                        class="booking-title-row"
                                    >

                                        <h3
                                            class="booking-student-name"
                                        >
                                            ${escapeHTML(
                                                booking.studentName
                                            )}
                                        </h3>


                                        <span
                                            class="booking-type"
                                        >
                                            ${escapeHTML(
                                                booking.roomType
                                            )}
                                        </span>

                                    </div>


                                    <div
                                        class="booking-property"
                                    >

                                        <i
                                            class="fa-solid fa-building"
                                        ></i>

                                        ${escapeHTML(
                                            booking.property
                                        )}

                                    </div>


                                    <div
                                        class="booking-details-row"
                                    >


                                        <span
                                            class="booking-detail"
                                        >

                                            <i
                                                class="fa-solid fa-hashtag"
                                            ></i>

                                            <strong>
                                                ${escapeHTML(
                                                    booking.bookingId
                                                )}
                                            </strong>

                                        </span>


                                        <span
                                            class="booking-detail"
                                        >

                                            <i
                                                class="fa-regular fa-calendar"
                                            ></i>

                                            Booked:
                                            ${formatDate(
                                                booking.bookingDate
                                            )}

                                        </span>


                                        <span
                                            class="booking-detail"
                                        >

                                            <i
                                                class="fa-solid fa-right-to-bracket"
                                            ></i>

                                            Move-in:
                                            <strong>
                                                ${formatDate(
                                                    booking.moveInDate
                                                )}
                                            </strong>

                                        </span>


                                        <span
                                            class="booking-detail"
                                        >

                                            <i
                                                class="fa-solid fa-credit-card"
                                            ></i>

                                            ${escapeHTML(
                                                booking.paymentStatus
                                            )}

                                        </span>


                                    </div>


                                    <p
                                        class="booking-note"
                                    >
                                        ${escapeHTML(
                                            booking.note
                                        )}
                                    </p>


                                </div>


                                <div
                                    class="booking-side"
                                >


                                    <span
                                        class="status-badge ${escapeHTML(
                                            status
                                        )}"
                                    >
                                        ${escapeHTML(
                                            statusLabel(
                                                status
                                            )
                                        )}
                                    </span>


                                    <div
                                        class="booking-price"
                                    >

                                        ${formatCurrency(
                                            booking.rent
                                        )}

                                        <small>
                                            / month
                                        </small>

                                    </div>


                                    <div
                                        class="booking-actions"
                                    >

                                        <button
                                            class="card-action"
                                            data-action="view"
                                            data-id="${booking.id}"
                                        >
                                            <i
                                                class="fa-regular fa-eye"
                                            ></i>
                                            View
                                        </button>


                                        ${primaryAction}

                                    </div>

                                </div>

                            </div>

                        </article>

                    `;
                }
            )
            .join("");
}


/* =========================================================
   11. OPEN BOOKING MODAL
========================================================= */

function openBookingModal(id) {

    const booking =
        bookings.find(
            item =>
                item.id ===
                Number(id)
        );


    if (!booking) {
        return;
    }


    selectedBookingId =
        booking.id;


    document.getElementById(
        "modalBookingTitle"
    ).textContent =
        booking.bookingId;


    document.getElementById(
        "modalStudentAvatar"
    ).textContent =
        getInitials(
            booking.studentName
        );


    document.getElementById(
        "modalStudentName"
    ).textContent =
        booking.studentName;


    document.getElementById(
        "modalStudentEmail"
    ).textContent =
        booking.email;


    document.getElementById(
        "modalStudentPhone"
    ).textContent =
        booking.phone;


    document.getElementById(
        "modalBookingId"
    ).textContent =
        booking.bookingId;


    document.getElementById(
        "modalProperty"
    ).textContent =
        booking.property;


    document.getElementById(
        "modalRoomType"
    ).textContent =
        booking.roomType;


    document.getElementById(
        "modalBookingDate"
    ).textContent =
        formatDateTime(
            booking.bookingDate
        );


    document.getElementById(
        "modalMoveIn"
    ).textContent =
        formatDate(
            booking.moveInDate
        );


    document.getElementById(
        "modalRent"
    ).textContent =
        formatCurrency(
            booking.rent
        );


    document.getElementById(
        "modalAmount"
    ).textContent =
        formatCurrency(
            booking.bookingAmount
        );


    document.getElementById(
        "modalDeposit"
    ).textContent =
        formatCurrency(
            booking.deposit
        );


    document.getElementById(
        "modalPayment"
    ).textContent =
        booking.paymentStatus;


    document.getElementById(
        "modalMessage"
    ).textContent =
        booking.note;


    const modalStatus =
        document.getElementById(
            "modalStatus"
        );


    modalStatus.textContent =
        statusLabel(
            booking.status
        );


    modalStatus.className =
        `status-badge ${booking.status}`;


    const confirmButton =
        document.getElementById(
            "modalConfirmBtn"
        );


    const cancelButton =
        document.getElementById(
            "modalCancelBtn"
        );


    if (
        booking.status ===
        "pending"
    ) {

        confirmButton.style.display =
            "flex";

        confirmButton.innerHTML =
            `
                <i class="fa-solid fa-check"></i>
                Confirm Booking
            `;

    } else if (
        booking.status ===
        "cancelled"
    ) {

        confirmButton.style.display =
            "flex";

        confirmButton.innerHTML =
            `
                <i class="fa-solid fa-rotate-left"></i>
                Restore Booking
            `;

    } else {

        confirmButton.style.display =
            "none";
    }


    if (
        booking.status ===
        "completed"
    ) {

        cancelButton.style.display =
            "none";

    } else {

        cancelButton.style.display =
            "flex";

        cancelButton.innerHTML =
            `
                <i class="fa-solid fa-xmark"></i>
                Cancel Booking
            `;
    }


    openModal(
        "bookingModal"
    );
}


/* =========================================================
   12. CONFIRM BOOKING
========================================================= */

function confirmBooking(id) {

    const booking =
        bookings.find(
            item =>
                item.id ===
                Number(id)
        );


    if (!booking) {
        return;
    }


    booking.status =
        "confirmed";


    booking.paymentStatus =
        booking.bookingAmount > 0
            ? "Pending"
            : "Not Required";


    saveBookings();

    updateStats();

    renderBookings();


    closeModal(
        "bookingModal"
    );


    showToast(
        "Booking Confirmed",
        `${booking.studentName}'s booking has been confirmed.`,
        "success"
    );
}


/* =========================================================
   13. CANCEL BOOKING
========================================================= */

function cancelBooking(id) {

    const booking =
        bookings.find(
            item =>
                item.id ===
                Number(id)
        );


    if (!booking) {
        return;
    }


    const confirmed =
        window.confirm(
            `Cancel booking ${booking.bookingId}?`
        );


    if (!confirmed) {
        return;
    }


    booking.status =
        "cancelled";


    booking.paymentStatus =
        booking.paymentStatus ===
        "Paid"
            ? "Refund Pending"
            : "Cancelled";


    saveBookings();

    updateStats();

    renderBookings();


    closeModal(
        "bookingModal"
    );


    showToast(
        "Booking Cancelled",
        `${booking.bookingId} has been cancelled.`,
        "warning"
    );
}


/* =========================================================
   14. RESTORE BOOKING
========================================================= */

function restoreBooking(id) {

    const booking =
        bookings.find(
            item =>
                item.id ===
                Number(id)
        );


    if (!booking) {
        return;
    }


    booking.status =
        "pending";


    booking.paymentStatus =
        "Pending";


    saveBookings();

    updateStats();

    renderBookings();


    closeModal(
        "bookingModal"
    );


    showToast(
        "Booking Restored",
        `${booking.bookingId} is pending again.`,
        "info"
    );
}


/* =========================================================
   15. MESSAGE STUDENT
========================================================= */

function messageStudent(id) {

    const booking =
        bookings.find(
            item =>
                item.id ===
                Number(id)
        );


    if (!booking) {
        return;
    }


    localStorage.setItem(
        "roomnestSelectedStudent",
        JSON.stringify({

            name:
                booking.studentName,

            email:
                booking.email,

            phone:
                booking.phone,

            property:
                booking.property,

            bookingId:
                booking.bookingId
        })
    );


    showToast(
        "Message Student",
        `Opening conversation with ${booking.studentName}.`,
        "info"
    );


    /*
       Messages panel will be connected later.

       Example:

       window.location.href =
           "../messages/messages.html?booking="
           + booking.id;
    */
}


/* =========================================================
   16. COPY BOOKING ID
========================================================= */

document
    .getElementById(
        "copyBookingIdBtn"
    )
    .addEventListener(
        "click",
        async () => {

            if (
                selectedBookingId ===
                null
            ) {
                return;
            }


            const booking =
                bookings.find(
                    item =>
                        item.id ===
                        selectedBookingId
                );


            if (!booking) {
                return;
            }


            try {

                await navigator.clipboard.writeText(
                    booking.bookingId
                );


                showToast(
                    "Copied",
                    `${booking.bookingId} copied to clipboard.`,
                    "success"
                );

            } catch (error) {

                showToast(
                    "Copy Failed",
                    "Could not copy the booking ID.",
                    "error"
                );
            }

        }
    );


/* =========================================================
   17. MODALS
========================================================= */

function openModal(id) {

    const modal =
        document.getElementById(id);


    if (!modal) {
        return;
    }


    modal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";
}


function closeModal(id) {

    const modal =
        document.getElementById(id);


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "active"
    );


    if (
        !document.querySelector(
            ".modal-overlay.active"
        )
    ) {

        document.body.style.overflow =
            "";
    }
}


function closeAllModals() {

    document
        .querySelectorAll(
            ".modal-overlay.active"
        )
        .forEach(
            modal => {

                modal.classList.remove(
                    "active"
                );
            }
        );


    document.body.style.overflow =
        "";
}


/* =========================================================
   18. CARD ACTION EVENTS
========================================================= */

bookingsList.addEventListener(
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
            Number(
                button.dataset.id
            );


        if (
            action ===
            "view"
        ) {

            openBookingModal(
                id
            );

        }


        else if (
            action ===
            "confirm"
        ) {

            confirmBooking(
                id
            );

        }


        else if (
            action ===
            "cancel"
        ) {

            cancelBooking(
                id
            );

        }


        else if (
            action ===
            "restore"
        ) {

            restoreBooking(
                id
            );

        }

    }
);


/* =========================================================
   19. MODAL BUTTONS
========================================================= */

document
    .getElementById(
        "modalMessageBtn"
    )
    .addEventListener(
        "click",
        () => {

            if (
                selectedBookingId !==
                null
            ) {

                messageStudent(
                    selectedBookingId
                );
            }

        }
    );


document
    .getElementById(
        "modalConfirmBtn"
    )
    .addEventListener(
        "click",
        () => {

            if (
                selectedBookingId ===
                null
            ) {
                return;
            }


            const booking =
                bookings.find(
                    item =>
                        item.id ===
                        selectedBookingId
                );


            if (!booking) {
                return;
            }


            if (
                booking.status ===
                "cancelled"
            ) {

                restoreBooking(
                    selectedBookingId
                );

            } else {

                confirmBooking(
                    selectedBookingId
                );
            }

        }
    );


document
    .getElementById(
        "modalCancelBtn"
    )
    .addEventListener(
        "click",
        () => {

            if (
                selectedBookingId !==
                null
            ) {

                cancelBooking(
                    selectedBookingId
                );
            }

        }
    );


/* =========================================================
   20. CLOSE MODALS
========================================================= */

document
    .querySelectorAll(
        "[data-close-modal]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    closeModal(
                        button.dataset.closeModal
                    );

                }
            );

        }
    );


document
    .querySelectorAll(
        ".modal-overlay"
    )
    .forEach(
        overlay => {

            overlay.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        overlay
                    ) {

                        closeModal(
                            overlay.id
                        );
                    }

                }
            );

        }
    );


/* =========================================================
   21. SEARCH / FILTER
========================================================= */

function applyFilters() {

    renderBookings();

    updateSearchClearButton();
}


bookingSearch.addEventListener(
    "input",
    applyFilters
);


statusFilter.addEventListener(
    "change",
    applyFilters
);


propertyFilter.addEventListener(
    "change",
    applyFilters
);


sortFilter.addEventListener(
    "change",
    applyFilters
);


/* =========================================================
   22. CLEAR SEARCH
========================================================= */

const clearSearch =
    document.getElementById(
        "clearSearch"
    );


function updateSearchClearButton() {

    if (
        bookingSearch.value.trim()
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

        bookingSearch.value =
            "";

        renderBookings();

        updateSearchClearButton();

        bookingSearch.focus();

    }
);


/* =========================================================
   23. RESET FILTERS
========================================================= */

document
    .getElementById(
        "resetFiltersBtn"
    )
    .addEventListener(
        "click",
        () => {

            bookingSearch.value =
                "";

            statusFilter.value =
                "all";

            propertyFilter.value =
                "all";

            sortFilter.value =
                "latest";


            renderBookings();

            updateSearchClearButton();


            showToast(
                "Filters Reset",
                "All booking filters have been reset.",
                "info"
            );

        }
    );


/* =========================================================
   24. REFRESH
========================================================= */

document
    .getElementById(
        "refreshBtn"
    )
    .addEventListener(
        "click",
        () => {

            bookings =
                getBookings();


            populatePropertyFilter();

            updateStats();

            renderBookings();

            updateSearchClearButton();


            showToast(
                "Refreshed",
                "Booking list has been refreshed.",
                "success"
            );

        }
    );


/* =========================================================
   25. GLOBAL SEARCH
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
    .getElementById(
        "searchBtn"
    )
    .addEventListener(
        "click",
        () => {

            openModal(
                "searchModal"
            );


            globalSearch.value =
                "";


            globalSearchResults.textContent =
                "Start typing to search.";


            setTimeout(
                () => {

                    globalSearch.focus();

                },
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
            bookings.filter(
                booking =>

                    booking.studentName
                        .toLowerCase()
                        .includes(query) ||

                    booking.property
                        .toLowerCase()
                        .includes(query) ||

                    booking.bookingId
                        .toLowerCase()
                        .includes(query) ||

                    booking.roomType
                        .toLowerCase()
                        .includes(query)
            );


        if (
            results.length === 0
        ) {

            globalSearchResults.textContent =
                "No bookings found.";

            return;
        }


        globalSearchResults.innerHTML =
            results
                .slice(0, 7)
                .map(
                    booking => `

                        <div
                            class="search-result-item"
                            data-search-id="${booking.id}"
                        >

                            <strong>
                                ${escapeHTML(
                                    booking.studentName
                                )}
                            </strong>

                            <span>
                                ${escapeHTML(
                                    booking.bookingId
                                )}
                                •
                                ${escapeHTML(
                                    booking.property
                                )}
                            </span>

                        </div>

                    `
                )
                .join("");
    }
);


/* =========================================================
   26. GLOBAL SEARCH CLICK
========================================================= */

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
            Number(
                result.dataset.searchId
            );


        closeModal(
            "searchModal"
        );


        openBookingModal(
            id
        );

    }
);


/* =========================================================
   27. NOTIFICATION
========================================================= */

document
    .getElementById(
        "notificationBtn"
    )
    .addEventListener(
        "click",
        () => {

            openModal(
                "notificationModal"
            );

        }
    );


/* =========================================================
   28. PROFILE
========================================================= */

document
    .getElementById(
        "profileMenuBtn"
    )
    .addEventListener(
        "click",
        () => {

            window.location.href =
                "../profile/profile.html";

        }
    );


/* =========================================================
   29. OWNER DATA
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
            JSON.parse(
                storedOwner
            );


        if (
            owner.name
        ) {

            document.getElementById(
                "sidebarOwnerName"
            ).textContent =
                owner.name;


            document.getElementById(
                "topOwnerName"
            ).textContent =
                owner.name;


            const initials =
                getInitials(
                    owner.name
                );


            document.getElementById(
                "sidebarAvatar"
            ).textContent =
                initials;


            document.getElementById(
                "topAvatar"
            ).textContent =
                initials;
        }


        if (
            owner.avatar
        ) {

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
   30. AVATAR
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
        `
            <img
                src="${src}"
                alt="Owner"
            >
        `;


    sidebarAvatar.innerHTML =
        `
            <img
                src="${src}"
                alt="Owner"
            >
        `;
}


/* =========================================================
   31. MOBILE SIDEBAR
========================================================= */

const mobileMenuBtn =
    document.getElementById(
        "mobileMenuBtn"
    );


const ownerSidebar =
    document.getElementById(
        "ownerSidebar"
    );


const sidebarOverlay =
    document.getElementById(
        "sidebarOverlay"
    );


function openSidebar() {

    ownerSidebar.classList.add(
        "open"
    );

    sidebarOverlay.classList.add(
        "active"
    );
}


function closeSidebar() {

    ownerSidebar.classList.remove(
        "open"
    );

    sidebarOverlay.classList.remove(
        "active"
    );
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
   32. LOGOUT
========================================================= */

document
    .getElementById(
        "logoutBtn"
    )
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
   33. KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeAllModals();

            closeSidebar();
        }


        if (
            (event.ctrlKey ||
                event.metaKey) &&
            event.key.toLowerCase() ===
                "k"
        ) {

            event.preventDefault();


            openModal(
                "searchModal"
            );


            setTimeout(
                () => {

                    globalSearch.focus();

                },
                100
            );
        }

    }
);


/* =========================================================
   34. TOAST
========================================================= */

let toastTimer =
    null;


function showToast(
    title,
    message,
    type = "success"
) {

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


    const toastIcon =
        document.getElementById(
            "toastIcon"
        );


    toastTitle.textContent =
        title;


    toastMessage.textContent =
        message;


    const iconMap = {

        success:
            "fa-check",

        info:
            "fa-info",

        warning:
            "fa-exclamation",

        error:
            "fa-xmark"
    };


    toastIcon.innerHTML =
        `
            <i
                class="fa-solid ${
                    iconMap[type] ||
                    iconMap.success
                }"
            ></i>
        `;


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
            3500
        );
}


/* =========================================================
   35. TOAST CLOSE
========================================================= */

document
    .getElementById(
        "toastClose"
    )
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "toast"
                )
                .classList.remove(
                    "show"
                );


            clearTimeout(
                toastTimer
            );

        }
    );


/* =========================================================
   36. INITIALIZE
========================================================= */

loadOwnerData();

populatePropertyFilter();

updateStats();

renderBookings();

updateSearchClearButton();


console.log(
    "RoomNest Owner Bookings loaded successfully."
);