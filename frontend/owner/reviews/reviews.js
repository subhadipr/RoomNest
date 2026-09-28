/* =========================================================
   ROOMNEST — OWNER REVIEWS JS
========================================================= */

"use strict";


/* =========================================================
   STORAGE
========================================================= */

const REVIEW_STORAGE_KEY =
    "roomnestOwnerReviews";

const OWNER_STORAGE_KEY =
    "roomnestOwner";


/* =========================================================
   DEFAULT REVIEWS
========================================================= */

const defaultReviews = [

    {
        id: "REV-1001",

        student: {
            name: "Rahul Das",
            email: "rahul.das@example.com",
            avatar: "RD"
        },

        property: "Green View PG",

        rating: 5,

        date: "2026-09-12",

        text:
            "Very good PG. The room was clean and the owner was very helpful. The location is also convenient for students.",

        helpful: 12,

        reply:
            "Thank you Rahul for your valuable feedback. We are happy that you had a good experience at Green View PG.",

        replyDate: "2026-09-13"

    },


    {
        id: "REV-1002",

        student: {
            name: "Sneha Mukherjee",
            email: "sneha.m@example.com",
            avatar: "SM"
        },

        property: "Lake View Residence",

        rating: 5,

        date: "2026-09-10",

        text:
            "I really liked the peaceful environment. Food quality is good and the rooms are maintained properly.",

        helpful: 9,

        reply:
            "Thank you Sneha. We appreciate your kind words and are glad you enjoyed your stay.",

        replyDate: "2026-09-11"

    },


    {
        id: "REV-1003",

        student: {
            name: "Amit Ghosh",
            email: "amit.g@example.com",
            avatar: "AG"
        },

        property: "City Center Boys PG",

        rating: 4,

        date: "2026-09-08",

        text:
            "Good PG overall. The room is spacious and the location is excellent. Wi-Fi could be slightly better.",

        helpful: 7,

        reply:
            "Thank you Amit for your feedback. We will definitely look into improving the Wi-Fi service.",

        replyDate: "2026-09-09"

    },


    {
        id: "REV-1004",

        student: {
            name: "Priya Sharma",
            email: "priya.s@example.com",
            avatar: "PS"
        },

        property: "Green View PG",

        rating: 5,

        date: "2026-09-06",

        text:
            "The room was exactly as shown in the photos. Very clean and comfortable. Highly satisfied.",

        helpful: 15,

        reply:
            "Thank you Priya. Your feedback means a lot to us.",

        replyDate: "2026-09-07"

    },


    {
        id: "REV-1005",

        student: {
            name: "Sourav Roy",
            email: "sourav.r@example.com",
            avatar: "SR"
        },

        property: "Green View PG",

        rating: 3,

        date: "2026-09-03",

        text:
            "The property is good and the room was clean, but the common area could be maintained better.",

        helpful: 5,

        reply: "",

        replyDate: ""

    },


    {
        id: "REV-1006",

        student: {
            name: "Ananya Sen",
            email: "ananya.s@example.com",
            avatar: "AS"
        },

        property: "Lake View Residence",

        rating: 4,

        date: "2026-08-30",

        text:
            "Nice place for students. The owner responds quickly whenever there is an issue.",

        helpful: 8,

        reply:
            "Thank you Ananya for sharing your experience.",

        replyDate: "2026-09-01"

    },


    {
        id: "REV-1007",

        student: {
            name: "Rohan Das",
            email: "rohan.d@example.com",
            avatar: "RD"
        },

        property: "City Center Boys PG",

        rating: 5,

        date: "2026-08-27",

        text:
            "Excellent experience. The property is near the main road and the room is very comfortable.",

        helpful: 11,

        reply:
            "Thank you Rohan. We are glad you had a comfortable stay.",

        replyDate: "2026-08-28"

    },


    {
        id: "REV-1008",

        student: {
            name: "Moumita Ghosh",
            email: "moumita.g@example.com",
            avatar: "MG"
        },

        property: "Lake View Residence",

        rating: 2,

        date: "2026-08-24",

        text:
            "The room was okay, but I faced some issues with water supply during my stay.",

        helpful: 4,

        reply: "",

        replyDate: ""

    }

];


/* =========================================================
   STATE
========================================================= */

let reviews = [];

let visibleReviews = 6;

let activePendingOnly = false;

let currentReplyReviewId = null;


/* =========================================================
   DOM
========================================================= */

const reviewsList =
    document.getElementById(
        "reviewsList"
    );

const reviewSearch =
    document.getElementById(
        "reviewSearch"
    );

