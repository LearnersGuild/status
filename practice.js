const request =  require('request-promise')

var requestLoop = setInterval(function(){
  request({
      url: "http://www.google.com",
      method: "GET",
      timeout: 100,
      followRedirect: true,
      maxRedirects: 10
  },function(error, response, body){
      if(!error && response.statusCode == 200){
          console.log('success!');
      }else{
          console.log('error' + response.statusCode);
      }
  });
}, 600);