var fs = require('fs');
var request = require('request');
// var twitter = require('twitter');
// var spotify = require('spotify');
// var keys = require('./keys.js').twitterKeys;

// var client = new Twitter({
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });
//
// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });








fs.readFile("random.txt", "utf8", function(error, data) {

  console.log(fs.readFile);
  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log(dataArr);

});
