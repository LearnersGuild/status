const express = require('express');
const projects = require('./server/routes/auth');

const app = express();
const path = require('path');

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', projects.list);

const port = process.env.PORT || 3900;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});
