import "./config.js";

export function login() {
    const cfg = window._config.cognito;

    const url =
        `https://${cfg.domain}/oauth2/authorize?response_type=token&client_id=${cfg.userPoolClientId}&redirect_uri=${cfg.redirectUri}&scope=email+openid+profile`;

    window.location.href = url;
}

export function logout() {
    const cfg = window._config.cognito;

    const url =
        `https://${cfg.domain}/logout?client_id=${cfg.userPoolClientId}&logout_uri=${cfg.logoutUri}`;

    window.location.href = url;
}

export function getTokenFromUrl() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get("id_token");
}

export function decodeJwt(token) {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
}