const ratingFilter =
    document.getElementById(
        "ratingFilter"
    );

const propertyFilter =
    document.getElementById(
        "propertyFilter"
    );

const sortFilter =
    document.getElementById(
        "sortFilter"
    );

const loadMoreBtn =
    document.getElementById(
        "loadMoreBtn"
    );


const replyModal =
    document.getElementById(
        "replyModal"
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

        loadReviews();

        populatePropertyFilter();

        setupEvents();

        renderReviews();

        updateStats();

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
        ).textContent = name;


        document.getElementById(
            "topOwnerName"
        ).textContent = name;


        document.getElementById(
            "sidebarAvatar"
        ).textContent = initials;


        document.getElementById(
            "topAvatar"
        ).textContent = initials;

    } catch (error) {

        console.log(
            "Owner data error:",
            error
        );

    }

}


/* =========================================================
   LOAD REVIEWS
========================================================= */

function loadReviews() {

    const saved =
        localStorage.getItem(
            REVIEW_STORAGE_KEY
        );


    if (!saved) {

        reviews =
            structuredClone(
                defaultReviews
            );

        saveReviews();

        return;
    }


    try {

        reviews =
            JSON.parse(saved);

        if (
            !Array.isArray(reviews) ||
            reviews.length === 0
        ) {

            reviews =
                structuredClone(
                    defaultReviews
                );

            saveReviews();

        }

    } catch {

        reviews =
            structuredClone(
                defaultReviews
            );

        saveReviews();

    }

}


/* =========================================================
   SAVE
========================================================= */

function saveReviews() {

    localStorage.setItem(
        REVIEW_STORAGE_KEY,
        JSON.stringify(reviews)
    );

}


/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {


    /* Search */

    reviewSearch.addEventListener(
        "input",
        () => {

            visibleReviews = 6;

            renderReviews();

        }
    );


    /* Rating */

    ratingFilter.addEventListener(
        "change",
        () => {

            visibleReviews = 6;

            renderReviews();

        }
    );


    /* Property */

    propertyFilter.addEventListener(
        "change",
        () => {

            visibleReviews = 6;

            renderReviews();

        }
    );


    /* Sort */

    sortFilter.addEventListener(
        "change",
        () => {

            visibleReviews = 6;

            renderReviews();

        }
    );


    /* Load more */

    loadMoreBtn.addEventListener(
        "click",
        () => {

            visibleReviews += 6;

            renderReviews();

        }
    );


    /* Pending */

    document
        .getElementById(
            "showPendingBtn"
        )
        .addEventListener(
            "click",
            togglePendingReviews
        );


    /* Reply modal */

    document
        .getElementById(
            "closeReplyModal"
        )
        .addEventListener(
            "click",
            () =>
                closeModal(
                    replyModal
                )
        );


    document
        .getElementById(
            "cancelReplyBtn"
        )
        .addEventListener(
            "click",
            () =>
                closeModal(
                    replyModal
                )
        );


    document
        .getElementById(
            "saveReplyBtn"
        )
        .addEventListener(
            "click",
            saveReply
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
            "detailsCloseBtn"
        )
        .addEventListener(
            "click",
            () =>
                closeModal(
                    detailsModal
                )
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
            "globalReviewSearch"
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


    /* Outside click */

    [
        replyModal,
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
                    replyModal,
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
   PROPERTY FILTER
========================================================= */

function populatePropertyFilter() {

    const properties =
        [
            ...new Set(
                reviews.map(
                    review =>
                        review.property
                )
            )
        ];


    propertyFilter.innerHTML = `

        <option value="all">
            All Properties
        </option>

        ${properties.map(
            property => `

                <option value="${escapeHTML(
                    property
                )}">

                    ${escapeHTML(
                        property
                    )}

                </option>

            `
        ).join("")}

    `;

}


/* =========================================================
   GET FILTERED REVIEWS
========================================================= */

function getFilteredReviews() {

    let result =
        [...reviews];


    const search =
        reviewSearch.value
            .trim()
            .toLowerCase();


    const rating =
        ratingFilter.value;


    const property =
        propertyFilter.value;


    /* Pending */

    if (activePendingOnly) {

        result =
            result.filter(
                review =>
                    !review.reply ||
                    !review.reply.trim()
            );

    }


    /* Search */

    if (search) {

        result =
            result.filter(
                review => {

                    const text = [

                        review.student.name,

                        review.student.email,

                        review.property,

                        review.text

                    ]
                        .join(" ")
                        .toLowerCase();

                    return text.includes(
                        search
                    );

                }
            );

    }


    /* Rating */

    if (rating !== "all") {

        result =
            result.filter(
                review =>
                    String(
                        review.rating
                    ) === rating
            );

    }


    /* Property */

    if (property !== "all") {

        result =
            result.filter(
                review =>
                    review.property ===
                    property
            );

    }


    /* Sort */

    switch (
        sortFilter.value
    ) {

        case "oldest":

            result.sort(
                (a, b) =>
                    new Date(a.date) -
                    new Date(b.date)
            );

            break;


        case "highest":

            result.sort(
                (a, b) =>
                    b.rating -
                    a.rating
            );

            break;


        case "lowest":

            result.sort(
                (a, b) =>
                    a.rating -
                    b.rating
            );

            break;


        default:

            result.sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            );

    }


    return result;

}


