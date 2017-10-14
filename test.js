// curl --request POST \
//   --url 'https://codeship.com/api/v2/auth' \
//   --header 'content-type: text/plain' \
//   --data '{}'
//   
//   
//   curl --request POST   --url api.codeship.com/v2/auth --header ‘authorization: Basic ampqajpwcHBw’   --header ‘content-type: application/json’   --data ‘{“username”:“lallala”, “password” : “ksdjfkaj”}’
//   
//   `curl --request POST   --url https://api.codeship.com/v2/auth   --header 'authorization: Basic'   --header 'content-type: application/json'   --data '{"username":"miketheklein@gmail.com", "password" : "Ilawhdy66"}'`
//   
  `curl --request POST   --url https://api.codeship.com/v2/auth --header 'content-type: application/json'   --data '{}' --user miketheklein@gmail.com:Ilawhdy66`

var request = require("request");
var options = { method: 'POST',
url: 'https://api.codeship.com/v2/auth',
headers: 
{ authorization: 'Basic bWlrZXRoZWtsZWluQGdtYWlsLmNvbTpJbGF3aGR5NjY=',
'content-type': 'application/json' },
body: '{}' };

function getAuth(){
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  })
};

module.exports = getAuth