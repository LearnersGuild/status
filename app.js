const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
const request = require('request');

const options = {
  method: 'GET',
  url: 'https://codeship.com/api/v1/projects/249173.json',
  qs: { api_key: '504c1e208ab901352ec212dfc1f1389b' },
  body: '{}',
};

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    const currentProject = JSON.parse(body);
    res.render('index', { project: currentProject.builds[0], color: currentProject.builds[0].status });
  });
});


const port = process.env.PORT || 3900;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});
