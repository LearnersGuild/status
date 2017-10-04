const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
const request = require('request-promise');

const options = {
  method: 'GET',
  url: 'https://codeship.com/api/v1/projects.json',
  qs: { api_key: '504c1e208ab901352ec212dfc1f1389b' },
};

app.set('view engine', 'ejs');

const getProjects = () => {
  return request(options)
    .then(json => JSON.parse(json));
};

function removeDuplicateProjects(projectsArray) {
  let result = [];

  for (var i = 0; i < projectsArray.length; i++) {
    const alreadyInResult = deepIncludes(result, projectsArray[i])

    if (!alreadyInResult) {
      result.push(projectsArray[i])
    }
  }

  return result
}

function deepCompare(objectA, objectB) {
  return Object.values(objectA).join('') === Object.values(objectB).join('')
}

function deepIncludes(array, object) {
  for(let i = 0; i < array.length; i++) {
    if (deepCompare(array[i], object)) {
      return true
    }
  }
  return false
}

const array = [
  {
    id: 1,
    name: 'howdy doody'
  },
  {
    id: 1,
    name: 'howdy doody'
  },
  {
    id: 1,
    name: 'howdy doody'
  },
  {
    id: 2,
    name: 'dowdy doody'
  },
  {
    id: 2,
    name: 'dowdy doody'
  },
  {
    id: 2,
    name: 'dowdy doody'
  },
];

app.get('/', (req, res) => {
  getProjects().then((projects) => {
    const uniqueProjects = removeDuplicateProjects(projects.projects);
    res.render('index', { projects: uniqueProjects });
  });
});

const port = process.env.PORT || 3900;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});
