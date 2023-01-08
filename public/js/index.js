function parseQuery(queryString) {
  var query = {};
  var pairs = (
    queryString[0] === '?' ? queryString.substr(1) : queryString
  ).split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

const OIDC_KEY = 'oidc:elykp';

window.addEventListener('DOMContentLoaded', function () {
  const search = window.location.search;
  if (search) {
    const {
      id_token,
      refresh_token,
      user_id,
      return_url = '/',
    } = parseQuery(search);
    this.sessionStorage.setItem(
      OIDC_KEY,
      JSON.stringify({
        id_token,
        refresh_token,
        user_id,
      }),
    );
    this.location = return_url;
  } else {
    this.location = '/';
  }
});
