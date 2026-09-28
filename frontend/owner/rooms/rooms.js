/* =========================================================
   ROOMNEST — OWNER ROOMS JS
========================================================= */

"use strict";


/* =========================================================
   STORAGE
========================================================= */

const ROOM_STORAGE_KEY =
    "roomnestOwnerRooms";

const OWNER_STORAGE_KEY =
    "roomnestOwner";


/* =========================================================
   DEFAULT ROOM DATA
========================================================= */

const defaultRooms = [

    {
        id: "RN-RM-1001",
        roomNumber: "101",
        floor: "1st Floor",
        property: "Green View PG",
        type: "single",
        rent: 5000,
        capacity: 1,
        status: "occupied",
        occupant: "Rahul Das"
    },

    {
        id: "RN-RM-1002",
        roomNumber: "102",
        floor: "1st Floor",
        property: "Green View PG",
        type: "double",
        rent: 7000,
        capacity: 2,
        status: "available",
        occupant: ""
    },

    {
        id: "RN-RM-1003",
        roomNumber: "103",
        floor: "1st Floor",
        property: "Green View PG",
        type: "single",
        rent: 5000,
        capacity: 1,
        status: "occupied",
        occupant: "Amit Ghosh"
    },

    {
        id: "RN-RM-1004",
        roomNumber: "201",
        floor: "2nd Floor",
        property: "Green View PG",
        type: "double",
        rent: 7500,
        capacity: 2,
        status: "available",
        occupant: ""
    },

    {
        id: "RN-RM-1005",
        roomNumber: "202",
        floor: "2nd Floor",
        property: "Green View PG",
        type: "triple",
        rent: 9000,
        capacity: 3,
        status: "occupied",
        occupant: "Sourav Roy"
    },

    {
        id: "RN-RM-1006",
        roomNumber: "203",
        floor: "2nd Floor",
        property: "Green View PG",
        type: "single",
        rent: 5200,
        capacity: 1,
        status: "available",
        occupant: ""
    },

    {
        id: "RN-RM-1007",
        roomNumber: "204",
        floor: "2nd Floor",
        property: "Lake View Residence",
        type: "single",
        rent: 5500,
        capacity: 1,
        status: "available",
        occupant: ""
    },

    {
        id: "RN-RM-1008",
        roomNumber: "205",
        floor: "2nd Floor",
        property: "Lake View Residence",
        type: "double",
        rent: 8000,
        capacity: 2,
        status: "occupied",
        occupant: "Priya Sharma"
    },

    {
        id: "RN-RM-1009",
        roomNumber: "301",
        floor: "3rd Floor",
        property: "Lake View Residence",
        type: "triple",
        rent: 9500,
        capacity: 3,
        status: "occupied",
        occupant: "Ananya Sen"
    },

    {
        id: "RN-RM-1010",
        roomNumber: "302",
        floor: "3rd Floor",
        property: "Lake View Residence",
        type: "double",
        rent: 8000,
        capacity: 2,
        status: "maintenance",
        occupant: ""
    },

    {
        id: "RN-RM-1011",
        roomNumber: "303",
        floor: "3rd Floor",
        property: "Lake View Residence",
        type: "single",
        rent: 5500,
        capacity: 1,
        status: "available",
        occupant: ""
    },

    {
        id: "RN-RM-1012",
        roomNumber: "304",
        floor: "3rd Floor",
        property: "Lake View Residence",
        type: "double",
        rent: 8000,
        capacity: 2,
        status: "occupied",
        occupant: "Moumita Ghosh"
    },

    {
        id: "RN-RM-1013",
        roomNumber: "101",
        floor: "1st Floor",
        property: "City Center Boys PG",
        type: "single",
        rent: 4800,
        capacity: 1,
        status: "available",
        occupant: ""
    },

    {
        id: "RN-RM-1014",
        roomNumber: "102",
        floor: "1st Floor",
        property: "City Center Boys PG",
        type: "double",
        rent: 6800,
        capacity: 2,
        status: "occupied",
        occupant: "Rohan Das"
    },

    {
        id: "RN-RM-1015",
        roomNumber: "103",
        floor: "1st Floor",
        property: "City Center Boys PG",
        type: "shared",
        rent: 4000,
        capacity: 3,
        status: "available",
        occupant: ""
    },

    {
        id: "RN-RM-1016",
        roomNumber: "201",
        floor: "2nd Floor",
        property: "City Center Boys PG",
        type: "double",
        rent: 6800,
        capacity: 2,
        status: "occupied",
        occupant: "Sayan Roy"
    },

    {
        id: "RN-RM-1017",
        roomNumber: "202",
        floor: "2nd Floor",
        property: "City Center Boys PG",
        type: "shared",
        rent: 4000,
        capacity: 3,
        status: "available",
        occupant: ""
    },

    {
        id: "RN-RM-1018",
        roomNumber: "203",
        floor: "2nd Floor",
        property: "City Center Boys PG",
        type: "single",
        rent: 4800,
        capacity: 1,
        status: "maintenance",
        occupant: ""
    }

];


