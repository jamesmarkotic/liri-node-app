var fs = require('fs');
var request = require('request');
var command = process.argv[2];
var userInput = process.argv.splice(3);

// console.log(userInput);

// Spotify function

function spotifyGo () {
  var secretSpot = require('./spot.js');
  var Spotify = require('node-spotify-api');
  var sptKeys = secretSpot.spotKeys;

  var spotify = new Spotify({
    id: secretSpot.id,
    secret: secretSpot.secret
  });

  spotify
    .search({ type: 'track', query: userInput, limit: 1 })
    .then(function(derp) {
      console.log('----------------------------------');
      console.log('Artist: ' + derp.tracks.items[0].artists[0].name);
      console.log('Song name: ' + derp.tracks.items[0].name);
      console.log('Preview URL: ' + derp.tracks.items[0].preview_url);
      console.log('Album name: ' + derp.tracks.items[0].album.name);
      console.log('----------------------------------');
    })
    .catch(function(err) {
      spotify
        .search({ type: 'track', query: 'ace of base', limit: 1 })
        .then(function(derp) {
          console.log('----------------------------------');
          console.log('Artist: ' + derp.tracks.items[0].artists[0].name);
          console.log('Song name: ' + derp.tracks.items[0].name);
          console.log('Preview URL: ' + derp.tracks.items[0].preview_url);
          console.log('Album name: ' + derp.tracks.items[0].album.name);
          console.log('----------------------------------');
        })
      });
  }
// spotifyGo();



// Twitter function

function twitterGo () {
  var Twitter = require('twitter');
  var keys = require('./keys.js');

  var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
  });

  var params = {screen_name: 'jdmarkotic'};
  client.get('statuses/user_timeline', params, function(error, tweets, derp) {
    if (!error) {
      for (i = 0; i < tweets.length; i ++) {
        console.log('--------------------------');
        console.log(tweets[i].text);
        console.log("Tweet created at: " + tweets[i].created_at);
        console.log('--------------------------');
      }
    }
  });
}
// twitterGo();

// OMBD function

function omdbGo () {
  var queryURL = "https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&limit=1&apikey=6e9360ad"

  request(queryURL, function(error, response, body) {

    // If the request was successful...
    if (!error && response.statusCode === 200) {
      var json = JSON.parse(body);
      // Then log the body from the site!
      // console.log(json);
      console.log('------------------');
      console.log('Movie title: ' + json.Title);
      console.log('Movie year: ' + json.Year);
      console.log('IMDB rating: ' + json.imdbRating);
      console.log('Rotten Tomatoes rating: ' + json.Ratings[1].Value);
      console.log('Countries released: ' + json.Country);
      console.log('Languages: ' + json.Language);
      console.log('Plot: ' + json.Plot);
      console.log('Actors: ' + json.Actors);
      console.log('------------------');
    }

    // Was trying to find a crafty way of using the error to display My Nobody
    if (error) {
      console.log('------------------');
      console.log('Movie title: ' + 'Mr. Nobody');
      console.log('Movie year: ' + '2009');
      console.log('IMDB rating: ' + '7.9');
      console.log('Rotten Tomatoes rating: ' + '66%');
      console.log('Countries released: ' + 'Belgium, Germany, Canada, France, USA, UK');
      console.log('Languages: ' + 'English, Mohawk');
      console.log('Plot: ' + 'A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn\'t choose, anything is possible.');
      console.log('Actors: ' + 'Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham');
      console.log('------------------');
    }
  });
}
// omdbGo();

// Do what it says function

function turnDownForWhat () {
  fs.readFile("random.txt", "utf8", function(error, data) {

    // console.log(fs.readFile);
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      // return console.log(error);
    }

    // Then split it by commas (to make it more readable)
    var turnDown = data.split(",");
    var forWhat = turnDown[1];
    function spotifyGoHack (forWhat) {
      console.log(forWhat);

      var secretSpot = require('./spot.js');
      var Spotify = require('node-spotify-api');
      var sptKeys = secretSpot.spotKeys;

      var spotify = new Spotify({
        id: secretSpot.id,
        secret: secretSpot.secret
      });

      spotify
        .search({ type: 'track', query: forWhat, limit: 1 })
        .then(function(derp) {
          console.log('----------------------------------');
          console.log('Artist: ' + derp.tracks.items[0].artists[0].name);
          console.log('Song name: ' + derp.tracks.items[0].name);
          console.log('Preview URL: ' + derp.tracks.items[0].preview_url);
          console.log('Album name: ' + derp.tracks.items[0].album.name);
          console.log('----------------------------------');
        })
        .catch(function(err) {
          console.log(err);

        });
    };
    spotifyGoHack(forWhat);
  });
}
// turnDownForWhat();

if (command === 'my-tweets') {
  twitterGo();
}
else if (command === 'spotify-this-song') {
  spotifyGo();
}
else if (command === 'movie-this') {
  omdbGo();
}
else if (command === 'do-what-it-says') {
  turnDownForWhat();
}
