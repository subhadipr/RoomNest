/* =========================================================
   ROOMNEST — SHARED UTILITIES
   File: utils.js
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       01. DOM HELPERS
    ===================================================== */

    function $(selector, parent = document) {

        return parent.querySelector(selector);

    }


    function $$(selector, parent = document) {

        return Array.from(
            parent.querySelectorAll(selector)
        );

    }


    function getById(id) {

        return document.getElementById(id);

    }


    function createElement(
        tag,
        className = "",
        html = ""
    ) {

        const element =
            document.createElement(tag);


        if (className) {

            element.className =
                className;

        }


        if (html) {

            element.innerHTML =
                html;

        }


        return element;

    }


    /* =====================================================
       02. CLASS HELPERS
    ===================================================== */

    function addClass(
        element,
        className
    ) {

        if (!element) {
            return;
        }


        element.classList.add(
            className
        );

    }


    function removeClass(
        element,
        className
    ) {

        if (!element) {
            return;
        }


        element.classList.remove(
            className
        );

    }


    function toggleClass(
        element,
        className,
        force
    ) {

        if (!element) {
            return;
        }


        return element.classList.toggle(
            className,
            force
        );

    }


    function hasClass(
        element,
        className
    ) {

        if (!element) {
            return false;
        }


        return element.classList.contains(
            className
        );

    }


    /* =====================================================
       03. LOCAL STORAGE
    ===================================================== */

    function setStorage(
        key,
        value
    ) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;

        } catch (error) {

            console.error(
                "RoomNest Storage Set Error:",
                error
            );

            return false;

        }

    }


    function getStorage(
        key,
        defaultValue = null
    ) {

        try {

            const value =
                localStorage.getItem(key);


            if (value === null) {

                return defaultValue;

            }


            return JSON.parse(value);

        } catch (error) {

            console.error(
                "RoomNest Storage Get Error:",
                error
            );

            return defaultValue;

        }

    }


    function removeStorage(key) {

        try {

            localStorage.removeItem(key);

            return true;

        } catch (error) {

            console.error(
                "RoomNest Storage Remove Error:",
                error
            );

            return false;

        }

    }


    function clearStorage() {

        try {

            localStorage.clear();

            return true;

        } catch (error) {

            console.error(
                "RoomNest Storage Clear Error:",
                error
            );

            return false;

        }

    }


    /* =====================================================
       04. SESSION STORAGE
    ===================================================== */

    function setSession(
        key,
        value
    ) {

        try {

            sessionStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;

        } catch (error) {

            console.error(
                "RoomNest Session Set Error:",
                error
            );

            return false;

        }

    }


    function getSession(
        key,
        defaultValue = null
    ) {

        try {

            const value =
                sessionStorage.getItem(key);


            if (value === null) {

                return defaultValue;

            }


            return JSON.parse(value);

        } catch (error) {

            return defaultValue;

        }

    }


    function removeSession(key) {

        try {

            sessionStorage.removeItem(key);

            return true;

        } catch (error) {

            return false;

        }

    }


    /* =====================================================
       05. URL HELPERS
    ===================================================== */

    function getQueryParam(
        name
    ) {

        const params =
            new URLSearchParams(
                window.location.search
            );


        return params.get(name);

    }


    function getQueryParams() {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const result = {};


        params.forEach(
            (value, key) => {

                result[key] =
                    value;

            }
        );


        return result;

    }


    function setQueryParam(
        name,
        value
    ) {

        const url =
            new URL(
                window.location.href
            );


        url.searchParams.set(
            name,
            value
        );


        window.history.replaceState(
            {},
            "",
            url
        );

    }


    function removeQueryParam(
        name
    ) {

        const url =
            new URL(
                window.location.href
            );


        url.searchParams.delete(
            name
        );


        window.history.replaceState(
            {},
            "",
            url
        );

    }


    /* =====================================================
       06. STRING HELPERS
    ===================================================== */

    function capitalize(value) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }


        const text =
            String(value);


        return text.charAt(0).toUpperCase() +
            text.slice(1);

    }


    function titleCase(value) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }


        return String(value)
            .toLowerCase()
            .split(" ")
            .filter(Boolean)
            .map(word => {

                return word.charAt(0).toUpperCase() +
                    word.slice(1);

            })
            .join(" ");

    }


    function truncate(
        value,
        maxLength = 100
    ) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }


        const text =
            String(value);


        if (
            text.length <= maxLength
        ) {

            return text;

        }


        return text.slice(
            0,
            maxLength
        ).trim() + "...";

    }


    function slugify(value) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }


        return String(value)
            .toLowerCase()
            .trim()
            .replace(
                /[^a-z0-9\s-]/g,
                ""
            )
            .replace(
                /\s+/g,
                "-"
            )
            .replace(
                /-+/g,
                "-"
            );

    }


    /* =====================================================
       07. NUMBER HELPERS
    ===================================================== */

    function formatNumber(
        value
    ) {

        const number =
            Number(value);


        if (Number.isNaN(number)) {

            return "0";

        }


        return new Intl.NumberFormat(
            "en-IN"
        ).format(number);

    }


    function formatCurrency(
        value,
        currency = "INR"
    ) {

        const number =
            Number(value);


        if (Number.isNaN(number)) {

            return "₹0";

        }


        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency,
                maximumFractionDigits: 0
            }
        ).format(number);

    }


    /* =====================================================
       08. DATE HELPERS
    ===================================================== */

    function formatDate(
        date,
        options = {}
    ) {

        if (!date) {

            return "";

        }


        const parsedDate =
            new Date(date);


        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {

            return "";

        }


        const defaultOptions = {

            day: "2-digit",

            month: "short",

            year: "numeric"

        };


        return new Intl.DateTimeFormat(
            "en-IN",
            {
                ...defaultOptions,
                ...options
            }
        ).format(parsedDate);

    }


    function formatDateTime(
        date
    ) {

        if (!date) {

            return "";

        }


        const parsedDate =
            new Date(date);


        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {

            return "";

        }


        return new Intl.DateTimeFormat(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        ).format(parsedDate);

    }


    function timeAgo(
        date
    ) {

        const parsedDate =
            new Date(date);


        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {

            return "";

        }


        const now =
            new Date();


        const seconds =
            Math.floor(
                (
                    now.getTime() -
                    parsedDate.getTime()
                ) / 1000
            );


        if (seconds < 60) {

            return "Just now";

        }


        const minutes =
            Math.floor(
                seconds / 60
            );


        if (minutes < 60) {

            return `${minutes} min ago`;

        }


        const hours =
            Math.floor(
                minutes / 60
            );


        if (hours < 24) {

            return `${hours} hr ago`;

        }


        const days =
            Math.floor(
                hours / 24
            );


        if (days < 7) {

            return `${days} day${days > 1 ? "s" : ""} ago`;

        }


        return formatDate(date);

    }


    /* =====================================================
       09. VALIDATION
    ===================================================== */

    function isValidEmail(
        email
    ) {

        if (!email) {
            return false;
        }


        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(
                String(email).trim()
            );

    }


    function isValidPhone(
        phone
    ) {

        if (!phone) {
            return false;
        }


        const cleaned =
            String(phone)
                .replace(/\s+/g, "")
                .replace(/-/g, "");


        return /^(?:\+91|91)?[6-9]\d{9}$/
            .test(cleaned);

    }


    function isStrongPassword(
        password
    ) {

        if (!password) {
            return false;
        }


        return (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /\d/.test(password)
        );

    }


    function isRequired(
        value
    ) {

        return (
            value !== null &&
            value !== undefined &&
            String(value).trim() !== ""
        );

    }


    /* =====================================================
       10. DEBOUNCE
    ===================================================== */

    function debounce(
        callback,
        delay = 300
    ) {

        let timer;


        return function (...args) {

            clearTimeout(timer);


            timer =
                setTimeout(
                    () => {

                        callback.apply(
                            this,
                            args
                        );

                    },
                    delay
                );

        };

    }


    /* =====================================================
       11. THROTTLE
    ===================================================== */

    function throttle(
        callback,
        delay = 200
    ) {

        let waiting = false;


        return function (...args) {

            if (waiting) {
                return;
            }


            callback.apply(
                this,
                args
            );


            waiting = true;


            setTimeout(
                () => {

                    waiting = false;

                },
                delay
            );

        };

    }


    /* =====================================================
       12. ID GENERATOR
    ===================================================== */

    function generateId(
        prefix = "RN"
    ) {

        const timestamp =
            Date.now()
                .toString(36);


        const random =
            Math.random()
                .toString(36)
                .substring(2, 8);


        return (
            `${prefix}-${timestamp}-${random}`
        ).toUpperCase();

    }


    /* =====================================================
       13. COPY TO CLIPBOARD
    ===================================================== */

    async function copyToClipboard(
        text
    ) {

        if (!text) {
            return false;
        }


        try {

            await navigator.clipboard.writeText(
                String(text)
            );


            return true;

        } catch (error) {

            /*
                Fallback for older browsers.
            */

            try {

                const textarea =
                    document.createElement(
                        "textarea"
                    );


                textarea.value =
                    String(text);


                textarea.style.position =
                    "fixed";

                textarea.style.opacity =
                    "0";


                document.body.appendChild(
                    textarea
                );


                textarea.select();


                const success =
                    document.execCommand(
                        "copy"
                    );


                textarea.remove();


                return success;

            } catch (fallbackError) {

                return false;

            }

        }

    }


    /* =====================================================
       14. SCROLL
    ===================================================== */

    function scrollToTop(
        behavior = "smooth"
    ) {

        window.scrollTo({

            top: 0,

            behavior

        });

    }


    function scrollToElement(
        element,
        offset = 0
    ) {

        if (!element) {
            return;
        }


        const top =
            element.getBoundingClientRect().top +
            window.pageYOffset -
            offset;


        window.scrollTo({

            top,

            behavior: "smooth"

        });

    }


    /* =====================================================
       15. SAFE JSON
    ===================================================== */

    function parseJSON(
        value,
        fallback = null
    ) {

        try {

            return JSON.parse(value);

        } catch (error) {

            return fallback;

        }

    }


    function stringifyJSON(
        value,
        fallback = ""
    ) {

        try {

            return JSON.stringify(value);

        } catch (error) {

            return fallback;

        }

    }


    /* =====================================================
       16. ARRAY HELPERS
    ===================================================== */

    function unique(
        array
    ) {

        if (!Array.isArray(array)) {

            return [];

        }


        return [
            ...new Set(array)
        ];

    }


    function sortBy(
        array,
        key,
        direction = "asc"
    ) {

        if (!Array.isArray(array)) {

            return [];

        }


        return [...array].sort(
            (a, b) => {

                const valueA =
                    a?.[key];

                const valueB =
                    b?.[key];


                if (
                    valueA === valueB
                ) {

                    return 0;

                }


                const result =
                    valueA > valueB
                        ? 1
                        : -1;


                return direction === "desc"
                    ? -result
                    : result;

            }
        );

    }


    /* =====================================================
       17. FILE HELPERS
    ===================================================== */

    function isImageFile(
        file
    ) {

        if (!file) {
            return false;
        }


        return [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/svg+xml"
        ].includes(
            file.type
        );

    }


    function formatFileSize(
        bytes
    ) {

        const size =
            Number(bytes);


        if (
            !size ||
            size <= 0
        ) {

            return "0 B";

        }


        const units = [
            "B",
            "KB",
            "MB",
            "GB"
        ];


        const index =
            Math.floor(
                Math.log(size) /
                Math.log(1024)
            );


        return (
            `${(
                size /
                Math.pow(
                    1024,
                    index
                )
            ).toFixed(1)} ${units[index]}`
        );

    }


    /* =====================================================
       18. DEVICE
    ===================================================== */

    function isMobile() {

        return window.innerWidth <= 768;

    }


    function isTablet() {

        return (
            window.innerWidth > 768 &&
            window.innerWidth <= 1024
        );

    }


    function isDesktop() {

        return window.innerWidth > 1024;

    }


    /* =====================================================
       19. HTML ESCAPE
    ===================================================== */

    function escapeHtml(
        value
    ) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }


        const element =
            document.createElement(
                "div"
            );


        element.textContent =
            String(value);


        return element.innerHTML;

    }


    /* =====================================================
       20. RANDOM
    ===================================================== */

    function randomNumber(
        min,
        max
    ) {

        return Math.floor(
            Math.random() *
            (max - min + 1)
        ) + min;

    }


    function randomItem(
        array
    ) {

        if (
            !Array.isArray(array) ||
            array.length === 0
        ) {

            return null;

        }


        return array[
            Math.floor(
                Math.random() *
                array.length
            )
        ];

    }


    /* =====================================================
       21. PUBLIC API
    ===================================================== */

    window.RoomNestUtils = {

        /* DOM */
        $,
        $$,
        getById,
        createElement,

        /* Class */
        addClass,
        removeClass,
        toggleClass,
        hasClass,

        /* Local Storage */
        setStorage,
        getStorage,
        removeStorage,
        clearStorage,

        /* Session */
        setSession,
        getSession,
        removeSession,

        /* URL */
        getQueryParam,
        getQueryParams,
        setQueryParam,
        removeQueryParam,

        /* String */
        capitalize,
        titleCase,
        truncate,
        slugify,

        /* Number */
        formatNumber,
        formatCurrency,

        /* Date */
        formatDate,
        formatDateTime,
        timeAgo,

        /* Validation */
        isValidEmail,
        isValidPhone,
        isStrongPassword,
        isRequired,

        /* Performance */
        debounce,
        throttle,

        /* ID */
        generateId,

        /* Clipboard */
        copyToClipboard,

        /* Scroll */
        scrollToTop,
        scrollToElement,

        /* JSON */
        parseJSON,
        stringifyJSON,

        /* Array */
        unique,
        sortBy,

        /* File */
        isImageFile,
        formatFileSize,

        /* Device */
        isMobile,
        isTablet,
        isDesktop,

        /* Security */
        escapeHtml,

        /* Random */
        randomNumber,
        randomItem

    };


})();