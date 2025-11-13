import { decodeJwt } from "./auth.js";

export function getUserRole() {
    const token = sessionStorage.getItem("id_token");
    if (!token) return null;

    const decoded = decodeJwt(token);

    const groups = decoded["cognito:groups"];
    if (!groups) return null;

    return groups[0]; // Tester / Developer / Manager
}
