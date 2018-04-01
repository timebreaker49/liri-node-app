//reads the environment variables within the dotenv pacakge
require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var Request = require("request");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

var sn = {screen_name: 'whutturfacts'};

var arg = process.argv[2];

switch(arg) {
    case('my-tweets'):
    twitter.get("statuses/user_timeline", sn, function(error, tweets, response) {
       for (var i = 0; i < 20; i++) {
       console.log("When he dropped knowledge: " + JSON.stringify(tweets[i].created_at, null, 2)); //tweet "created_at" property
       console.log("The wisdom imparted upon us: " + JSON.stringify(tweets[i].text, null, 2)); //tweet "text" property
       }
//I don't have 20 tweets yet, so undefined is returned after data retrievable is exhausted
    });
        break;
    case('spotify-this-song'):

        break;
    case('movie-this'):

        break;
    case('do-what-it-says'):

        break;
}



//spotify.search({ type: 'track', query: 'frozen', limit: 1 }, function(err, data) {
//  if (err) {
//    return console.log('Error occurred: ' + err);
//  }
//
//console.log(JSON.stringify(data.tracks.items.uri, null, 2));
//console.log(JSON.stringify(data.tracks.items.album, null, 2));
//})