/* =========================================================
   STATE
========================================================= */

let rooms = [];

let currentEditId = null;

let selectedRoomId = null;

let currentView = "grid";


/* =========================================================
   DOM
========================================================= */

const roomsGrid =
    document.getElementById(
        "roomsGrid"
    );

const roomSearch =
    document.getElementById(
        "roomSearch"
    );

const propertyFilter =
    document.getElementById(
        "propertyFilter"
    );

const statusFilter =
    document.getElementById(
        "statusFilter"
    );

const typeFilter =
    document.getElementById(
        "typeFilter"
    );

const sortFilter =
    document.getElementById(
        "sortFilter"
    );


const roomModal =
    document.getElementById(
        "roomModal"
    );

const detailsModal =
    document.getElementById(
        "detailsModal"
    );

const searchModal =
    document.getElementById(
        "searchModal"
    );

const notificationModal =
    document.getElementById(
        "notificationModal"
    );


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadOwner();

        loadRooms();

        populatePropertyFilters();

        populateRoomPropertySelect();

        setupEvents();

        updateStats();

        renderRooms();

    }
);


/* =========================================================
   LOAD OWNER
========================================================= */

function loadOwner() {

    const saved =
        localStorage.getItem(
            OWNER_STORAGE_KEY
        );

    if (!saved) {
        return;
    }


    try {

        const owner =
            JSON.parse(saved);

        const name =
            owner.name ||
            owner.fullName ||
            "Subhadip Roy";


        const initials =
            getInitials(name);


        document.getElementById(
            "sidebarOwnerName"
        ).textContent =
            name;


        document.getElementById(
            "topOwnerName"
        ).textContent =
            name;


        document.getElementById(
            "sidebarAvatar"
        ).textContent =
            initials;


        document.getElementById(
            "topAvatar"
        ).textContent =
            initials;

    } catch (error) {

        console.log(
            "Owner data error:",
            error
        );

    }

}


/* =========================================================
   LOAD ROOMS
========================================================= */

function loadRooms() {

    const saved =
        localStorage.getItem(
            ROOM_STORAGE_KEY
        );


    if (!saved) {

        rooms =
            structuredClone(
                defaultRooms
            );

        saveRooms();

        return;

    }


    try {

        rooms =
            JSON.parse(saved);


        if (
            !Array.isArray(rooms)
        ) {

            rooms =
                structuredClone(
                    defaultRooms
                );

            saveRooms();

        }

    } catch {

        rooms =
            structuredClone(
                defaultRooms
            );

        saveRooms();

    }

}


/* =========================================================
   SAVE ROOMS
========================================================= */

function saveRooms() {

    localStorage.setItem(
        ROOM_STORAGE_KEY,
        JSON.stringify(rooms)
    );

}