/* =========================================================
   RENDER REVIEWS
========================================================= */

function renderReviews() {

    const filtered =
        getFilteredReviews();


    const visible =
        filtered.slice(
            0,
            visibleReviews
        );


    document.getElementById(
        "resultsCount"
    ).textContent =
        `Showing ${visible.length} of ${filtered.length} reviews`;


    if (visible.length === 0) {

        reviewsList.innerHTML = `

            <div class="review-empty">

                <div class="review-empty-icon">

                    <i class="fa-regular fa-star"></i>

                </div>

                <h3>
                    No reviews found
                </h3>

                <p>
                    Try changing your search or filters.
                </p>

            </div>

        `;

        loadMoreBtn.style.display =
            "none";

        return;

    }


    reviewsList.innerHTML =
        visible
            .map(
                createReviewHTML
            )
            .join("");


    if (
        visible.length <
        filtered.length
    ) {

        loadMoreBtn.style.display =
            "inline-flex";

    } else {

        loadMoreBtn.style.display =
            "none";

    }


    attachReviewActions();

}


/* =========================================================
   CREATE REVIEW HTML
========================================================= */

function createReviewHTML(
    review
) {

    const stars =
        createStars(
            review.rating
        );


    const hasReply =
        review.reply &&
        review.reply.trim();


    return `

        <article
            class="review-card"
            data-review-id="${review.id}"
        >


            <div class="review-card-top">


                <div class="reviewer-info">

                    <div class="reviewer-avatar">

                        ${escapeHTML(
                            review.student.avatar
                        )}

                    </div>


                    <div class="reviewer-details">

                        <h3>

                            ${escapeHTML(
                                review.student.name
                            )}

                            ${
                                !hasReply
                                    ? `
                                        <span class="pending-tag">

                                            <i class="fa-solid fa-clock"></i>

                                            Reply needed

                                        </span>
                                      `
                                    : ""
                            }

                        </h3>


                        <span>

                            Student

                        </span>


                        <div class="review-property">

                            <i class="fa-solid fa-building"></i>

                            ${escapeHTML(
                                review.property
                            )}

                        </div>

                    </div>

                </div>


                <div class="review-rating-area">

                    <div class="review-stars">

                        ${stars}

                    </div>


                    <div class="review-date">

                        ${formatDate(
                            review.date
                        )}

                    </div>

                </div>


            </div>


            <div class="review-text">

                ${escapeHTML(
                    review.text
                )}

            </div>


            ${
                hasReply
                    ? `

                        <div class="owner-reply">

                            <div
                                class="owner-reply-header">

                                <strong>

                                    <i class="fa-solid fa-reply"></i>

                                    Your Reply

                                </strong>

                                <span>

                                    ${formatDate(
                                        review.replyDate
                                    )}

                                </span>

                            </div>


                            <p>

                                ${escapeHTML(
                                    review.reply
                                )}

                            </p>

                        </div>

                      `
                    : ""
            }


            <div class="review-bottom">


                <div class="helpful-info">

                    <i class="fa-solid fa-thumbs-up"></i>

                    ${review.helpful || 0}
                    students found this helpful

                </div>


                <div class="review-actions">


                    <button
                        class="review-action-btn view-review"
                        data-id="${review.id}">

                        <i class="fa-solid fa-eye"></i>

                        View

                    </button>


                    ${
                        hasReply
                            ? `

                                <button
                                    class="review-action-btn reply edit-reply"
                                    data-id="${review.id}">

                                    <i class="fa-solid fa-pen"></i>

                                    Edit Reply

                                </button>

                                <button
                                    class="review-action-btn delete delete-reply"
                                    data-id="${review.id}">

                                    <i class="fa-solid fa-trash"></i>

                                    Delete Reply

                                </button>

                              `
                            : `

                                <button
                                    class="review-action-btn reply reply-review"
                                    data-id="${review.id}">

                                    <i class="fa-solid fa-reply"></i>

                                    Reply

                                </button>

                              `
                    }

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   ATTACH REVIEW ACTIONS
========================================================= */

function attachReviewActions() {


    document
        .querySelectorAll(
            ".view-review"
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
            ".reply-review"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        openReply(
                            button.dataset.id
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".edit-reply"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        openReply(
                            button.dataset.id
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".delete-reply"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        deleteReply(
                            button.dataset.id
                        );

                    }
                );

            }
        );

}


/* =========================================================
   CREATE STARS
========================================================= */

function createStars(
    rating
) {

    let html = "";


    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        html +=
            i <= rating

                ? `<i class="fa-solid fa-star"></i>`

                : `<i class="fa-regular fa-star"></i>`;

    }


    return html;

}


/* =========================================================
   OPEN REPLY
========================================================= */

function openReply(
    id
) {

    const review =
        reviews.find(
            item =>
                item.id === id
        );


    if (!review) {
        return;
    }


    currentReplyReviewId =
        id;


    document.getElementById(
        "modalReviewAvatar"
    ).textContent =
        review.student.avatar;


    document.getElementById(
        "modalReviewStudent"
    ).textContent =
        review.student.name;


    document.getElementById(
        "modalReviewStars"
    ).innerHTML =
        createStars(
            review.rating
        );


    document.getElementById(
        "modalReviewText"
    ).textContent =
        review.text;


    document.getElementById(
        "replyInput"
    ).value =
        review.reply || "";


    document.getElementById(
        "saveReplyBtn"
    ).innerHTML =
        review.reply

            ? `
                <i class="fa-solid fa-pen"></i>
                Update Reply
              `

            : `
                <i class="fa-solid fa-paper-plane"></i>
                Send Reply
              `;


    openModal(
        replyModal
    );


    setTimeout(
        () => {

            document
                .getElementById(
                    "replyInput"
                )
                .focus();

        },
        100
    );

}


/* =========================================================
   SAVE REPLY
========================================================= */

function saveReply() {

    if (!currentReplyReviewId) {
        return;
    }


    const input =
        document.getElementById(
            "replyInput"
        );


    const reply =
        input.value.trim();


    if (!reply) {

        showToast(
            "Reply required",
            "Please write a reply before sending."
        );

        input.focus();

        return;

    }


    const review =
        reviews.find(
            item =>
                item.id ===
                currentReplyReviewId
        );


    if (!review) {
        return;
    }


    const isUpdate =
        Boolean(
            review.reply
        );


    review.reply =
        reply;


    review.replyDate =
        getTodayISO();


    saveReviews();

    closeModal(
        replyModal
    );

    renderReviews();

    updateStats();


    showToast(
        isUpdate
            ? "Reply updated"
            : "Reply sent",
        isUpdate
            ? "Your review reply has been updated."
            : "Your reply has been sent successfully."
    );


    currentReplyReviewId =
        null;

}


/* =========================================================
   DELETE REPLY
========================================================= */

function deleteReply(
    id
) {

    const review =
        reviews.find(
            item =>
                item.id === id
        );


    if (!review) {
        return;
    }


    const confirmed =
        confirm(
            `Delete your reply to ${review.student.name}'s review?`
        );


    if (!confirmed) {
        return;
    }


    review.reply = "";

    review.replyDate = "";


    saveReviews();

    renderReviews();

    updateStats();


    showToast(
        "Reply deleted",
        "Your reply has been removed."
    );

}


