const request = require('request');

const authOptions = {
  method: 'POST',
  url: 'https://api.codeship.com/v2/auth',
  headers:
  {
    authorization: 'Basic bWlrZXRoZWtsZWluQGdtYWlsLmNvbTpJbGF3aGR5NjY=',
    'content-type': 'application/json',
  },
  body: '{}',
};

const getAuth = (() => request(authOptions).then(body => JSON.parse(body)));

module.exports = getAuth;
