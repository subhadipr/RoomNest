/* =========================================================
   ROOMNEST — CONTACT JS
   File: contact.js
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (mobileMenuButton && mobileMenu) {

    mobileMenuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

        const isOpen =
            mobileMenu.classList.contains("open");

        mobileMenuButton.textContent =
            isOpen ? "✕" : "☰";

    });


    document.querySelectorAll(
        ".mobile-link"
    ).forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            mobileMenuButton.textContent = "☰";

        });

    });

}


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMobileMenu();

            closeSuccessModal();

        }

    }
);


/* =========================================================
   FORM ELEMENTS
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const phoneInput =
    document.getElementById("phone");

const subjectInput =
    document.getElementById("subject");

const messageInput =
    document.getElementById("message");

const charCount =
    document.getElementById("charCount");

const submitBtn =
    document.getElementById("submitBtn");


/* =========================================================
   PHONE
========================================================= */

phoneInput.addEventListener(
    "input",
    () => {

        phoneInput.value =
            phoneInput.value
                .replace(/\D/g, "")
                .slice(0, 10);

    }
);


/* =========================================================
   CHARACTER COUNT
========================================================= */

messageInput.addEventListener(
    "input",
    updateCharacterCount
);


function updateCharacterCount() {

    const length =
        messageInput.value.length;

    charCount.textContent =
        `${length} / 1000`;

}


/* =========================================================
   VALIDATION
========================================================= */

function showError(
    input,
    errorId,
    message
) {

    const group =
        input.closest(".form-group");

    const error =
        document.getElementById(errorId);

    group.classList.add(
        "error-field"
    );

    error.textContent =
        message;

}


function clearError(
    input,
    errorId
) {

    const group =
        input.closest(".form-group");

    const error =
        document.getElementById(errorId);

    group.classList.remove(
        "error-field"
    );

    error.textContent = "";

}


/* =========================================================
   NAME VALIDATION
========================================================= */

function validateName() {

    const value =
        nameInput.value.trim();

    if (!value) {

        showError(
            nameInput,
            "nameError",
            "Please enter your name."
        );

        return false;
    }

    if (value.length < 3) {

        showError(
            nameInput,
            "nameError",
            "Name must be at least 3 characters."
        );

        return false;
    }

    clearError(
        nameInput,
        "nameError"
    );

    return true;
}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function validateEmail() {

    const value =
        emailInput.value.trim();

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {

        showError(
            emailInput,
            "emailError",
            "Please enter your email."
        );

        return false;
    }

    if (!regex.test(value)) {

        showError(
            emailInput,
            "emailError",
            "Please enter a valid email."
        );

        return false;
    }

    clearError(
        emailInput,
        "emailError"
    );

    return true;
}


/* =========================================================
   PHONE VALIDATION
========================================================= */

function validatePhone() {

    const value =
        phoneInput.value.trim();

    if (!value) {

        showError(
            phoneInput,
            "phoneError",
            "Please enter your phone number."
        );

        return false;
    }

    if (!/^[6-9]\d{9}$/.test(value)) {

        showError(
            phoneInput,
            "phoneError",
            "Enter a valid 10-digit mobile number."
        );

        return false;
    }

    clearError(
        phoneInput,
        "phoneError"
    );

    return true;
}


/* =========================================================
   SUBJECT VALIDATION
========================================================= */

function validateSubject() {

    const value =
        subjectInput.value;

    if (!value) {

        showError(
            subjectInput,
            "subjectError",
            "Please select a subject."
        );

        return false;
    }

    clearError(
        subjectInput,
        "subjectError"
    );

    return true;
}


/* =========================================================
   MESSAGE VALIDATION
========================================================= */

function validateMessage() {

    const value =
        messageInput.value.trim();

    if (!value) {

        showError(
            messageInput,
            "messageError",
            "Please enter your message."
        );

        return false;
    }

    if (value.length < 10) {

        showError(
            messageInput,
            "messageError",
            "Message must be at least 10 characters."
        );

        return false;
    }

    clearError(
        messageInput,
        "messageError"
    );

    return true;
}


