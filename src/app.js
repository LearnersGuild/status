const express = require('express');

require('dotenv').load();

const app = express();
const request = require('request-promise');
const path = require('path');
// const getAuth = require('./server/routes/auth');

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

async function renderProjects(res) {
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
  const getAuth = (() => request(authOptions));

  const user = JSON.parse(await getAuth());
  const projectFromOrganizationOptions = {
    method: 'GET',
    url: `https://api.codeship.com/v2/organizations/${user.organizations[0].uuid}/projects/`,
    headers: { authorization: `${user.access_token}` },
    body: '{}',
    timeout: 1000,
  };

  const getProjects = (() => request(projectFromOrganizationOptions));

  let projectsJSON = JSON.parse(await getProjects()).projects;
  projectsJSON = await Promise.all(projectsJSON.map(async (project) => {
    project.builds = (await listBuilds(user.organizations[0].uuid, project.uuid, user)).builds
    return project;
  }));
  console.log( '---===projectsJSON===---', projectsJSON )
  console.log( '---===projectsJSON.builds===---', projectsJSON[0].builds )
  res.render('index', { projects: projectsJSON })
}

function listBuilds(organizationID, projectID, user) {
  const buildOptions = {
    uri: 'https://api.codeship.com/v2/organizations/' + organizationID + '/projects/' + projectID + '/builds',
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${user.access_token}`,
    },
  };
  return request(buildOptions);
}

app.get('/', (req, res) => {
  renderProjects(res);
});

const port = process.env.PORT || 3900;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});
