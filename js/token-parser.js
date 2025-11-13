// js/token-parser.js
// Run this on your index (and other) pages to capture tokens after login.

(function parseAndStoreTokens() {
  const hash = window.location.hash.substring(1); // remove '#'
  if (!hash) return;

  const params = new URLSearchParams(hash);
  const idToken = params.get('id_token');
  const accessToken = params.get('access_token');

  if (idToken) {
    // store for the session (sessionStorage so it's cleared on tab close)
    sessionStorage.setItem('id_token', idToken);
    if (accessToken) sessionStorage.setItem('access_token', accessToken);
    // remove hash from URL for cleanliness
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
})();
