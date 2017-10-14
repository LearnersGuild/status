const express = require('express');

require('dotenv').load();

const app = express();
const request = require('request-promise');
const getAuth = require('./auth');
const { removeDuplicateProjects } = require('./utilities');

app.use(express.static('public'));

app.set('view engine', 'ejs');

function renderProjects(res) {

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

  getAuth()
    .then((user) => {
      const options = {
        method: 'GET',
        url: `https://api.codeship.com/v2/organizations/${user.organizations[0].uuid}/projects`,
        headers: { authorization: `${user.access_token}` },
        body: '{}',
        timeout: 1000,
      };

      const getProjects = (() => request(options).then(json => JSON.parse(json)));

      getProjects()
        .then((projects) => {
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
          const uniqueProjects = removeDuplicateProjects(projects.projects);
          console.log( '---===uniqueProjects===---', uniqueProjects )
          return res.render('index', { projects: uniqueProjects });
        });
    });
}

app.get('/', (req, res) => {
  renderProjects(res);
});

const port = process.env.PORT || 3900;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});