/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {


    /* Search */

    roomSearch.addEventListener(
        "input",
        renderRooms
    );


    /* Filters */

    propertyFilter.addEventListener(
        "change",
        renderRooms
    );

    statusFilter.addEventListener(
        "change",
        renderRooms
    );

    typeFilter.addEventListener(
        "change",
        renderRooms
    );

    sortFilter.addEventListener(
        "change",
        renderRooms
    );


    /* Add room */

    document
        .getElementById(
            "addRoomBtn"
        )
        .addEventListener(
            "click",
            () => openRoomModal()
        );


    /* Room modal */

    document
        .getElementById(
            "closeRoomModal"
        )
        .addEventListener(
            "click",
            closeRoomModal
        );


    document
        .getElementById(
            "cancelRoomBtn"
        )
        .addEventListener(
            "click",
            closeRoomModal
        );


    document
        .getElementById(
            "roomForm"
        )
        .addEventListener(
            "submit",
            saveRoom
        );


    /* Details */

    document
        .getElementById(
            "closeDetailsModal"
        )
        .addEventListener(
            "click",
            () =>
                closeModal(
                    detailsModal
                )
        );


    document
        .getElementById(
            "editDetailsBtn"
        )
        .addEventListener(
            "click",
            editSelectedRoom
        );


    document
        .getElementById(
            "deleteDetailsBtn"
        )
        .addEventListener(
            "click",
            deleteSelectedRoom
        );


    /* View */

    document
        .getElementById(
            "gridViewBtn"
        )
        .addEventListener(
            () => setView("grid")
        );


    document
        .getElementById(
            "listViewBtn"
        )
        .addEventListener(
            "click",
            () => setView("list")
        );


    /* Search modal */

    document
        .getElementById(
            "searchBtn"
        )
        .addEventListener(
            "click",
            () =>
                openModal(
                    searchModal
                )
        );


    document
        .getElementById(
            "closeSearchModal"
        )
        .addEventListener(
            "click",
            () =>
                closeModal(
                    searchModal
                )
        );


    document
        .getElementById(
            "globalRoomSearch"
        )
        .addEventListener(
            "input",
            globalSearch
        );


    /* Notification */

    document
        .getElementById(
            "notificationBtn"
        )
        .addEventListener(
            "click",
            () =>
                openModal(
                    notificationModal
                )
        );


    document
        .getElementById(
            "closeNotificationModal"
        )
        .addEventListener(
            "click",
            () =>
                closeModal(
                    notificationModal
                )
        );


    /* Profile */

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


    /* Mobile */

    document
        .getElementById(
            "mobileMenuBtn"
        )
        .addEventListener(
            "click",
            openSidebar
        );


    document
        .getElementById(
            "sidebarOverlay"
        )
        .addEventListener(
            "click",
            closeSidebar
        );


    /* Logout */

    document
        .getElementById(
            "logoutBtn"
        )
        .addEventListener(
            "click",
            logout
        );


    /* Toast */

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

            }
        );


    /* Modal outside click */

    [
        roomModal,
        detailsModal,
        searchModal,
        notificationModal

    ].forEach(
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

                [
                    roomModal,
                    detailsModal,
                    searchModal,
                    notificationModal

                ].forEach(
                    closeModal
                );

            }

        }
    );

}


/* =========================================================
   POPULATE PROPERTY FILTER
========================================================= */

function populatePropertyFilters() {

    const properties =
        [
            ...new Set(
                rooms.map(
                    room =>
                        room.property
                )
            )
        ];


    propertyFilter.innerHTML = `

        <option value="all">
            All Properties
        </option>

        ${properties
            .map(
                property => `

                    <option value="${escapeHTML(
                        property
                    )}">

                        ${escapeHTML(
                            property
                        )}

                    </option>

                `
            )
            .join("")}

    `;

}


/* =========================================================
   POPULATE ROOM PROPERTY SELECT
========================================================= */

function populateRoomPropertySelect() {

    const select =
        document.getElementById(
            "roomProperty"
        );


    const properties =
        [
            ...new Set(
                rooms.map(
                    room =>
                        room.property
                )
            )
        ];


    select.innerHTML =
        properties
            .map(
                property => `

                    <option value="${escapeHTML(
                        property
                    )}">

                        ${escapeHTML(
                            property
                        )}

                    </option>

                `
            )
            .join("");

}


/* =========================================================
   FILTER
========================================================= */

