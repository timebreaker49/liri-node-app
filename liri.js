//reads the environment variables within the dotenv pacakge
console.log('okay this is the right file');
require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var Request = require("request-promise");
var omdbApi = require("omdb-api-pt");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);
var omdb = new omdbApi({
    apiKey: process.env.OMDB_KEY,
    baseUrl : "http://www.omdbapi.com/" //+ input + "&r=json&plot=short&apikey=" + apikey,
})

var sn = {screen_name: 'whutturfacts'};
var userSearchArray = [];

var arg = process.argv[2];
var userSearch = function() {
        for (let i = 3; i < process.argv.length; i++) {
            userSearchArray.push(process.argv[i]);
        } 
        var title = userSearchArray.join(' ');
        return title;
}
var searchTerm = userSearch();
console.log(searchTerm);

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
    spotify.search({ type: 'track', query: 'alright', limit: 1 }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }

          for (var i = 0; i < 1; i++) {
          console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
          console.log("Name of the song: " + JSON.stringify(data.tracks.items[0].name, null, 2));
          console.log("Preview URL: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
          console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
       
        }
    });
        break;

    case('movie-this'):
        // promise request for OMDB search 
            var searchOMDB = omdb.byId({
                title: searchTerm
            }).then(res => console.log(res))
            .catch(err => console.error(err));

        break;
    case('do-what-it-says'):

        break;
}
