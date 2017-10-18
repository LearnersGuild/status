require('dotenv').load();
const request = require('request-promise');

const apiUrl = process.env.CODESHIP_API_URL;
const username = process.env.CODESHIP_USERNAME;
const password = process.env.CODESHIP_PASSWORD;
let authorization;

async function postAuth() {
  if (accessTokenExpired()) {
    authorization = await request({
      uri: apiUrl + '/auth',
      method: 'POST',
      auth: {
        user: username,
        pass: password,
      },
      json: true,
      headers: {'Content-Type': 'application/json'},
    });
  }
  return authorization;
}

function listProjects(organizationId) {
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

function listBuilds(organizationId, projectId) {
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
  postAuth,
  listProjects,
  listBuilds,
};
