// js/auth.js
// depends on js/config.js (load config.js before auth.js)

function buildLoginUrl() {
  const cfg = window._config.cognito;
  // Using implicit flow to return token in fragment (#)
  const url = `${cfg.domain}/login?client_id=${cfg.userPoolClientId}` +
              `&response_type=token&scope=openid+email+profile&redirect_uri=${encodeURIComponent(cfg.redirectUri)}`;
  return url;
}

function redirectToLogin() {
  window.location.href = buildLoginUrl();
}

function logout() {
  const cfg = window._config.cognito;
  // clear session storage/local storage
  sessionStorage.removeItem("id_token");
  sessionStorage.removeItem("access_token");
  // redirect to Cognito logout to clear session there too
  const logoutUrl = `${cfg.domain}/logout?client_id=${cfg.userPoolClientId}&logout_uri=${encodeURIComponent(cfg.logoutUri)}`;
  window.location.href = logoutUrl;
}

// decode JWT payload
function decodeJwt(token) {
  try {
    const parts = token.split('.');
    const payload = parts[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch (e) {
    return null;
  }
}

export { redirectToLogin, logout, decodeJwt };