/* =========================================================
   LIVE VALIDATION
========================================================= */

nameInput.addEventListener(
    "blur",
    validateName
);

emailInput.addEventListener(
    "blur",
    validateEmail
);

phoneInput.addEventListener(
    "blur",
    validatePhone
);

subjectInput.addEventListener(
    "change",
    validateSubject
);

messageInput.addEventListener(
    "blur",
    validateMessage
);


/* =========================================================
   FORM SUBMIT
========================================================= */

contactForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const validName =
            validateName();

        const validEmail =
            validateEmail();

        const validPhone =
            validatePhone();

        const validSubject =
            validateSubject();

        const validMessage =
            validateMessage();


        if (
            !validName ||
            !validEmail ||
            !validPhone ||
            !validSubject ||
            !validMessage
        ) {

            return;
        }


        /* =========================
           LOADING
        ========================== */

        submitBtn.disabled = true;

        submitBtn.querySelector(
            ".submit-text"
        ).style.display = "none";

        submitBtn.querySelector(
            ".submit-arrow"
        ).style.display = "none";

        submitBtn.querySelector(
            ".submit-loading"
        ).style.display = "inline";


        await delay(900);


        /* =========================
           CONTACT DATA
        ========================== */

        const contactData = {

            id:
                "contact-" +
                Date.now(),

            name:
                nameInput.value.trim(),

            email:
                emailInput.value.trim()
                    .toLowerCase(),

            phone:
                phoneInput.value.trim(),

            subject:
                subjectInput.value,

            message:
                messageInput.value.trim(),

            createdAt:
                new Date().toISOString(),

            status:
                "new"

        };


        /* =========================
           SAVE LOCALLY
        ========================== */

        let contacts =
            JSON.parse(
                localStorage.getItem(
                    "roomnestContactMessages"
                )
            ) || [];


        contacts.push(contactData);


        localStorage.setItem(
            "roomnestContactMessages",
            JSON.stringify(contacts)
        );


        /* =========================
           RESET
        ========================== */

        contactForm.reset();

        updateCharacterCount();


        submitBtn.disabled = false;

        submitBtn.querySelector(
            ".submit-text"
        ).style.display = "inline";

        submitBtn.querySelector(
            ".submit-arrow"
        ).style.display = "inline";

        submitBtn.querySelector(
            ".submit-loading"
        ).style.display = "none";


        /* =========================
           SUCCESS
        ========================== */

        openSuccessModal();

    }
);


/* =========================================================
   SUCCESS MODAL
========================================================= */

const successOverlay =
    document.getElementById(
        "successOverlay"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalBtn =
    document.getElementById(
        "modalBtn"
    );


function openSuccessModal() {

    successOverlay.classList.add(
        "show"
    );

    document.body.style.overflow =
        "hidden";

}


function closeSuccessModal() {

    successOverlay.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


modalClose.addEventListener(
    "click",
    closeSuccessModal
);

modalBtn.addEventListener(
    "click",
    closeSuccessModal
);


successOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            successOverlay
        ) {

            closeSuccessModal();

        }

    }
);


/* =========================================================
   FAQ
========================================================= */

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );


faqQuestions.forEach(question => {

    question.addEventListener(
        "click",
        () => {

            const currentItem =
                question.closest(
                    ".faq-item"
                );


            document
                .querySelectorAll(
                    ".faq-item.open"
                )
                .forEach(item => {

                    if (
                        item !== currentItem
                    ) {

                        item.classList.remove(
                            "open"
                        );

                    }

                });


            currentItem.classList.toggle(
                "open"
            );

        }
    );

});


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop =
    document.getElementById(
        "backTop"
    );


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 450) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    }
);


backTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================================================
   DELAY
========================================================= */

function delay(ms) {

    return new Promise(
        resolve => {

            setTimeout(
                resolve,
                ms
            );

        }
    );

}


/* =========================================================
   INITIAL
========================================================= */

updateCharacterCount();