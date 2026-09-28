/* =========================================================
   ROOMNEST — SHARED AUTHENTICATION
   File: frontend/shared/js/auth.js

   Purpose:
   - Login state management
   - Current user management
   - Role checking
   - Dashboard routing
   - Protected page support
   - Logout
   - Demo LocalStorage authentication

   Demo Storage:
   roomnestUser
   roomnestAuthToken
   roomnestAdminToken

   NOTE:
   This is frontend/demo authentication.
   Real authentication + JWT verification will be connected
   with the backend later.
========================================================= */

(function () {
    "use strict";

    /* =====================================================
       01. CONFIG
    ===================================================== */

    const STORAGE_KEYS = {
        USER: "roomnestUser",
        AUTH_TOKEN: "roomnestAuthToken",
        ADMIN_TOKEN: "roomnestAdminToken"
    };

    const VALID_ROLES = [
        "student",
        "owner",
        "admin"
    ];


    /* =====================================================
       02. SAFE STORAGE
    ===================================================== */

    function getStorageItem(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error("RoomNest Auth Storage Error:", error);
            return null;
        }
    }


    function setStorageItem(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.error("RoomNest Auth Storage Error:", error);
            return false;
        }
    }


    function removeStorageItem(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error("RoomNest Auth Storage Error:", error);
            return false;
        }
    }


    /* =====================================================
       03. USER
    ===================================================== */

    function getUser() {
        const userData = getStorageItem(STORAGE_KEYS.USER);

        if (!userData) {
            return null;
        }

        try {
            return JSON.parse(userData);
        } catch (error) {
            console.error("Invalid RoomNest user data.");

            removeStorageItem(STORAGE_KEYS.USER);

            return null;
        }
    }


    function setUser(user) {
        if (!user || typeof user !== "object") {
            return false;
        }

        /*
           Never save password through this shared auth module.
        */

        const safeUser = { ...user };

        delete safeUser.password;
        delete safeUser.confirmPassword;

        const saved = setStorageItem(
            STORAGE_KEYS.USER,
            JSON.stringify(safeUser)
        );

        if (saved) {
            dispatchAuthChange();
        }

        return saved;
    }


    function clearUser() {
        removeStorageItem(STORAGE_KEYS.USER);
        dispatchAuthChange();
    }


    /* =====================================================
       04. TOKEN
    ===================================================== */

    function getToken() {
        return getStorageItem(STORAGE_KEYS.AUTH_TOKEN);
    }


    function setToken(token) {
        if (!token) {
            return false;
        }

        return setStorageItem(
            STORAGE_KEYS.AUTH_TOKEN,
            token
        );
    }


    function clearToken() {
        removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);
        removeStorageItem(STORAGE_KEYS.ADMIN_TOKEN);
    }


    /* =====================================================
       05. LOGIN STATE
    ===================================================== */

    function isLoggedIn() {
        const user = getUser();

        return !!user;
    }


    function getRole() {
        const user = getUser();

        if (!user || !user.role) {
            return null;
        }

        return String(user.role).toLowerCase();
    }


    function login(user, token = null) {
        if (!user || typeof user !== "object") {
            return {
                success: false,
                message: "Invalid user information."
            };
        }

        const role = String(user.role || "").toLowerCase();

        if (!VALID_ROLES.includes(role)) {
            return {
                success: false,
                message: "Invalid RoomNest user role."
            };
        }

        const safeUser = {
            ...user,
            role: role,
            loginAt: user.loginAt || new Date().toISOString()
        };

        const userSaved = setUser(safeUser);

        if (!userSaved) {
            return {
                success: false,
                message: "Unable to save login session."
            };
        }

        if (token) {
            setToken(token);
        }

        return {
            success: true,
            user: getUser(),
            role: role
        };
    }


    /* =====================================================
       06. ROLE CHECK
    ===================================================== */

    function hasRole(role) {
        const currentRole = getRole();

        if (!currentRole || !role) {
            return false;
        }

        return currentRole === String(role).toLowerCase();
    }


    function hasAnyRole(roles) {
        if (!Array.isArray(roles)) {
            return false;
        }

        const currentRole = getRole();

        if (!currentRole) {
            return false;
        }

        return roles.some(function (role) {
            return currentRole === String(role).toLowerCase();
        });
    }


    function isStudent() {
        return hasRole("student");
    }


    function isOwner() {
        return hasRole("owner");
    }


    function isAdmin() {
        return hasRole("admin");
    }


    /* =====================================================
       07. FRONTEND ROOT
    ===================================================== */

    function getFrontendRoot() {
        /*
           All current RoomNest frontend pages are located
           two levels below /frontend/.

           Example:

           frontend/public/home/index.html
           ../../ => frontend/

           frontend/student/dashboard/dashboard.html
           ../../ => frontend/

           frontend/owner/dashboard/dashboard.html
           ../../ => frontend/
        */

        if (
            document.body &&
            document.body.dataset &&
            document.body.dataset.frontendRoot
        ) {
            return document.body.dataset.frontendRoot;
        }

        return "../../";
    }


    /* =====================================================
       08. DASHBOARD PATHS
    ===================================================== */

    function getDashboardPath(role) {
        const frontendRoot = getFrontendRoot();

        const normalizedRole = String(
            role || getRole() || ""
        ).toLowerCase();

        const dashboardPaths = {
            student:
                `${frontendRoot}student/dashboard/dashboard.html`,

            owner:
                `${frontendRoot}owner/dashboard/dashboard.html`,

            admin:
                `${frontendRoot}admin/dashboard/dashboard.html`
        };

        return dashboardPaths[normalizedRole] || null;
    }


    function getProfilePath(role) {
        const frontendRoot = getFrontendRoot();

        const normalizedRole = String(
            role || getRole() || ""
        ).toLowerCase();

        const profilePaths = {
            student:
                `${frontendRoot}student/profile/profile.html`,

            owner:
                `${frontendRoot}owner/profile/profile.html`,

            admin:
                `${frontendRoot}admin/settings/settings.html`
        };

        return profilePaths[normalizedRole] || null;
    }


    function getLoginPath() {
        const frontendRoot = getFrontendRoot();

        return `${frontendRoot}public/auth/login.html`;
    }


    /* =====================================================
       09. REDIRECT
    ===================================================== */

    function redirectToDashboard(role = null) {
        const dashboardPath = getDashboardPath(
            role || getRole()
        );

        if (!dashboardPath) {
            console.warn(
                "RoomNest Auth: Dashboard path not found."
            );

            return false;
        }

        window.location.href = dashboardPath;

        return true;
    }


    function redirectToLogin() {
        const loginPath = getLoginPath();

        window.location.href = loginPath;

        return true;
    }


    /* =====================================================
       10. LOGOUT
    ===================================================== */

    function logout(options = {}) {
        const {
            redirect = true,
            redirectUrl = null
        } = options;

        clearUser();
        clearToken();

        if (redirect) {
            if (redirectUrl) {
                window.location.href = redirectUrl;
            } else {
                redirectToLogin();
            }
        }

        return true;
    }


    /* =====================================================
       11. PROTECTED PAGE
    ===================================================== */

    function requireAuth(options = {}) {
        const {
            redirect = true
        } = options;

        if (isLoggedIn()) {
            return true;
        }

        if (redirect) {
            redirectToLogin();
        }

        return false;
    }


    /* =====================================================
       12. ROLE PROTECTION
    ===================================================== */

    function requireRole(requiredRoles, options = {}) {
        const {
            redirect = true
        } = options;

        /*
           First check authentication.
        */

        if (!isLoggedIn()) {
            if (redirect) {
                redirectToLogin();
            }

            return false;
        }

        const roles = Array.isArray(requiredRoles)
            ? requiredRoles
            : [requiredRoles];

        if (hasAnyRole(roles)) {
            return true;
        }

        /*
           Logged in but wrong role.
           Send user to their own dashboard.
        */

        if (redirect) {
            redirectToDashboard();
        }

        return false;
    }


    /* =====================================================
       13. RETURN URL
    ===================================================== */

    function getCurrentUrl() {
        return window.location.href;
    }


    function saveReturnUrl() {
        try {
            sessionStorage.setItem(
                "roomnestReturnUrl",
                getCurrentUrl()
            );

            return true;
        } catch (error) {
            return false;
        }
    }


    function getReturnUrl() {
        try {
            return sessionStorage.getItem(
                "roomnestReturnUrl"
            );
        } catch (error) {
            return null;
        }
    }


    function clearReturnUrl() {
        try {
            sessionStorage.removeItem(
                "roomnestReturnUrl"
            );
        } catch (error) {
            console.error(error);
        }
    }


    function redirectToReturnUrl(fallback = null) {
        const returnUrl = getReturnUrl();

        if (returnUrl) {
            clearReturnUrl();

            window.location.href = returnUrl;

            return true;
        }

        if (fallback) {
            window.location.href = fallback;

            return true;
        }

        return false;
    }


    /* =====================================================
       14. AUTH CHANGE EVENT
    ===================================================== */

    function dispatchAuthChange() {
        window.dispatchEvent(
            new CustomEvent(
                "roomnest:auth-change",
                {
                    detail: {
                        user: getUser(),
                        loggedIn: isLoggedIn(),
                        role: getRole()
                    }
                }
            )
        );
    }


    /* =====================================================
       15. USER DISPLAY HELPERS
    ===================================================== */

    function getUserName() {
        const user = getUser();

        if (!user) {
            return "Guest";
        }

        return (
            user.name ||
            user.fullName ||
            user.username ||
            "RoomNest User"
        );
    }


    function getUserEmail() {
        const user = getUser();

        return user && user.email
            ? user.email
            : "";
    }


    function getUserInitials(name = null) {
        const userName =
            name ||
            getUserName();

        if (!userName || userName === "Guest") {
            return "G";
        }

        const parts = userName
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        if (parts.length === 1) {
            return parts[0]
                .substring(0, 2)
                .toUpperCase();
        }

        return (
            parts[0][0] +
            parts[parts.length - 1][0]
        ).toUpperCase();
    }


    /* =====================================================
       16. CURRENT USER DATA
    ===================================================== */

    function updateUser(updates = {}) {
        const currentUser = getUser();

        if (!currentUser) {
            return false;
        }

        if (
            !updates ||
            typeof updates !== "object"
        ) {
            return false;
        }

        /*
           Prevent password from entering shared auth.
        */

        const safeUpdates = {
            ...updates
        };

        delete safeUpdates.password;
        delete safeUpdates.confirmPassword;

        const updatedUser = {
            ...currentUser,
            ...safeUpdates
        };

        return setUser(updatedUser);
    }


    /* =====================================================
       17. STORAGE EVENT
    ===================================================== */

    window.addEventListener(
        "storage",
        function (event) {
            if (
                event.key === STORAGE_KEYS.USER ||
                event.key === STORAGE_KEYS.AUTH_TOKEN ||
                event.key === STORAGE_KEYS.ADMIN_TOKEN
            ) {
                dispatchAuthChange();
            }
        }
    );


    /* =====================================================
       18. AUTO INIT
    ===================================================== */

    function init() {
        /*
           Makes current authentication state available
           immediately after auth.js loads.
        */

        dispatchAuthChange();
    }


    /* =====================================================
       19. PUBLIC API
    ===================================================== */

    window.RoomNestAuth = {

        /* User */
        getUser,
        setUser,
        updateUser,
        clearUser,

        /* Token */
        getToken,
        setToken,
        clearToken,

        /* Authentication */
        login,
        logout,
        isLoggedIn,

        /* Roles */
        getRole,
        hasRole,
        hasAnyRole,
        isStudent,
        isOwner,
        isAdmin,

        /* Routes */
        getDashboardPath,
        getProfilePath,
        getLoginPath,

        /* Redirect */
        redirectToDashboard,
        redirectToLogin,

        /* Protection */
        requireAuth,
        requireRole,

        /* Return URL */
        getCurrentUrl,
        saveReturnUrl,
        getReturnUrl,
        clearReturnUrl,
        redirectToReturnUrl,

        /* User info */
        getUserName,
        getUserEmail,
        getUserInitials,

        /* Init */
        init
    };


    /* =====================================================
       20. START
    ===================================================== */

    init();


})();