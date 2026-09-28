/* =========================================================
   ROOMNEST ADMIN — REVIEWS JS
========================================================= */


/* =========================================================
   DEMO DATA
========================================================= */

let reviews = [

    {
        id: "REV-4001",
        student: "Ankit Sharma",
        initials: "AS",
        email: "ankit@gmail.com",
        property: "Green View PG",
        propertyId: "PR-1001",
        rating: 5,
        review: "Very clean rooms and the owner is very helpful. The location is also convenient for students.",
        date: "16 Sep 2026",
        status: "approved"
    },


    {
        id: "REV-4002",
        student: "Priya Das",
        initials: "PD",
        email: "priya@gmail.com",
        property: "City Nest Hostel",
        propertyId: "PR-1002",
        rating: 4,
        review: "Good hostel with decent facilities. Wi-Fi and food quality are satisfactory.",
        date: "16 Sep 2026",
        status: "pending"
    },


    {
        id: "REV-4003",
        student: "Sourav Paul",
        initials: "SP",
        email: "sourav@gmail.com",
        property: "University View PG",
        propertyId: "PR-1005",
        rating: 5,
        review: "Great place for students. Rooms are spacious and the environment is peaceful.",
        date: "15 Sep 2026",
        status: "approved"
    },


    {
        id: "REV-4004",
        student: "Riya Sen",
        initials: "RS",
        email: "riya@gmail.com",
        property: "Lake Side Rooms",
        propertyId: "PR-1004",
        rating: 3,
        review: "The room was okay but some facilities need improvement.",
        date: "15 Sep 2026",
        status: "pending"
    },


    {
        id: "REV-4005",
        student: "Abhishek Roy",
        initials: "AR",
        email: "abhishek@gmail.com",
        property: "Peaceful Stay PG",
        propertyId: "PR-1007",
        rating: 4,
        review: "Nice place and friendly environment. Rent is reasonable.",
        date: "14 Sep 2026",
        status: "approved"
    },


    {
        id: "REV-4006",
        student: "Rahul Ghosh",
        initials: "RG",
        email: "rahul@gmail.com",
        property: "Campus Corner Hostel",
        propertyId: "PR-1008",
        rating: 2,
        review: "The room was smaller than expected and maintenance needs attention.",
        date: "14 Sep 2026",
        status: "hidden"
    },


    {
        id: "REV-4007",
        student: "Sneha Roy",
        initials: "SR",
        email: "sneha@gmail.com",
        property: "Student Comfort House",
        propertyId: "PR-1003",
        rating: 5,
        review: "Excellent experience. Very comfortable and suitable for students.",
        date: "13 Sep 2026",
        status: "approved"
    },


    {
        id: "REV-4008",
        student: "Kunal Das",
        initials: "KD",
        email: "kunal@gmail.com",
        property: "Royal Residency",
        propertyId: "PR-1006",
        rating: 3,
        review: "Good property overall, although the rent is slightly high.",
        date: "12 Sep 2026",
        status: "pending"
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const tableBody =
    document.getElementById("reviewTableBody");

const reviewSearch =
    document.getElementById("reviewSearch");

const statusFilter =
    document.getElementById("statusFilter");

const ratingFilter =
    document.getElementById("ratingFilter");

const emptyState =
    document.getElementById("emptyState");

const viewOverlay =
    document.getElementById("viewOverlay");

const viewContent =
    document.getElementById("viewContent");

let selectedReviewId = null;


/* =========================================================
   INIT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    renderReviews();

    updateStats();

    updateRatingSummary();

    setupSidebar();

    setupEvents();

});


/* =========================================================
   RENDER REVIEWS
========================================================= */

function renderReviews() {

    const search =
        reviewSearch.value
            .toLowerCase()
            .trim();

    const status =
        statusFilter.value;

    const rating =
        ratingFilter.value;


    const filtered =
        reviews.filter(review => {


            const matchesSearch =

                review.student
                    .toLowerCase()
                    .includes(search) ||

                review.email
                    .toLowerCase()
                    .includes(search) ||

                review.property
                    .toLowerCase()
                    .includes(search) ||

                review.review
                    .toLowerCase()
                    .includes(search) ||

                review.id
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                status === "all" ||
                review.status === status;


            const matchesRating =
                rating === "all" ||
                review.rating === Number(rating);


            return (
                matchesSearch &&
                matchesStatus &&
                matchesRating
            );

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


        filtered.forEach(review => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>

                    <div class="student-cell">

                        <div class="student-avatar">
                            ${review.initials}
                        </div>

                        <div>

                            <span class="student-name">
                                ${review.student}
                            </span>

                            <span class="student-email">
                                ${review.email}
                            </span>

                        </div>

                    </div>

                </td>


                <td>

                    <div class="property-cell">

                        <strong>
                            ${review.property}
                        </strong>

                        <span>
                            ${review.propertyId}
                        </span>

                    </div>

                </td>


                <td>

                    <div class="rating-cell">

                        <div class="stars">
                            ${generateStars(review.rating)}
                        </div>

                        <span class="rating-number">
                            ${review.rating}.0 / 5
                        </span>

                    </div>

                </td>


                <td>

                    <div
                        class="review-text"
                        title="${review.review}"
                    >
                        ${review.review}
                    </div>

                </td>


                <td>
                    ${review.date}
                </td>


                <td>

                    <span
                        class="review-status ${review.status}"
                    >
                        ${getStatusText(review.status)}
                    </span>

                </td>


                <td>

                    <div class="review-actions">


                        <button
                            class="review-action"
                            title="View"
                            onclick="viewReview('${review.id}')"
                        >

                            <i class="fa-regular fa-eye"></i>

                        </button>


                        ${
                            review.status !== "approved"

                            ?

                            `<button
                                class="review-action"
                                title="Approve"
                                onclick="approveReview('${review.id}')"
                            >
                                <i class="fa-solid fa-check"></i>
                            </button>`

                            :

                            `<button
                                class="review-action"
                                title="Hide"
                                onclick="hideReview('${review.id}')"
                            >
                                <i class="fa-solid fa-eye-slash"></i>
                            </button>`
                        }


                        <button
                            class="review-action delete"
                            title="Delete"
                            onclick="deleteReview('${review.id}')"
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
        `Showing ${filtered.length} of ${reviews.length} reviews`;

}


/* =========================================================
   GENERATE STARS
========================================================= */

function generateStars(rating) {

    let stars = "";


    for (let i = 1; i <= 5; i++) {

        if (i <= rating) {

            stars +=
                '<i class="fa-solid fa-star"></i>';

        } else {

            stars +=
                '<i class="fa-regular fa-star"></i>';

        }

    }


    return stars;

}


/* =========================================================
   STATUS TEXT
========================================================= */

function getStatusText(status) {

    if (status === "approved") {

        return "Published";

    }

    if (status === "pending") {

        return "Pending";

    }

    if (status === "hidden") {

        return "Hidden";

    }

    return status;

}


/* =========================================================
   STATS
========================================================= */

function updateStats() {

    const total =
        reviews.length;


    const pending =
        reviews.filter(
            review =>
                review.status === "pending"
        ).length;


    const approved =
        reviews.filter(
            review =>
                review.status === "approved"
        ).length;


    const hidden =
        reviews.filter(
            review =>
                review.status === "hidden"
        ).length;


    document.getElementById("totalReviews")
        .textContent = total;


    document.getElementById("pendingReviews")
        .textContent = pending;


    document.getElementById("approvedReviews")
        .textContent = approved;


    document.getElementById("hiddenReviews")
        .textContent = hidden;


    document.getElementById("reviewBadge")
        .textContent = pending;

}


/* =========================================================
   RATING SUMMARY
========================================================= */

function updateRatingSummary() {

    if (reviews.length === 0) {

        document.getElementById("averageRating")
            .textContent = "0.0";

        return;

    }


    const totalRating =
        reviews.reduce(
            (sum, review) =>
                sum + review.rating,
            0
        );


    const average =
        totalRating / reviews.length;


    document.getElementById("averageRating")
        .textContent =
        average.toFixed(1);


    document.getElementById("averageStars")
        .innerHTML =
        generateStars(
            Math.round(average)
        );


    const counts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    };


    reviews.forEach(review => {

        counts[review.rating]++;

    });


    for (let rating = 1; rating <= 5; rating++) {

        const count =
            counts[rating];


        const percentage =
            (count / reviews.length) * 100;


        document.getElementById(
            `${getRatingWord(rating)}Bar`
        ).style.width =
            `${percentage}%`;


        document.getElementById(
            `${getRatingWord(rating)}Count`
        ).textContent =
            count;

    }

}


/* =========================================================
   RATING WORD
========================================================= */

function getRatingWord(rating) {

    const words = {

        5: "five",
        4: "four",
        3: "three",
        2: "two",
        1: "one"

    };


    return words[rating];

}


/* =========================================================
   SEARCH / FILTER
========================================================= */

reviewSearch.addEventListener(
    "input",
    renderReviews
);


statusFilter.addEventListener(
    "change",
    renderReviews
);


ratingFilter.addEventListener(
    "change",
    renderReviews
);


/* =========================================================
   RESET
========================================================= */

document
    .getElementById("resetFilters")
    .addEventListener(
        "click",
        () => {

            reviewSearch.value = "";

            statusFilter.value = "all";

            ratingFilter.value = "all";

            renderReviews();

        }
    );


/* =========================================================
   VIEW REVIEW
========================================================= */

function viewReview(id) {

    const review =
        reviews.find(
            item => item.id === id
        );


    if (!review) return;


    selectedReviewId = id;


    viewContent.innerHTML = `

        <div class="view-header">

            <h2>
                Review Details
            </h2>

            <span>
                ${review.id} • ${review.date}
            </span>

        </div>


        <div class="view-body">


            <div class="view-student">

                <div class="view-avatar">
                    ${review.initials}
                </div>

                <div>

                    <strong>
                        ${review.student}
                    </strong>

                    <span>
                        ${review.email}
                    </span>

                </div>

            </div>


            <div class="view-rating">

                <span class="stars">
                    ${generateStars(review.rating)}
                </span>

                <strong>
                    ${review.rating}.0 / 5
                </strong>

            </div>


            <div class="view-review-box">

                <label>
                    STUDENT REVIEW
                </label>

                <p>
                    ${review.review}
                </p>

            </div>


            <div class="view-actions">

                ${
                    review.status === "approved"

                    ?

                    `<button
                        class="view-hide"
                        onclick="hideReview('${review.id}')"
                    >
                        <i class="fa-solid fa-eye-slash"></i>
                        Hide Review
                    </button>`

                    :

                    `<button
                        class="view-approve"
                        onclick="approveReview('${review.id}')"
                    >
                        <i class="fa-solid fa-check"></i>
                        Approve Review
                    </button>`
                }

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
   APPROVE
========================================================= */

function approveReview(id) {

    const review =
        reviews.find(
            item => item.id === id
        );


    if (!review) return;


    review.status = "approved";


    closeView();

    renderReviews();

    updateStats();


    showToast(
        "Review published successfully."
    );

}


/* =========================================================
   HIDE
========================================================= */

function hideReview(id) {

    const review =
        reviews.find(
            item => item.id === id
        );


    if (!review) return;


    review.status = "hidden";


    closeView();

    renderReviews();

    updateStats();


    showToast(
        "Review hidden successfully."
    );

}


/* =========================================================
   DELETE
========================================================= */

function deleteReview(id) {

    const review =
        reviews.find(
            item => item.id === id
        );


    if (!review) return;


    const confirmed =
        confirm(
            `Delete review ${review.id}?`
        );


    if (!confirmed) return;


    reviews =
        reviews.filter(
            item => item.id !== id
        );


    renderReviews();

    updateStats();

    updateRatingSummary();


    showToast(
        "Review deleted successfully."
    );

}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

document
    .getElementById("globalSearch")
    .addEventListener(
        "input",
        event => {

            reviewSearch.value =
                event.target.value;

            renderReviews();

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
                "You have pending reviews to moderate."
            );

        }
    );


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const toast =
        document.getElementById("reviewToast");

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
   SIDEBAR
========================================================= */

function setupSidebar() {

    const sidebar =
        document.getElementById(
            "reviewSidebar"
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