/* =========================================================
   OPEN DETAILS
========================================================= */

function openDetails(
    id
) {

    const review =
        reviews.find(
            item =>
                item.id === id
        );


    if (!review) {
        return;
    }


    document.getElementById(
        "detailsAvatar"
    ).textContent =
        review.student.avatar;


    document.getElementById(
        "detailsStudentName"
    ).textContent =
        review.student.name;


    document.getElementById(
        "detailsDate"
    ).textContent =
        formatDate(
            review.date
        );


    document.getElementById(
        "detailsRating"
    ).innerHTML =
        createStars(
            review.rating
        );


    document.getElementById(
        "detailsProperty"
    ).textContent =
        review.property;


    document.getElementById(
        "detailsReviewText"
    ).textContent =
        review.text;


    const replyContainer =
        document.getElementById(
            "detailsOwnerReply"
        );


    if (
        review.reply &&
        review.reply.trim()
    ) {

        replyContainer.innerHTML = `

            <div
                class="details-owner-reply-content">

                <strong>
                    <i class="fa-solid fa-reply"></i>
                    Your Reply
                </strong>

                <p>
                    ${escapeHTML(
                        review.reply
                    )}
                </p>

            </div>

        `;

    } else {

        replyContainer.innerHTML = "";

    }


    openModal(
        detailsModal
    );

}