function getFilteredRooms() {

    let result =
        [...rooms];


    const search =
        roomSearch.value
            .trim()
            .toLowerCase();


    if (search) {

        result =
            result.filter(
                room => {

                    const text = [

                        room.roomNumber,

                        room.property,

                        room.occupant,

                        room.type,

                        room.status,

                        room.id

                    ]
                        .join(" ")
                        .toLowerCase();


                    return text.includes(
                        search
                    );

                }
            );

    }


    if (
        propertyFilter.value !==
        "all"
    ) {

        result =
            result.filter(
                room =>
                    room.property ===
                    propertyFilter.value
            );

    }


    if (
        statusFilter.value !==
        "all"
    ) {

        result =
            result.filter(
                room =>
                    room.status ===
                    statusFilter.value
            );

    }


    if (
        typeFilter.value !==
        "all"
    ) {

        result =
            result.filter(
                room =>
                    room.type ===
                    typeFilter.value
            );

    }


    switch (
        sortFilter.value
    ) {

        case "roomDesc":

            result.sort(
                (a, b) =>
                    b.roomNumber.localeCompare(
                        a.roomNumber,
                        undefined,
                        {
                            numeric: true
                        }
                    )
            );

            break;


        case "rentHigh":

            result.sort(
                (a, b) =>
                    Number(b.rent) -
                    Number(a.rent)
            );

            break;


        case "rentLow":

            result.sort(
                (a, b) =>
                    Number(a.rent) -
                    Number(b.rent)
            );

            break;


        default:

            result.sort(
                (a, b) =>
                    a.roomNumber.localeCompare(
                        b.roomNumber,
                        undefined,
                        {
                            numeric: true
                        }
                    )
            );

    }


    return result;

}


/* =========================================================
   RENDER ROOMS
========================================================= */

