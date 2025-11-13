function redirectToCognito() {
  const domain = window._config.cognito.domain;
  const clientId = window._config.cognito.userPoolClientId;
  const redirect = window._config.redirect.callback;

  const loginUrl =
    `https://${domain}/login?` +
    `client_id=${clientId}` +
    `&response_type=token` +
    `&scope=email+openid+aws.cognito.signin.user.admin` +
    `&redirect_uri=${encodeURIComponent(redirect)}`;

  console.log("Redirecting to:", loginUrl);
  window.location.href = loginUrl;
}

function redirectToSignup() {
  const domain = window._config.cognito.domain;
  const clientId = window._config.cognito.userPoolClientId;
  const redirect = window._config.redirect.callback;

  const registerUrl =
    `https://${domain}/signup?` +
    `client_id=${clientId}` +
    `&response_type=token` +
    `&scope=email+openid+aws.cognito.signin.user.admin` +
    `&redirect_uri=${encodeURIComponent(redirect)}`;

  console.log("Redirecting to:", registerUrl);
  window.location.href = registerUrl;
}
