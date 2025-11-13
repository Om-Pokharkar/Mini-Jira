const API_URL = window._config.api.invokeUrl;

export async function createBug(data) {
    return fetch(`${API_URL}/createBug`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

export async function assignBug(data) {
    return fetch(`${API_URL}/assignBug`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

export async function closeBug(data) {
    return fetch(`${API_URL}/closeBug`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => res.json());
}
