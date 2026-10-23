/* =========================================================
   ROOMNEST — REGISTER JS
   File: register.js
   Standalone Public Authentication
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const registerForm = document.getElementById("registerForm");

const roleButtons = document.querySelectorAll(".role-btn");

const selectedRole = document.getElementById("selectedRole");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const terms = document.getElementById("terms");

const registerBtn = document.getElementById("registerBtn");

const strengthText = document.getElementById("strengthText");
const strengthBars = document.querySelectorAll(".strength-bars span");

const ownerNote = document.getElementById("ownerNote");

const googleBtn = document.getElementById("googleBtn");


/* =========================================================
   ROLE SELECTION
========================================================= */

roleButtons.forEach(button => {

    button.addEventListener("click", () => {

        roleButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const role = button.dataset.role;

        selectedRole.value = role;

        updateOwnerNote(role);

    });

});


function updateOwnerNote(role) {

    if (role === "owner") {

        ownerNote.innerHTML = `
            <span>🏠</span>

            <p>
                <strong>List your property on RoomNest.</strong>
                Create an owner account to manage properties,
                rooms, bookings and student inquiries.
            </p>
        `;

    } else {

        ownerNote.innerHTML = `
            <span>🎓</span>

            <p>
                <strong>Looking for a place to stay?</strong>
                Create a student account to find PGs,
                rooms and connect with property owners.
            </p>
        `;

    }

}


/* =========================================================
   PASSWORD SHOW / HIDE
========================================================= */

const passwordToggles =
    document.querySelectorAll(".password-toggle");


passwordToggles.forEach(button => {

    button.addEventListener("click", () => {

        const targetId = button.dataset.target;

        const input =
            document.getElementById(targetId);

        if (input.type === "password") {

            input.type = "text";

            button.textContent = "🙈";

        } else {

            input.type = "password";

            button.textContent = "👁";

        }

    });

});


/* =========================================================
   PASSWORD STRENGTH
========================================================= */

password.addEventListener("input", () => {

    const value = password.value;

    let score = 0;

    if (value.length >= 6) {
        score++;
    }

    if (value.length >= 8) {
        score++;
    }

    if (/[A-Z]/.test(value)) {
        score++;
    }

    if (/[0-9]/.test(value)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(value)) {
        score++;
    }


    strengthBars.forEach(bar => {
        bar.style.background = "#e5e7eb";
    });


    if (!value) {

        strengthText.textContent =
            "Enter a password";

        strengthText.style.color =
            "#94a3b8";

        return;
    }


    if (score <= 2) {

        fillStrength(1);

        strengthText.textContent =
            "Weak password";

        strengthText.style.color =
            "#dc3545";

    } else if (score === 3) {

        fillStrength(2);

        strengthText.textContent =
            "Medium password";

        strengthText.style.color =
            "#d97706";

    } else if (score === 4) {

        fillStrength(3);

        strengthText.textContent =
            "Strong password";

        strengthText.style.color =
            "#12a889";

    } else {

        fillStrength(4);

        strengthText.textContent =
            "Very strong password";

        strengthText.style.color =
            "#0d9277";

    }

});


function fillStrength(count) {

    for (let i = 0; i < count; i++) {

        strengthBars[i].style.background =
            "#12a889";

    }

}


/* =========================================================
   PHONE INPUT
========================================================= */

phone.addEventListener("input", () => {

    phone.value =
        phone.value.replace(/\D/g, "").slice(0, 10);

});


/* =========================================================
   VALIDATION HELPERS
========================================================= */

function setError(input, errorId, message) {

    const wrapper =
        input.closest(".input-wrapper");

    const error =
        document.getElementById(errorId);

    if (wrapper) {
        wrapper.classList.add("error");
        wrapper.classList.remove("success");
    }

    error.textContent = message;

}


function setSuccess(input, errorId) {

    const wrapper =
        input.closest(".input-wrapper");

    const error =
        document.getElementById(errorId);

    if (wrapper) {
        wrapper.classList.remove("error");
        wrapper.classList.add("success");
    }

    error.textContent = "";

}


function clearValidation(input, errorId) {

    const wrapper =
        input.closest(".input-wrapper");

    const error =
        document.getElementById(errorId);

    if (wrapper) {
        wrapper.classList.remove("error");
        wrapper.classList.remove("success");
    }

    error.textContent = "";

}


/* =========================================================
   VALIDATE NAME
========================================================= */

function validateName() {

    const value = fullName.value.trim();

    if (!value) {

        setError(
            fullName,
            "nameError",
            "Please enter your full name."
        );

        return false;
    }

    if (value.length < 3) {

        setError(
            fullName,
            "nameError",
            "Name must be at least 3 characters."
        );

        return false;
    }

    setSuccess(fullName, "nameError");

    return true;
}


