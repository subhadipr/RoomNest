/* =========================================================
   ROOMNEST — ABOUT JS
   File: about.js
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");


if (mobileMenuButton && mobileMenu) {

    mobileMenuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

        const isOpen =
            mobileMenu.classList.contains("open");

        mobileMenuButton.textContent =
            isOpen ? "✕" : "☰";

    });


    document.querySelectorAll(".mobile-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

                mobileMenuButton.textContent = "☰";

            });

        });

}


/* =========================================================
   ESC CLOSE
========================================================= */

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        mobileMenu &&
        mobileMenuButton
    ) {

        mobileMenu.classList.remove("open");

        mobileMenuButton.textContent = "☰";

    }

});


/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters =
    document.querySelectorAll(".counter");

let countersStarted = false;


function animateCounters() {

    if (countersStarted) {
        return;
    }

    countersStarted = true;


    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        const suffix =
            counter.dataset.suffix || "";

        let current = 0;

        const duration = 1400;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);


            const easedProgress =
                1 - Math.pow(1 - progress, 3);


            current =
                Math.floor(
                    target * easedProgress
                );


            counter.textContent =
                current.toLocaleString() + suffix;


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target.toLocaleString() + suffix;

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    });

}


/* =========================================================
   COUNTER OBSERVER
========================================================= */

const statsSection =
    document.querySelector(".stats-section");


if (
    "IntersectionObserver" in window &&
    statsSection
) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounters();

                        observer.disconnect();

                    }

                });

            },
            {
                threshold: 0.25
            }
        );


    observer.observe(statsSection);

} else {

    animateCounters();

}


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop =
    document.getElementById("backTop");


if (backTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    });


    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".value-card, .audience-card, .mission-point, .story-content"
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(20px)";

    element.style.transition =
        "opacity .6s ease, transform .6s ease";

});


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.style.opacity = "1";

        element.style.transform =
            "translateY(0)";

    });

}


/* =========================================================
   ACTIVE NAV ON SCROLL
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


/* =========================================================
   PREVENT HASH JUMP FOR FOOTER PLACEHOLDER LINKS
========================================================= */

document.querySelectorAll(
    '.footer-bottom a[href="#"]'
).forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

    });

});