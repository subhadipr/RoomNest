/* =========================================================
   ROOMNEST — ADMIN REPORTS
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

const logoutBtn = document.getElementById("logoutBtn");

const exportBtn = document.getElementById("exportBtn");
const viewAllBtn = document.getElementById("viewAllBtn");

const dateRange = document.getElementById("dateRange");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });

}


/* =========================================================
   CLOSE SIDEBAR WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", (event) => {

    if (!sidebar || !menuBtn) return;

    const clickedInsideSidebar =
        sidebar.contains(event.target);

    const clickedMenu =
        menuBtn.contains(event.target);

    if (
        window.innerWidth <= 900 &&
        !clickedInsideSidebar &&
        !clickedMenu
    ) {

        sidebar.classList.remove("open");

    }

});


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================================
   DATE RANGE
========================================================= */

dateRange.addEventListener("change", () => {

    const value = dateRange.value;

    let text = "";

    if (value === "7") {
        text = "Report updated for last 7 days.";
    }

    else if (value === "30") {
        text = "Report updated for last 30 days.";
    }

    else if (value === "90") {
        text = "Report updated for last 3 months.";
    }

    else if (value === "365") {
        text = "Report updated for last 12 months.";
    }

    showToast(text);

});


/* =========================================================
   EXPORT REPORT
========================================================= */

exportBtn.addEventListener("click", () => {

    const reportData = [
        ["RoomNest Admin Report"],
        [""],
        ["Metric", "Value"],
        ["Total Revenue", "₹8,42,650"],
        ["Total Bookings", "1,284"],
        ["New Users", "486"],
        ["Active Properties", "1,842"],
        [""],
        ["Recent Transactions"],
        ["Transaction ID", "Student", "Property", "Date", "Amount", "Status"],
        [
            "#RN-10482",
            "Arjun Sen",
            "Green View PG",
            "15 Sep 2026",
            "₹8,500",
            "Completed"
        ],
        [
            "#RN-10481",
            "Rahul Sharma",
            "City Nest Hostel",
            "15 Sep 2026",
            "₹6,200",
            "Completed"
        ],
        [
            "#RN-10480",
            "Priya Das",
            "Lake Side Rooms",
            "14 Sep 2026",
            "₹7,800",
            "Pending"
        ],
        [
            "#RN-10479",
            "Sourav Mondal",
            "Student Hub PG",
            "14 Sep 2026",
            "₹9,000",
            "Completed"
        ]
    ];


    const csvContent = reportData
        .map(row =>
            row
                .map(value => `"${value}"`)
                .join(",")
        )
        .join("\n");


    const blob = new Blob(
        [csvContent],
        {
            type: "text/csv;charset=utf-8;"
        }
    );


    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "roomnest-admin-report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);


    showToast("Report exported successfully.");

});


/* =========================================================
   VIEW ALL
========================================================= */

viewAllBtn.addEventListener("click", () => {

    showToast(
        "All transaction reports will be available here."
    );

});


/* =========================================================
   BAR HOVER EFFECT
========================================================= */

const bars = document.querySelectorAll(".bar");

bars.forEach((bar) => {

    bar.addEventListener("mouseenter", () => {

        bar.style.opacity = "1";

    });

    bar.addEventListener("mouseleave", () => {

        bar.style.opacity = ".9";

    });

});


/* =========================================================
   LOGOUT
========================================================= */

logoutBtn.addEventListener("click", () => {

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;


    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");


    window.location.href =
        "../../public/auth/login.html";

});


/* =========================================================
   INITIAL LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("RoomNest Admin Reports loaded successfully.");

});