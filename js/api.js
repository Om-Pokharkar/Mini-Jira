// js/api.js
const API_BASE = window._config.api.invokeUrl;

async function apiPost(path, body) {
  const token = sessionStorage.getItem('id_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = token; // or 'Bearer ' + token depending on your API authorizer
  const resp = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });
  return resp.json();
}

async function apiGet(path) {
  const token = sessionStorage.getItem('id_token');
  const headers = {};
  if (token) headers['Authorization'] = token;
  const resp = await fetch(`${API_BASE}${path}`, { headers });
  return resp.json();
}

export { apiPost, apiGet };