/* =========================================================
   VALIDATE EMAIL
========================================================= */

function validateEmail() {

    const value =
        email.value.trim().toLowerCase();

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {

        setError(
            email,
            "emailError",
            "Please enter your email."
        );

        return false;
    }

    if (!emailRegex.test(value)) {

        setError(
            email,
            "emailError",
            "Please enter a valid email address."
        );

        return false;
    }

    setSuccess(email, "emailError");

    return true;
}


/* =========================================================
   VALIDATE PHONE
========================================================= */

function validatePhone() {

    const value = phone.value.trim();

    if (!value) {

        setError(
            phone,
            "phoneError",
            "Please enter your phone number."
        );

        return false;
    }

    if (!/^[6-9]\d{9}$/.test(value)) {

        setError(
            phone,
            "phoneError",
            "Enter a valid 10-digit mobile number."
        );

        return false;
    }

    setSuccess(phone, "phoneError");

    return true;
}


/* =========================================================
   VALIDATE PASSWORD
========================================================= */

function validatePassword() {

    const value = password.value;

    if (!value) {

        setError(
            password,
            "passwordError",
            "Please create a password."
        );

        return false;
    }

    if (value.length < 6) {

        setError(
            password,
            "passwordError",
            "Password must be at least 6 characters."
        );

        return false;
    }

    setSuccess(password, "passwordError");

    return true;
}


/* =========================================================
   VALIDATE CONFIRM PASSWORD
========================================================= */

function validateConfirmPassword() {

    const value = confirmPassword.value;

    if (!value) {

        setError(
            confirmPassword,
            "confirmPasswordError",
            "Please confirm your password."
        );

        return false;
    }

    if (value !== password.value) {

        setError(
            confirmPassword,
            "confirmPasswordError",
            "Passwords do not match."
        );

        return false;
    }

    setSuccess(
        confirmPassword,
        "confirmPasswordError"
    );

    return true;
}


/* =========================================================
   VALIDATE TERMS
========================================================= */

function validateTerms() {

    const error =
        document.getElementById("termsError");

    if (!terms.checked) {

        error.textContent =
            "Please accept the Terms & Conditions.";

        return false;
    }

    error.textContent = "";

    return true;
}


/* =========================================================
   LIVE VALIDATION
========================================================= */

fullName.addEventListener("blur", validateName);

email.addEventListener("blur", validateEmail);

phone.addEventListener("blur", validatePhone);

password.addEventListener("blur", validatePassword);

confirmPassword.addEventListener(
    "blur",
    validateConfirmPassword
);

terms.addEventListener("change", validateTerms);


/* =========================================================
   REGISTER FORM
========================================================= */

registerForm.addEventListener("submit", async event => {

    event.preventDefault();


    const validName =
        validateName();

    const validEmail =
        validateEmail();

    const validPhone =
        validatePhone();

    const validPassword =
        validatePassword();

    const validConfirmPassword =
        validateConfirmPassword();

    const validTerms =
        validateTerms();


    if (
        !validName ||
        !validEmail ||
        !validPhone ||
        !validPassword ||
        !validConfirmPassword ||
        !validTerms
    ) {

        showToast(
            "Check your information",
            "Please fix the highlighted fields.",
            "!"
        );

        return;
    }


    /* PRODUCTION REGISTRATION */

    registerBtn.disabled = true;

    registerBtn.querySelector(".btn-text").style.display = "none";
    registerBtn.querySelector(".btn-arrow").style.display = "none";
    registerBtn.querySelector(".btn-loader").style.display = "inline";

    try {
        const response = await window.RoomNestAPI.register({
            name: fullName.value.trim(),
            email: email.value.trim().toLowerCase(),
            phone: phone.value.trim(),
            password: password.value,
            role: selectedRole.value
        });

        if (!response.success || !response.token || !response.user) {
            throw new Error(response.message || "Registration failed.");
        }

        localStorage.setItem("roomnestAuthToken", response.token);
        localStorage.setItem("roomnestUser", JSON.stringify(response.user));

        showToast(
            "Registration successful!",
            `Welcome to RoomNest, ${response.user.name}.`,
            "✓"
        );

        await delay(900);

        if (response.user.role === "owner") {
            window.location.href = "../../owner/dashboard/dashboard.html";
        } else {
            window.location.href = "../../student/dashboard/dashboard.html";
        }

    } catch (error) {
        showToast(
            "Registration failed",
            error.message || "Please try again.",
            "!"
        );

        registerBtn.disabled = false;
        registerBtn.querySelector(".btn-text").style.display = "inline";
        registerBtn.querySelector(".btn-arrow").style.display = "inline";
        registerBtn.querySelector(".btn-loader").style.display = "none";
    }
});


