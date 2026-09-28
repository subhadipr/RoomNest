/* =========================================================
   ROOMNEST — SHARED LOADER
   File: frontend/shared/loader/loader.js
========================================================= */

(function () {

    "use strict";


    let overlay = null;


    /* =====================================================
       CREATE OVERLAY
    ===================================================== */

    function createOverlay(
        text = "Loading..."
    ) {

        if (overlay) {
            updateText(text);
            return overlay;
        }


        overlay =
            document.createElement("div");

        overlay.id =
            "rnLoaderOverlay";

        overlay.className =
            "rn-loader-overlay rn-loader-hidden";


        const box =
            document.createElement("div");

        box.className =
            "rn-loader-box";


        const spinner =
            document.createElement("div");

        spinner.className =
            "rn-loader-spinner";


        const textElement =
            document.createElement("p");

        textElement.className =
            "rn-loader-text";

        textElement.id =
            "rnLoaderText";

        textElement.textContent =
            text;


        box.appendChild(
            spinner
        );

        box.appendChild(
            textElement
        );

        overlay.appendChild(
            box
        );

        document.body.appendChild(
            overlay
        );


        return overlay;
    }


    /* =====================================================
       SHOW
    ===================================================== */

    function show(
        text = "Loading..."
    ) {

        const loader =
            createOverlay(text);

        updateText(text);

        loader.classList.remove(
            "rn-loader-hidden"
        );

        document.body.style.overflow =
            "hidden";

        return loader;
    }


    /* =====================================================
       HIDE
    ===================================================== */

    function hide() {

        if (!overlay) {
            return;
        }

        overlay.classList.add(
            "rn-loader-hidden"
        );

        document.body.style.overflow =
            "";
    }


    /* =====================================================
       UPDATE TEXT
    ===================================================== */

    function updateText(
        text = "Loading..."
    ) {

        const textElement =
            document.getElementById(
                "rnLoaderText"
            );

        if (textElement) {
            textElement.textContent =
                text;
        }
    }


    /* =====================================================
       REMOVE
    ===================================================== */

    function destroy() {

        if (!overlay) {
            return;
        }

        overlay.remove();

        overlay = null;

        document.body.style.overflow =
            "";
    }


    /* =====================================================
       BUTTON LOADING
    ===================================================== */

    function buttonStart(
        button,
        text = null
    ) {

        if (!button) {
            return;
        }


        if (
            button.dataset.rnLoading ===
            "true"
        ) {
            return;
        }


        button.dataset.rnLoading =
            "true";


        button.dataset.originalText =
            button.innerHTML;


        if (
            button.disabled !==
            undefined
        ) {
            button.disabled =
                true;
        }


        button.classList.add(
            "rn-btn-loading"
        );


        if (text) {

            button.innerHTML =
                `<span class="rn-btn-content">${text}</span>`;

        } else {

            button.innerHTML =
                `<span class="rn-btn-content">${button.innerHTML}</span>`;
        }
    }


    function buttonStop(
        button
    ) {

        if (!button) {
            return;
        }


        const originalText =
            button.dataset
                .originalText;


        if (originalText) {

            button.innerHTML =
                originalText;
        }


        button.classList.remove(
            "rn-btn-loading"
        );


        button.dataset
            .rnLoading = "false";


        if (
            button.disabled !==
            undefined
        ) {
            button.disabled =
                false;
        }


        delete button.dataset
            .originalText;
    }


    /* =====================================================
       INLINE LOADER
    ===================================================== */

    function inline(
        container,
        text = "Loading..."
    ) {

        if (!container) {
            return null;
        }


        const wrapper =
            document.createElement("span");

        wrapper.className =
            "rn-loader-inline";


        const spinner =
            document.createElement("span");

        spinner.className =
            "rn-loader-spinner";


        const label =
            document.createElement("span");

        label.textContent =
            text;


        wrapper.appendChild(
            spinner
        );

        wrapper.appendChild(
            label
        );


        container.appendChild(
            wrapper
        );


        return wrapper;
    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.RoomNestLoader = {

        show,
        hide,
        updateText,
        destroy,

        buttonStart,
        buttonStop,

        inline

    };

})();