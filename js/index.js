import { login, getTokenFromUrl } from "./auth.js";
import { getUserRole } from "./roles.js";

window.onload = function () {

    // 1. Check if token exists in URL (first login)
    let token = getTokenFromUrl();
    if (token) {
        sessionStorage.setItem("id_token", token);
        window.location.hash = ""; // clean URL
    }

    // 2. Check if user already logged in
    token = sessionStorage.getItem("id_token");

    if (!token) {
        // not logged in
        document.getElementById("loginBtn").onclick = login;
        return;
    }

    // 3. Logged in → find role and redirect
    const role = getUserRole();

    if (role === "Tester") window.location.href = "dashboard-tester.html";
    if (role === "Manager") window.location.href = "dashboard-manager.html";
    if (role === "Developer") window.location.href = "dashboard-developer.html";
}