/* =========================================================
   GOOGLE SIGN-IN — ROOMNEST
========================================================= */

const GOOGLE_CLIENT_ID =
    "756177696993-cjvbnrb4vo30n71jmok795tpi55obmq6.apps.googleusercontent.com";

async function handleGoogleCredential(response) {
    try {
        if (!response || !response.credential) {
            throw new Error("Google credential was not received.");
        }

        if (!window.RoomNestAPI) {
            throw new Error("RoomNest API service is unavailable.");
        }

        const result = await window.RoomNestAPI.post(
            "/auth/google",
            {
                credential: response.credential,
                role: selectedRole.value || "student"
            }
        );

        if (!result.success || !result.token || !result.user) {
            throw new Error(
                result.message || "Google Sign-In failed."
            );
        }

        localStorage.setItem(
            "roomnestAuthToken",
            result.token
        );

        localStorage.setItem(
            "roomnestUser",
            JSON.stringify(result.user)
        );

        showToast(
            "Google Sign-In Successful",
            `Welcome to RoomNest, ${result.user.name}!`,
            "✓"
        );

        await delay(700);

        if (result.user.role === "owner") {
            window.location.href =
                "../../owner/dashboard/dashboard.html";
        } else {
            window.location.href =
                "../../student/dashboard/dashboard.html";
        }

    } catch (error) {
        showToast(
            "Google Sign-In Failed",
            error.message || "Please try again.",
            "!"
        );
    }
}

function initializeGoogleSignIn() {
    if (
        !window.google ||
        !window.google.accounts ||
        !window.google.accounts.id
    ) {
        showToast(
            "Google Sign-In Unavailable",
            "Google Sign-In could not load. Please refresh the page.",
            "!"
        );
        return;
    }

    if (
        !GOOGLE_CLIENT_ID ||
        GOOGLE_CLIENT_ID === "PASTE_YOUR_CLIENT_ID_HERE"
    ) {
        showToast(
            "Google Setup Incomplete",
            "Please configure your Google Client ID.",
            "!"
        );
        return;
    }

    window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
        auto_select: false
    });

    googleBtn.replaceChildren();

    const buttonWidth = Math.min(
        400,
        Math.max(180, googleBtn.clientWidth || 320)
    );

    window.google.accounts.id.renderButton(
        googleBtn,
        {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "continue_with",
            shape: "rectangular",
            logo_alignment: "left",
            width: buttonWidth
        }
    );
}

initializeGoogleSignIn();


/* =========================================================
   TERMS / PRIVACY
========================================================= */

const termsLink =
    document.getElementById("termsLink");

const privacyLink =
    document.getElementById("privacyLink");


termsLink.addEventListener("click", event => {

    event.preventDefault();

    openInfoModal(
        "Terms & Conditions",
        "RoomNest demo Terms & Conditions. " +
        "Real terms will be added when the production backend and legal pages are connected."
    );

});


privacyLink.addEventListener("click", event => {

    event.preventDefault();

    openInfoModal(
        "Privacy Policy",
        "RoomNest demo Privacy Policy. " +
        "The production privacy policy will be added before the live website launch."
    );

});


/* =========================================================
   INFO MODAL
========================================================= */

const infoModal =
    document.getElementById("infoModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");

const modalClose =
    document.getElementById("modalClose");

const modalOk =
    document.getElementById("modalOk");


function openInfoModal(title, text) {

    modalTitle.textContent = title;

    modalText.textContent = text;

    infoModal.classList.add("show");

}


function closeInfoModal() {

    infoModal.classList.remove("show");

}


modalClose.addEventListener(
    "click",
    closeInfoModal
);

modalOk.addEventListener(
    "click",
    closeInfoModal
);


infoModal.addEventListener("click", event => {

    if (event.target === infoModal) {

        closeInfoModal();

    }

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeInfoModal();

    }

});


/* =========================================================
   TOAST
========================================================= */

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");

const toastIcon =
    document.getElementById("toastIcon");

const toastClose =
    document.getElementById("toastClose");

let toastTimer;


function showToast(title, message, icon = "✓") {

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toastIcon.textContent = icon;

    toast.classList.add("show");


    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 4000);

}


toastClose.addEventListener(
    "click",
    () => {

        toast.classList.remove("show");

    }
);


/* =========================================================
   DELAY
========================================================= */

function delay(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


/* =========================================================
   PREVENT ACCIDENTAL SPACE IN EMAIL
========================================================= */

email.addEventListener("input", () => {

    email.value =
        email.value.replace(/\s/g, "");

});


/* =========================================================
   INITIAL STATE
========================================================= */

updateOwnerNote("student");