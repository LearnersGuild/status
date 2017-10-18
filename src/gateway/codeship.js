const request = require('request-promise');

const { codeship } = require('../config');

let authorization;
console.log( '---===config===---', codeship.apiUrl )
async function authenticate() {
  if (accessTokenExpired()) {
    authorization = await request({
      uri: codeship.apiUrl + '/auth',
      method: 'POST',
      auth: {
        user: codeship.username,
        pass: codeship.password,
      },
      json: true,
      headers: {'Content-Type': 'application/json'},
    });
  }
  return authorization;
}

function getProjects(organizationId) {
  return request({
    uri: apiUrl + '/organizations/' + organizationId + '/projects',
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authorization.access_token,
    },
  });
}

function getBuilds(organizationId, projectId) {
  return request({
    uri: apiUrl + '/organizations/' + organizationId + '/projects/' + projectId + '/builds',
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authorization.access_token,
    },
  });
}

function accessTokenExpired() {
  const now = Math.round((new Date()).getTime() / 1000);
  if (authorization && authorization.access_token && authorization.expires_at) {
    return authorization.expires_at <= now;
  }
  return true;
}

module.exports = {
  authenticate,
  getProjects,
  getBuilds,
};
