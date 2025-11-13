// js/roles.js
// requires token-parser and config
function getIdToken() {
  return sessionStorage.getItem('id_token');
}

function getUserInfo() {
  const token = getIdToken();
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload;
}

function getUserGroups() {
  const info = getUserInfo();
  return (info && info['cognito:groups']) ? info['cognito:groups'] : [];
}

// returns best single role or null
function getPrimaryRole() {
  const groups = getUserGroups();
  if (!groups || groups.length === 0) return null;
  // normalize names: Tester / Developer / Manager
  const role = groups.find(g => /tester/i.test(g)) || groups.find(g => /developer/i.test(g)) || groups.find(g => /manager/i.test(g));
  return role || groups[0];
}

export { getIdToken, getUserInfo, getUserGroups, getPrimaryRole };
