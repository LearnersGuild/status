const express = require('express');
const router = require('./server/routes');

const app = express();
const path = require('path');

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

console.log( '<3333333 here in app <3333333' )
app.use(router);
console.log( '<3333333 here in app 2 <3333333' )

const port = process.env.PORT || 3900;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`);
});
