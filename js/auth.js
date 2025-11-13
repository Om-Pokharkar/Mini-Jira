// auth.js

function logout() {
    const cfg = window._config.cognito;
    const logoutUrl =
        `https://${cfg.domain}/logout?client_id=${cfg.userPoolClientId}&logout_uri=${cfg.logoutUri}`;
    sessionStorage.clear();
    window.location.href = logoutUrl;
}

// Extract token from URL after first login
function extractToken() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const id_token = params.get("id_token");

    if (id_token) {
        sessionStorage.setItem("id_token", id_token);
        window.location.hash = ""; // clean URL
    }
}

// Decode JWT
function decodeToken(token) {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
}

// Get logged-in user's email
function getUserEmail() {
    const token = sessionStorage.getItem("id_token");
    if (!token) return null;
    const decoded = decodeToken(token);
    return decoded.email;
}

// Run on every page load:
extractToken();
