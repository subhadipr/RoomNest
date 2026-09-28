/* =========================================================
   ROOMNEST — LOGIN
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const rememberMe =
    document.getElementById("rememberMe");

const passwordToggle =
    document.getElementById(
        "passwordToggle"
    );

const loginSubmit =
    document.getElementById(
        "loginSubmit"
    );

const loginButtonText =
    document.getElementById(
        "loginButtonText"
    );

const forgotPassword =
    document.getElementById(
        "forgotPassword"
    );

const forgotModal =
    document.getElementById(
        "forgotModal"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const forgotForm =
    document.getElementById(
        "forgotForm"
    );

const resetEmail =
    document.getElementById(
        "resetEmail"
    );

const googleLogin =
    document.getElementById(
        "googleLogin"
    );


/* =========================================================
   REMEMBERED EMAIL
========================================================= */

const rememberedEmail =
    localStorage.getItem(
        "roomnestRememberedEmail"
    );


if (rememberedEmail) {

    emailInput.value =
        rememberedEmail;

    rememberMe.checked =
        true;

}


/* =========================================================
   PASSWORD SHOW / HIDE
========================================================= */

passwordToggle.addEventListener(
    "click",
    () => {

        const isPassword =
            passwordInput.type ===
            "password";


        passwordInput.type =
            isPassword
                ? "text"
                : "password";


        passwordToggle.textContent =
            isPassword
                ? "🙈"
                : "👁";

    }
);


/* =========================================================
   VALIDATION
========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


function clearErrors() {

    document.getElementById(
        "emailError"
    ).textContent = "";

    document.getElementById(
        "passwordError"
    ).textContent = "";

    emailInput
        .closest(".input-wrapper")
        .classList.remove("error");

    passwordInput
        .closest(".input-wrapper")
        .classList.remove("error");

}


function validateLogin() {

    clearErrors();

    let valid = true;


    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;


    if (!email) {

        document.getElementById(
            "emailError"
        ).textContent =
            "Please enter your email address.";

        emailInput
            .closest(".input-wrapper")
            .classList.add("error");

        valid = false;

    }

    else if (
        !isValidEmail(email)
    ) {

        document.getElementById(
            "emailError"
        ).textContent =
            "Please enter a valid email address.";

        emailInput
            .closest(".input-wrapper")
            .classList.add("error");

        valid = false;

    }


    if (!password) {

        document.getElementById(
            "passwordError"
        ).textContent =
            "Please enter your password.";

        passwordInput
            .closest(".input-wrapper")
            .classList.add("error");

        valid = false;

    }

    else if (
        password.length < 6
    ) {

        document.getElementById(
            "passwordError"
        ).textContent =
            "Password must contain at least 6 characters.";

        passwordInput
            .closest(".input-wrapper")
            .classList.add("error");

        valid = false;

    }


    return valid;

}


/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (!validateLogin()) {
            return;
        }


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        loginSubmit.disabled =
            true;

        loginSubmit.classList.add(
            "loading"
        );

        loginButtonText.textContent =
            "Signing in...";


        /*
         * DEMO LOGIN
         *
         * Backend authentication will be
         * connected later.
         */

        setTimeout(
            () => {

                const demoUser = {

                    id: "student-001",

                    name: "Subhadip Roy",

                    email: email,

                    role: "student",

                    loginAt:
                        new Date().toISOString()

                };


                localStorage.setItem(
                    "roomnestUser",
                    JSON.stringify(
                        demoUser
                    )
                );


                if (
                    rememberMe.checked
                ) {

                    localStorage.setItem(
                        "roomnestRememberedEmail",
                        email
                    );

                }

                else {

                    localStorage.removeItem(
                        "roomnestRememberedEmail"
                    );

                }


                showToast(
                    "Login Successful",
                    "Welcome back to RoomNest!"
                );


                /*
                 * Student dashboard
                 */

                setTimeout(
                    () => {

                        window.location.href =
                            "../../student/dashboard/dashboard.html";

                    },
                    900
                );


            },
            900
        );

    }
);


/* =========================================================
   FORGOT PASSWORD MODAL
========================================================= */

forgotPassword.addEventListener(
    "click",
    event => {

        event.preventDefault();

        forgotModal.classList.add(
            "show"
        );

        document.body.classList.add(
            "modal-open"
        );

        resetEmail.focus();

    }
);


function closeForgotModal() {

    forgotModal.classList.remove(
        "show"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


modalClose.addEventListener(
    "click",
    closeForgotModal
);


forgotModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            forgotModal
        ) {

            closeForgotModal();

        }

    }
);


/* =========================================================
   RESET PASSWORD
========================================================= */

forgotForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const email =
            resetEmail.value.trim();


        if (
            !email ||
            !isValidEmail(email)
        ) {

            showToast(
                "Invalid Email",
                "Please enter a valid email address."
            );

            return;

        }


        closeForgotModal();


        showToast(
            "Reset Request Sent",
            "Password reset functionality will be connected to the backend."
        );


        resetEmail.value = "";

    }
);


/* =========================================================
   GOOGLE LOGIN
========================================================= */

googleLogin.addEventListener(
    "click",
    () => {

        showToast(
            "Google Login",
            "Google authentication will be connected later."
        );

    }
);


/* =========================================================
   TOAST
========================================================= */

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


let toastTimer;


function showToast(
    title,
    message
) {

    toastTitle.textContent =
        title;

    toastMessage.textContent =
        message;


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
            3000
        );

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeForgotModal();

        }

    }
);


/* =========================================================
   INPUT CLEANUP
========================================================= */

emailInput.addEventListener(
    "input",
    () => {

        emailInput
            .closest(".input-wrapper")
            .classList.remove("error");

        document.getElementById(
            "emailError"
        ).textContent = "";

    }
);


passwordInput.addEventListener(
    "input",
    () => {

        passwordInput
            .closest(".input-wrapper")
            .classList.remove("error");

        document.getElementById(
            "passwordError"
        ).textContent = "";

    }
);


/* =========================================================
   INIT
========================================================= */

console.log(
    "RoomNest Login Page loaded."
);