function renderRooms() {

    const filtered =
        getFilteredRooms();


    document.getElementById(
        "resultsCount"
    ).textContent =
        `Showing ${filtered.length} rooms`;


    if (
        filtered.length === 0
    ) {

        roomsGrid.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">

                    <i class="fa-solid fa-door-open"></i>

                </div>

                <h3>
                    No rooms found
                </h3>

                <p>
                    Try changing your search or filters.
                </p>

            </div>

        `;

        return;

    }


    roomsGrid.className =
        currentView === "list"

            ? "rooms-grid list-view"

            : "rooms-grid";


    roomsGrid.innerHTML =
        filtered
            .map(
                createRoomCard
            )
            .join("");


    attachRoomActions();

}


/* =========================================================
   ROOM CARD
========================================================= */

function createRoomCard(
    room
) {

    const statusText =
        capitalize(
            room.status
        );


    const typeText =
        capitalize(
            room.type
        );


    const occupant =
        room.occupant &&
        room.occupant.trim()
            ? room.occupant
            : "Available";


    return `

        <article
            class="room-card ${room.status}"
            data-id="${room.id}"
        >


            <div class="room-card-top">


                <div class="room-info">

                    <div class="room-icon">

                        <i class="fa-solid fa-door-open"></i>

                    </div>


                    <div>

                        <h3>
                            Room ${escapeHTML(
                                room.roomNumber
                            )}
                        </h3>

                        <span>

                            ${escapeHTML(
                                room.property
                            )}

                        </span>

                    </div>

                </div>


                <button
                    class="room-menu edit-room"
                    data-id="${room.id}">

                    <i class="fa-solid fa-pen"></i>

                </button>

            </div>


            <span
                class="status-badge ${room.status}">

                <i class="fa-solid fa-circle"></i>

                ${statusText}

            </span>


            <div class="room-details">


                <div class="room-detail">

                    <span>
                        Room Type
                    </span>

                    <strong>
                        ${typeText}
                    </strong>

                </div>


                <div class="room-detail">

                    <span>
                        Floor
                    </span>

                    <strong>
                        ${escapeHTML(
                            room.floor
                        )}
                    </strong>

                </div>


                <div class="room-detail">

                    <span>
                        Capacity
                    </span>

                    <strong>
                        ${room.capacity}
                        ${room.capacity === 1
                            ? "Person"
                            : "Persons"}
                    </strong>

                </div>


                <div class="room-detail">

                    <span>
                        Room ID
                    </span>

                    <strong>
                        ${escapeHTML(
                            room.id
                        )}
                    </strong>

                </div>

            </div>


            <div class="occupant">

                <div class="occupant-avatar">

                    ${
                        occupant ===
                        "Available"

                            ? `<i class="fa-solid fa-user-plus"></i>`

                            : escapeHTML(
                                getInitials(
                                    occupant
                                )
                            )
                    }

                </div>


                <div>

                    <span>
                        Current Occupant
                    </span>

                    <strong>
                        ${escapeHTML(
                            occupant
                        )}
                    </strong>

                </div>

            </div>


            <div class="room-card-bottom">

                <div class="room-rent">

                    ₹${formatNumber(
                        room.rent
                    )}

                    <span>
                        / month
                    </span>

                </div>


                <button
                    class="view-room-btn"
                    data-id="${room.id}">

                    View Details

                </button>

            </div>

        </article>

    `;

}


/* =========================================================
   ATTACH ROOM ACTIONS
========================================================= */

function attachRoomActions() {


    document
        .querySelectorAll(
            ".view-room-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        openDetails(
                            button.dataset.id
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".edit-room"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        openRoomModal(
                            button.dataset.id
                        );

                    }
                );

            }
        );

}


/* =========================================================
   OPEN ADD / EDIT MODAL
========================================================= */

function openRoomModal(
    id = null
) {

    currentEditId =
        id;


    const title =
        document.getElementById(
            "roomModalTitle"
        );


    if (id) {

        const room =
            rooms.find(
                item =>
                    item.id === id
            );


        if (!room) {
            return;
        }


        title.textContent =
            "Edit Room";


        document.getElementById(
            "roomNumber"
        ).value =
            room.roomNumber;


        document.getElementById(
            "roomFloor"
        ).value =
            room.floor;


        document.getElementById(
            "roomProperty"
        ).value =
            room.property;


        document.getElementById(
            "roomType"
        ).value =
            room.type;


        document.getElementById(
            "roomRent"
        ).value =
            room.rent;


        document.getElementById(
            "roomCapacity"
        ).value =
            room.capacity;


        document.getElementById(
            "roomStatus"
        ).value =
            room.status;


        document.getElementById(
            "roomOccupant"
        ).value =
            room.occupant || "";

    } else {

        title.textContent =
            "Add Room";


        document
            .getElementById(
                "roomForm"
            )
            .reset();


        document.getElementById(
            "roomStatus"
        ).value =
            "available";


        if (
            propertyFilter.value !==
            "all"
        ) {

            document.getElementById(
                "roomProperty"
            ).value =
                propertyFilter.value;

        }

    }


    openModal(
        roomModal
    );

}


/* =========================================================
   SAVE ROOM
========================================================= */

function saveRoom(
    event
) {

    event.preventDefault();


    const roomNumber =
        document.getElementById(
            "roomNumber"
        ).value.trim();


    const floor =
        document.getElementById(
            "roomFloor"
        ).value.trim();


    const property =
        document.getElementById(
            "roomProperty"
        ).value;


    const type =
        document.getElementById(
            "roomType"
        ).value;


    const rent =
        Number(
            document.getElementById(
                "roomRent"
            ).value
        );


    const capacity =
        Number(
            document.getElementById(
                "roomCapacity"
            ).value
        );


    const status =
        document.getElementById(
            "roomStatus"
        ).value;


    let occupant =
        document.getElementById(
            "roomOccupant"
        ).value.trim();


    if (!roomNumber || !floor) {

        showToast(
            "Missing information",
            "Please enter room number and floor."
        );

        return;

    }


    if (
        !rent ||
        rent < 0
    ) {

        showToast(
            "Invalid rent",
            "Please enter a valid monthly rent."
        );

        return;

    }


    if (
        !capacity ||
        capacity < 1
    ) {

        showToast(
            "Invalid capacity",
            "Capacity must be at least 1."
        );

        return;

    }


    /* Automatically clear occupant
       when room is available */

    if (
        status !==
        "occupied"
    ) {

        occupant = "";

    }


    if (currentEditId) {

        const index =
            rooms.findIndex(
                room =>
                    room.id ===
                    currentEditId
            );


        if (
            index !== -1
        ) {

            rooms[index] = {

                ...rooms[index],

                roomNumber,

                floor,

                property,

                type,

                rent,

                capacity,

                status,

                occupant

            };

        }


        saveRooms();

        closeRoomModal();

        populatePropertyFilters();

        populateRoomPropertySelect();

        updateStats();

        renderRooms();


        showToast(
            "Room updated",
            `Room ${roomNumber} has been updated successfully.`
        );

    } else {


        /* Check duplicate room */

        const duplicate =
            rooms.some(
                room =>
                    room.property ===
                        property &&
                    room.roomNumber
                        .toLowerCase() ===
                        roomNumber.toLowerCase()
            );


        if (duplicate) {

            showToast(
                "Room already exists",
                `Room ${roomNumber} already exists in this property.`
            );

            return;

        }


        const newRoom = {

            id:
                generateRoomId(),

            roomNumber,

            floor,

            property,

            type,

            rent,

            capacity,

            status,

            occupant

        };


        rooms.unshift(
            newRoom
        );


        saveRooms();

        closeRoomModal();

        populatePropertyFilters();

        populateRoomPropertySelect();

        updateStats();

        renderRooms();


        showToast(
            "Room added",
            `Room ${roomNumber} has been added successfully.`
        );

    }


    currentEditId =
        null;

}


/* =========================================================
   OPEN DETAILS
========================================================= */

function openDetails(
    id
) {

    const room =
        rooms.find(
            item =>
                item.id === id
        );


    if (!room) {
        return;
    }


    selectedRoomId =
        id;


    document.getElementById(
        "detailsRoomNumber"
    ).textContent =
        `Room ${room.roomNumber}`;


    document.getElementById(
        "detailsProperty"
    ).textContent =
        room.property;


    document.getElementById(
        "detailsType"
    ).textContent =
        capitalize(
            room.type
        );


    document.getElementById(
        "detailsFloor"
    ).textContent =
        room.floor;


    document.getElementById(
        "detailsRent"
    ).textContent =
        `₹${formatNumber(
            room.rent
        )}`;


    document.getElementById(
        "detailsCapacity"
    ).textContent =
        `${room.capacity} ${
            room.capacity === 1
                ? "Person"
                : "Persons"
        }`;


    document.getElementById(
        "detailsOccupant"
    ).textContent =
        room.occupant ||
        "Available";


    document.getElementById(
        "detailsId"
    ).textContent =
        room.id;


    const status =
        document.getElementById(
            "detailsStatus"
        );


    status.textContent =
        capitalize(
            room.status
        );


    status.className =
        `details-status ${room.status}`;


    const icon =
        document.getElementById(
            "detailsRoomIcon"
        );


    icon.className =
        "room-big-icon";


    if (
        room.status ===
        "occupied"
    ) {

        icon.classList.add(
            "occupied"
        );

    }


    if (
        room.status ===
        "maintenance"
    ) {

        icon.classList.add(
            "maintenance"
        );

    }


    openModal(
        detailsModal
    );

}


/* =========================================================
   EDIT SELECTED
========================================================= */

function editSelectedRoom() {

    if (!selectedRoomId) {
        return;
    }


    closeModal(
        detailsModal
    );


    openRoomModal(
        selectedRoomId
    );

}


/* =========================================================
   DELETE ROOM
========================================================= */

function deleteSelectedRoom() {

    if (!selectedRoomId) {
        return;
    }


    const room =
        rooms.find(
            item =>
                item.id ===
                selectedRoomId
        );


    if (!room) {
        return;
    }


    const confirmed =
        confirm(
            `Delete Room ${room.roomNumber} from ${room.property}?`
        );


    if (!confirmed) {
        return;
    }


    rooms =
        rooms.filter(
            item =>
                item.id !==
                selectedRoomId
        );


    saveRooms();

    closeModal(
        detailsModal
    );

    populatePropertyFilters();

    populateRoomPropertySelect();

    updateStats();

    renderRooms();


    showToast(
        "Room deleted",
        `Room ${room.roomNumber} has been removed.`
    );


    selectedRoomId =
        null;

}


/* =========================================================
   UPDATE STATS
========================================================= */

function updateStats() {

    const total =
        rooms.length;


    const available =
        rooms.filter(
            room =>
                room.status ===
                "available"
        ).length;


    const occupied =
        rooms.filter(
            room =>
                room.status ===
                "occupied"
        ).length;


    const maintenance =
        rooms.filter(
            room =>
                room.status ===
                "maintenance"
        ).length;


    document.getElementById(
        "totalRooms"
    ).textContent =
        total;


    document.getElementById(
        "availableRooms"
    ).textContent =
        available;


    document.getElementById(
        "occupiedRooms"
    ).textContent =
        occupied;


    document.getElementById(
        "maintenanceRooms"
    ).textContent =
        maintenance;

}


/* =========================================================
   VIEW
========================================================= */

function setView(
    view
) {

    currentView =
        view;


    const gridBtn =
        document.getElementById(
            "gridViewBtn"
        );


    const listBtn =
        document.getElementById(
            "listViewBtn"
        );


    gridBtn.classList.toggle(
        "active",
        view === "grid"
    );


    listBtn.classList.toggle(
        "active",
        view === "list"
    );


    renderRooms();

}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

function globalSearch(
    event
) {

    const value =
        event.target.value
            .trim()
            .toLowerCase();


    const container =
        document.getElementById(
            "globalResults"
        );


    if (!value) {

        container.innerHTML = `

            <p>
                Start typing to search rooms.
            </p>

        `;

        return;

    }


    const matched =
        rooms.filter(
            room => {

                const text = [

                    room.roomNumber,

                    room.property,

                    room.occupant,

                    room.type

                ]
                    .join(" ")
                    .toLowerCase();


                return text.includes(
                    value
                );

            }
        );


    if (
        matched.length === 0
    ) {

        container.innerHTML = `

            <p>
                No rooms found.
            </p>

        `;

        return;

    }


    container.innerHTML =
        matched
            .map(
                room => `

                    <div
                        class="global-result"
                        data-id="${room.id}">

                        <div class="global-result-icon">

                            <i class="fa-solid fa-door-open"></i>

                        </div>

                        <div>

                            <strong>
                                Room ${escapeHTML(
                                    room.roomNumber
                                )}
                            </strong>

                            <span>
                                ${escapeHTML(
                                    room.property
                                )}
                            </span>

                        </div>

                    </div>

                `
            )
            .join("");


    container
        .querySelectorAll(
            ".global-result"
        )
        .forEach(
            item => {

                item.addEventListener(
                    "click",
                    () => {

                        closeModal(
                            searchModal
                        );

                        openDetails(
                            item.dataset.id
                        );

                    }
                );

            }
        );

}


/* =========================================================
   GENERATE ID
========================================================= */

function generateRoomId() {

    let number =
        1001;


    while (
        rooms.some(
            room =>
                room.id ===
                `RN-RM-${number}`
        )
    ) {

        number++;

    }


    return `RN-RM-${number}`;

}


/* =========================================================
   HELPERS
========================================================= */

function capitalize(
    value
) {

    if (!value) {
        return "";
    }


    return value
        .charAt(0)
        .toUpperCase() +
        value
            .slice(1)
            .toLowerCase();

}


function formatNumber(
    value
) {

    return Number(
        value || 0
    ).toLocaleString(
        "en-IN"
    );

}


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


function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
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


/* =========================================================
   MODALS
========================================================= */

function openModal(
    modal
) {

    modal.classList.add(
        "show"
    );

}


function closeModal(
    modal
) {

    modal.classList.remove(
        "show"
    );

}


function closeRoomModal() {

    closeModal(
        roomModal
    );

    currentEditId =
        null;

}


/* =========================================================
   SIDEBAR
========================================================= */

function openSidebar() {

    document
        .getElementById(
            "ownerSidebar"
        )
        .classList.add(
            "open"
        );


    document
        .getElementById(
            "sidebarOverlay"
        )
        .classList.add(
            "show"
        );

}


function closeSidebar() {

    document
        .getElementById(
            "ownerSidebar"
        )
        .classList.remove(
            "open"
        );


    document
        .getElementById(
            "sidebarOverlay"
        )
        .classList.remove(
            "show"
        );

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


    const toast =
        document.getElementById(
            "toast"
        );


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
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth >
            950
        ) {

            closeSidebar();

        }

    }
);