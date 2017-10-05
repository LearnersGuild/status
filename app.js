const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
const request = require('request-promise');

app.use(express.static('public'));

app.set('view engine', 'ejs');
const options = {
  method: 'GET',
  url: 'https://codeship.com/api/v1/projects.json',
  qs: { api_key: '504c1e208ab901352ec212dfc1f1389b' },
  timeout: 1000,
};

const getProjects = (() => {
  return request(options)
    .then(json => JSON.parse(json));
});

function deepCompare(objectA, objectB) {
  return Object.values(objectA).join('') === Object.values(objectB).join('')
}

function deepIncludes(array, object) {
  for (let i = 0; i < array.length; i++) {
    if (deepCompare(array[i], object)) {
      return true;
    }
  }
  return false;
}

function removeDuplicateProjects(projectsArray) {
  const result = [];
  for (let i = 0; i < projectsArray.length; i += 1) {
    const alreadyInResult = deepIncludes(result, projectsArray[i])
    if (!alreadyInResult && projectsArray[i].repository_name !== null) {
      result.push(projectsArray[i]);
    }
  }
  return result;
}
function renderProjects(res) {
  getProjects()
    .then((projects) => {
      const uniqueProjects = removeDuplicateProjects(projects.projects);
      res.render('index', { projects: uniqueProjects });
    });
}
app.get('/', (req, res) => {
  renderProjects(res);
  setInterval(() => {
    renderProjects(res);
  }, 9000);
});

const port = process.env.PORT || 3900;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});