/* =========================================================
   PENDING FILTER
========================================================= */

function togglePendingReviews() {

    activePendingOnly =
        !activePendingOnly;


    const button =
        document.getElementById(
            "showPendingBtn"
        );


    if (activePendingOnly) {

        button.innerHTML = `

            <i class="fa-solid fa-xmark"></i>

            Show All Reviews

        `;

    } else {

        button.innerHTML = `

            <i class="fa-solid fa-reply"></i>

            Reviews Needing Reply

        `;

    }


    visibleReviews = 6;

    renderReviews();

}


/* =========================================================
   UPDATE STATS
========================================================= */

function updateStats() {

    const total =
        reviews.length;


    const replied =
        reviews.filter(
            review =>
                review.reply &&
                review.reply.trim()
        ).length;


    const pending =
        total - replied;


    const helpful =
        reviews.reduce(
            (
                sum,
                review
            ) =>
                sum +
                Number(
                    review.helpful || 0
                ),
            0
        );


    const average =
        total
            ? reviews.reduce(
                (
                    sum,
                    review
                ) =>
                    sum +
                    Number(
                        review.rating
                    ),
                0
            ) / total
            : 0;


    document.getElementById(
        "totalReviews"
    ).textContent =
        total;


    document.getElementById(
        "totalReviewsSmall"
    ).textContent =
        total;


    document.getElementById(
        "repliedReviews"
    ).textContent =
        replied;


    document.getElementById(
        "pendingReplies"
    ).textContent =
        pending;


    document.getElementById(
        "helpfulVotes"
    ).textContent =
        helpful;


    document.getElementById(
        "averageRating"
    ).textContent =
        average.toFixed(1);


    updateRatingBreakdown();

}


/* =========================================================
   RATING BREAKDOWN
========================================================= */

function updateRatingBreakdown() {

    const total =
        reviews.length || 1;


    for (
        let rating = 1;
        rating <= 5;
        rating++
    ) {

        const count =
            reviews.filter(
                review =>
                    Number(
                        review.rating
                    ) === rating
            ).length;


        const percentage =
            (
                count /
                total
            ) * 100;


        const bar =
            document.getElementById(
                `bar${rating}`
            );


        const counter =
            document.getElementById(
                `count${rating}`
            );


        if (bar) {

            bar.style.width =
                `${percentage}%`;

        }


        if (counter) {

            counter.textContent =
                count;

        }

    }

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


    const results =
        document.getElementById(
            "globalSearchResults"
        );


    if (!value) {

        results.innerHTML = `

            <p>
                Start typing to search reviews.
            </p>

        `;

        return;

    }


    const matched =
        reviews.filter(
            review => {

                const text = [

                    review.student.name,

                    review.property,

                    review.text

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

        results.innerHTML = `

            <p>
                No matching reviews found.
            </p>

        `;

        return;

    }


    results.innerHTML =
        matched
            .map(
                review => `

                    <div
                        class="global-result"
                        data-id="${review.id}"
                    >

                        <div class="global-result-avatar">

                            ${escapeHTML(
                                review.student.avatar
                            )}

                        </div>

                        <div>

                            <strong>

                                ${escapeHTML(
                                    review.student.name
                                )}

                            </strong>

                            <small>

                                ${escapeHTML(
                                    review.property
                                )}

                            </small>

                        </div>

                    </div>

                `
            )
            .join("");


    results
        .querySelectorAll(
            ".global-result"
        )
        .forEach(
            result => {

                result.addEventListener(
                    "click",
                    () => {

                        openDetails(
                            result.dataset.id
                        );

                        closeModal(
                            searchModal
                        );

                        document.getElementById(
                            "globalReviewSearch"
                        ).value = "";

                    }
                );

            }
        );

}


/* =========================================================
   DATE
========================================================= */

function formatDate(
    dateString
) {

    if (!dateString) {
        return "";
    }


    const date =
        new Date(
            dateString
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function getTodayISO() {

    return new Date()
        .toISOString()
        .split("T")[0];

}


/* =========================================================
   INITIALS
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
                word
                    .charAt(0)
        )
        .join("")
        .toUpperCase();

}


/* =========================================================
   ESCAPE HTML
========================================================= */

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
   MODAL
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


/* =========================================================
   MOBILE SIDEBAR
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