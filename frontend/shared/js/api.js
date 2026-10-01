/* =========================================================
   ROOMNEST — API SERVICE
   File: frontend/shared/js/api.js
========================================================= */

const RoomNestAPI = (() => {

    // =====================================================
    // BASE URL
    // =====================================================

    const BASE_URL =
        "https://roomnest-bs42.onrender.com/api";


    // =====================================================
    // GET TOKEN
    // =====================================================

    function getToken() {

        return (
            localStorage.getItem(
                "roomnestAuthToken"
            ) ||
            localStorage.getItem(
                "roomnestAdminToken"
            ) ||
            ""
        );

    }


    // =====================================================
    // DEFAULT HEADERS
    // =====================================================

    function getHeaders(
        customHeaders = {}
    ) {

        const headers = {
            ...customHeaders
        };

        const token = getToken();

        if (token) {

            headers.Authorization =
                `Bearer ${token}`;

        }

        return headers;
    }


    // =====================================================
    // REQUEST HANDLER
    // =====================================================

    async function request(
        endpoint,
        options = {}
    ) {

        const {
            method = "GET",
            body,
            headers = {}
        } = options;

        const config = {

            method,

            headers: getHeaders({
                ...headers
            })

        };


        // -------------------------------------------------
        // JSON BODY
        // -------------------------------------------------

        if (
            body !== undefined &&
            !(body instanceof FormData)
        ) {

            config.headers[
                "Content-Type"
            ] = "application/json";

            config.body =
                JSON.stringify(body);

        }


        // -------------------------------------------------
        // FORM DATA
        // -------------------------------------------------

        if (
            body instanceof FormData
        ) {

            config.body = body;

            // Browser নিজে Content-Type
            // + boundary set করবে

            delete config.headers[
                "Content-Type"
            ];

        }


        // -------------------------------------------------
        // FETCH
        // -------------------------------------------------

        let response;

        try {

            response =
                await fetch(
                    `${BASE_URL}${endpoint}`,
                    config
                );

        } catch (error) {

            throw new Error(
                "Unable to connect to RoomNest server."
            );

        }


        // -------------------------------------------------
        // RESPONSE
        // -------------------------------------------------

        let data;

        try {

            data =
                await response.json();

        } catch (error) {

            data = {

                success:
                    response.ok,

                message:
                    response.ok
                        ? "Request successful."
                        : "Server returned an invalid response."

            };

        }


        // -------------------------------------------------
        // ERROR
        // -------------------------------------------------

        if (!response.ok) {

            const error =
                new Error(
                    data.message ||
                    "Something went wrong."
                );

            error.status =
                response.status;

            error.data =
                data;

            throw error;
        }


        return data;
    }


    // =====================================================
    // GET
    // =====================================================

    async function get(
        endpoint
    ) {

        return request(
            endpoint,
            {
                method: "GET"
            }
        );

    }


    // =====================================================
    // POST
    // =====================================================

    async function post(
        endpoint,
        body = {}
    ) {

        return request(
            endpoint,
            {
                method: "POST",
                body
            }
        );

    }


    // =====================================================
    // PUT
    // =====================================================

    async function put(
        endpoint,
        body = {}
    ) {

        return request(
            endpoint,
            {
                method: "PUT",
                body
            }
        );

    }


    // =====================================================
    // PATCH
    // =====================================================

    async function patch(
        endpoint,
        body = {}
    ) {

        return request(
            endpoint,
            {
                method: "PATCH",
                body
            }
        );

    }


    // =====================================================
    // DELETE
    // =====================================================

    async function remove(
        endpoint
    ) {

        return request(
            endpoint,
            {
                method: "DELETE"
            }
        );

    }


    // =====================================================
    // UPLOAD
    // =====================================================

    async function upload(
        endpoint,
        formData,
        method = "POST"
    ) {

        return request(
            endpoint,
            {
                method,
                body: formData
            }
        );

    }


    // =====================================================
    // HEALTH CHECK
    // =====================================================

    async function healthCheck() {

        return request(
            "/health",
            {
                method: "GET"
            }
        );

    }


    // =====================================================
    // AUTH API
    // =====================================================

    async function register(
        userData
    ) {

        return post(
            "/auth/register",
            userData
        );

    }


    async function login(
        credentials
    ) {

        return post(
            "/auth/login",
            credentials
        );

    }


    async function getMe() {

        return get(
            "/auth/me"
        );

    }


    async function logout() {

        try {

            await post(
                "/auth/logout"
            );

        } catch (error) {

            console.warn(
                "Logout API error:",
                error.message
            );

        }


        localStorage.removeItem(
            "roomnestAuthToken"
        );

        localStorage.removeItem(
            "roomnestAdminToken"
        );

        localStorage.removeItem(
            "roomnestUser"
        );

    }


    // =====================================================
    // PUBLIC API
    // =====================================================

    return {

        BASE_URL,

        request,

        get,
        post,
        put,
        patch,
        delete: remove,

        upload,

        healthCheck,

        register,
        login,
        getMe,
        logout

    };

})();


// =========================================================
// GLOBAL
// =========================================================

window.RoomNestAPI =
    RoomNestAPI;