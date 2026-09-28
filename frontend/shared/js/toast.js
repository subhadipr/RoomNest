/* =========================================================
   ROOMNEST — SHARED TOAST
   File: frontend/shared/toast/toast.js
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIG
    ===================================================== */

    const DEFAULT_DURATION = 3500;

    let container = null;


    /* =====================================================
       CREATE CONTAINER
    ===================================================== */

    function createContainer() {

        if (container) {
            return container;
        }

        container =
            document.createElement("div");

        container.id =
            "rnToastContainer";

        container.className =
            "rn-toast-container";

        container.setAttribute(
            "aria-live",
            "polite"
        );

        container.setAttribute(
            "aria-atomic",
            "true"
        );

        document.body.appendChild(
            container
        );

        return container;
    }


    /* =====================================================
       ICONS
    ===================================================== */

    function getIcon(type) {

        const icons = {
            success: "✓",
            error: "!",
            warning: "⚠",
            info: "i"
        };

        return (
            icons[type] ||
            icons.info
        );
    }


    /* =====================================================
       SHOW
    ===================================================== */

    function show(
        message,
        options = {}
    ) {

        const {
            type = "info",
            title = "",
            duration = DEFAULT_DURATION,
            closable = true
        } = options;


        const toastContainer =
            createContainer();


        const toast =
            document.createElement("div");

        toast.className =
            `rn-toast rn-toast-${type}`;


        /* Icon */

        const icon =
            document.createElement("div");

        icon.className =
            "rn-toast-icon";

        icon.textContent =
            getIcon(type);


        /* Content */

        const content =
            document.createElement("div");

        content.className =
            "rn-toast-content";


        if (title) {

            const titleElement =
                document.createElement("p");

            titleElement.className =
                "rn-toast-title";

            titleElement.textContent =
                title;

            content.appendChild(
                titleElement
            );
        }


        const messageElement =
            document.createElement("p");

        messageElement.className =
            "rn-toast-message";

        messageElement.textContent =
            message;

        content.appendChild(
            messageElement
        );


        /* Close */

        if (closable) {

            const close =
                document.createElement("button");

            close.type = "button";

            close.className =
                "rn-toast-close";

            close.innerHTML = "&times;";

            close.setAttribute(
                "aria-label",
                "Close notification"
            );

            close.addEventListener(
                "click",
                function () {
                    remove(toast);
                }
            );

            toast.appendChild(close);
        }


        /* Progress */

        if (
            duration &&
            duration > 0
        ) {

            const progress =
                document.createElement("div");

            progress.className =
                "rn-toast-progress";

            progress.style.animation =
                `rnToastProgress ${duration}ms linear forwards`;

            toast.appendChild(
                progress
            );
        }


        toast.insertBefore(
            icon,
            toast.firstChild
        );

        toast.insertBefore(
            content,
            toast.children[1]
        );


        toastContainer.appendChild(
            toast
        );


        /* Auto remove */

        let timeoutId = null;

        if (
            duration &&
            duration > 0
        ) {

            timeoutId =
                setTimeout(
                    function () {
                        remove(toast);
                    },
                    duration
                );
        }


        toast._rnToastTimeout =
            timeoutId;


        return toast;
    }


    /* =====================================================
       REMOVE
    ===================================================== */

    function remove(toast) {

        if (!toast) {
            return;
        }


        if (
            toast._rnToastTimeout
        ) {
            clearTimeout(
                toast._rnToastTimeout
            );
        }


        toast.classList.add(
            "rn-toast-removing"
        );


        setTimeout(
            function () {

                if (
                    toast.parentNode
                ) {
                    toast.parentNode.removeChild(
                        toast
                    );
                }

            },
            250
        );
    }


    /* =====================================================
       SHORTCUTS
    ===================================================== */

    function success(
        message,
        title = "Success"
    ) {

        return show(
            message,
            {
                type: "success",
                title
            }
        );
    }


    function error(
        message,
        title = "Error"
    ) {

        return show(
            message,
            {
                type: "error",
                title
            }
        );
    }


    function warning(
        message,
        title = "Warning"
    ) {

        return show(
            message,
            {
                type: "warning",
                title
            }
        );
    }


    function info(
        message,
        title = "Information"
    ) {

        return show(
            message,
            {
                type: "info",
                title
            }
        );
    }


    /* =====================================================
       CLEAR ALL
    ===================================================== */

    function clearAll() {

        if (!container) {
            return;
        }

        const toasts =
            container.querySelectorAll(
                ".rn-toast"
            );

        toasts.forEach(
            toast => remove(toast)
        );
    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.RoomNestToast = {

        show,
        success,
        error,
        warning,
        info,
        remove,
        clearAll

    };

})();