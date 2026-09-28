/* =========================================================
   ROOMNEST — SHARED MODAL
   File: modal.js
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       01. MODAL MANAGER
    ===================================================== */

    const Modal = {

        current: null,


        /* =================================================
           OPEN
        ================================================= */

        open: function (options = {}) {

            this.close(false);


            const {

                title = "RoomNest",

                subtitle = "",

                content = "",

                size = "md",

                showClose = true,

                closeOnOverlay = true,

                closeOnEscape = true,

                footer = "",

                onOpen = null,

                onClose = null

            } = options;


            /* =============================================
               Overlay
            ============================================= */

            const overlay =
                document.createElement("div");


            overlay.className =
                "rn-modal-overlay";


            overlay.id =
                "rnSharedModal";


            /* =============================================
               Modal
            ============================================= */

            const modal =
                document.createElement("div");


            modal.className =
                `rn-modal rn-modal-${size}`;


            modal.setAttribute(
                "role",
                "dialog"
            );


            modal.setAttribute(
                "aria-modal",
                "true"
            );


            /* =============================================
               Header
            ============================================= */

            const header =
                document.createElement("div");


            header.className =
                "rn-modal-header";


            const titleWrap =
                document.createElement("div");


            titleWrap.className =
                "rn-modal-title-wrap";


            const titleElement =
                document.createElement("h2");


            titleElement.className =
                "rn-modal-title";


            titleElement.textContent =
                title;


            titleWrap.appendChild(
                titleElement
            );


            if (subtitle) {

                const subtitleElement =
                    document.createElement("p");


                subtitleElement.className =
                    "rn-modal-subtitle";


                subtitleElement.textContent =
                    subtitle;


                titleWrap.appendChild(
                    subtitleElement
                );

            }


            header.appendChild(
                titleWrap
            );


            /* =============================================
               Close Button
            ============================================= */

            if (showClose) {

                const closeButton =
                    document.createElement("button");


                closeButton.type =
                    "button";


                closeButton.className =
                    "rn-modal-close";


                closeButton.setAttribute(
                    "aria-label",
                    "Close modal"
                );


                closeButton.innerHTML =
                    "&times;";


                closeButton.addEventListener(
                    "click",
                    () => this.close()
                );


                header.appendChild(
                    closeButton
                );

            }


            /* =============================================
               Body
            ============================================= */

            const body =
                document.createElement("div");


            body.className =
                "rn-modal-body";


            if (
                content instanceof Node
            ) {

                body.appendChild(
                    content
                );

            } else {

                body.innerHTML =
                    content;

            }


            /* =============================================
               Footer
            ============================================= */

            let footerElement = null;


            if (footer) {

                footerElement =
                    document.createElement("div");


                footerElement.className =
                    "rn-modal-footer";


                if (
                    footer instanceof Node
                ) {

                    footerElement.appendChild(
                        footer
                    );

                } else {

                    footerElement.innerHTML =
                        footer;

                }

            }


            /* =============================================
               Build
            ============================================= */

            modal.appendChild(
                header
            );


            modal.appendChild(
                body
            );


            if (footerElement) {

                modal.appendChild(
                    footerElement
                );

            }


            overlay.appendChild(
                modal
            );


            document.body.appendChild(
                overlay
            );


            /* =============================================
               Overlay Click
            ============================================= */

            if (closeOnOverlay) {

                overlay.addEventListener(
                    "click",
                    function (event) {

                        if (
                            event.target === overlay
                        ) {

                            Modal.close();

                        }

                    }
                );

            }


            /* =============================================
               Escape
            ============================================= */

            let escapeHandler = null;


            if (closeOnEscape) {

                escapeHandler =
                    function (event) {

                        if (
                            event.key === "Escape"
                        ) {

                            Modal.close();

                        }

                    };


                document.addEventListener(
                    "keydown",
                    escapeHandler
                );

            }


            /* =============================================
               Lock Body
            ============================================= */

            document.body.style.overflow =
                "hidden";


            /* =============================================
               Show
            ============================================= */

            requestAnimationFrame(
                function () {

                    overlay.classList.add(
                        "show"
                    );

                }
            );


            /* =============================================
               Store
            ============================================= */

            this.current = {

                overlay,

                modal,

                body,

                escapeHandler,

                onClose

            };


            /* =============================================
               Callback
            ============================================= */

            if (
                typeof onOpen === "function"
            ) {

                onOpen({
                    overlay,
                    modal,
                    body
                });

            }


            return {

                overlay,

                modal,

                body,

                close:
                    () => this.close()

            };

        },


        /* =================================================
           CLOSE
        ================================================= */

        close: function (animate = true) {

            if (!this.current) {
                return;
            }


            const modalData =
                this.current;


            const {

                overlay,

                escapeHandler,

                onClose

            } = modalData;


            if (escapeHandler) {

                document.removeEventListener(
                    "keydown",
                    escapeHandler
                );

            }


            const removeModal =
                function () {

                    if (
                        overlay &&
                        overlay.parentNode
                    ) {

                        overlay.parentNode.removeChild(
                            overlay
                        );

                    }


                    document.body.style.overflow =
                        "";


                    if (
                        typeof onClose ===
                        "function"
                    ) {

                        onClose();

                    }

                };


            if (animate) {

                overlay.classList.remove(
                    "show"
                );


                setTimeout(
                    removeModal,
                    250
                );

            } else {

                removeModal();

            }


            this.current = null;

        },


        /* =================================================
           CONFIRM
        ================================================= */

        confirm: function (options = {}) {

            const {

                title = "Are you sure?",

                message =
                    "This action cannot be undone.",

                icon = "⚠️",

                confirmText = "Confirm",

                cancelText = "Cancel",

                danger = false,

                onConfirm = null,

                onCancel = null

            } = options;


            const footer =
                document.createElement("div");


            const cancelButton =
                document.createElement("button");


            cancelButton.type =
                "button";


            cancelButton.className =
                "rn-modal-btn rn-modal-btn-secondary";


            cancelButton.textContent =
                cancelText;


            const confirmButton =
                document.createElement("button");


            confirmButton.type =
                "button";


            confirmButton.className =
                danger
                    ? "rn-modal-btn rn-modal-btn-danger"
                    : "rn-modal-btn rn-modal-btn-primary";


            confirmButton.textContent =
                confirmText;


            footer.appendChild(
                cancelButton
            );


            footer.appendChild(
                confirmButton
            );


            const content = `

                <div class="rn-confirm-modal">

                    <div class="rn-confirm-icon">
                        ${icon}
                    </div>

                    <h3 class="rn-confirm-title">
                        ${this.escapeHtml(title)}
                    </h3>

                    <p class="rn-confirm-message">
                        ${this.escapeHtml(message)}
                    </p>

                </div>

            `;


            const modal =
                this.open({

                    title: "",

                    content,

                    size: "sm",

                    showClose: true,

                    footer

                });


            cancelButton.addEventListener(
                "click",
                function () {

                    Modal.close();

                    if (
                        typeof onCancel ===
                        "function"
                    ) {

                        onCancel();

                    }

                }
            );


            confirmButton.addEventListener(
                "click",
                function () {

                    Modal.close();

                    if (
                        typeof onConfirm ===
                        "function"
                    ) {

                        onConfirm();

                    }

                }
            );


            return modal;

        },


        /* =================================================
           ALERT
        ================================================= */

        alert: function (options = {}) {

            const {

                title = "RoomNest",

                message = "",

                icon = "✓",

                buttonText = "OK",

                onClose = null

            } = options;


            const footer =
                document.createElement("div");


            const button =
                document.createElement("button");


            button.type =
                "button";


            button.className =
                "rn-modal-btn rn-modal-btn-primary";


            button.textContent =
                buttonText;


            footer.appendChild(
                button
            );


            const content = `

                <div class="rn-confirm-modal">

                    <div class="rn-confirm-icon">
                        ${icon}
                    </div>

                    <h3 class="rn-confirm-title">
                        ${this.escapeHtml(title)}
                    </h3>

                    <p class="rn-confirm-message">
                        ${this.escapeHtml(message)}
                    </p>

                </div>

            `;


            const modal =
                this.open({

                    title: "",

                    content,

                    size: "sm",

                    footer

                });


            button.addEventListener(
                "click",
                function () {

                    Modal.close();

                    if (
                        typeof onClose ===
                        "function"
                    ) {

                        onClose();

                    }

                }
            );


            return modal;

        },


        /* =================================================
           LOADING
        ================================================= */

        loading: function (
            message = "Please wait..."
        ) {

            return this.open({

                title: "Please Wait",

                content: `

                    <div class="rn-modal-loading">

                        <div class="rn-modal-spinner"></div>

                        <span>
                            ${this.escapeHtml(message)}
                        </span>

                    </div>

                `,

                size: "sm",

                showClose: false,

                closeOnOverlay: false,

                closeOnEscape: false

            });

        },


        /* =================================================
           ESCAPE HTML
        ================================================= */

        escapeHtml: function (value) {

            const div =
                document.createElement("div");


            div.textContent =
                value == null
                    ? ""
                    : String(value);


            return div.innerHTML;

        }

    };


    /* =====================================================
       02. GLOBAL API
    ===================================================== */

    window.RoomNestModal =
        Modal;


})();