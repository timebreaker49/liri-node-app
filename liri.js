//reads the environment letiables within the dotenv pacakge
console.log('okay this is the right file');
require("dotenv").config();

let Twitter = require("twitter");
let Spotify = require("node-spotify-api");
let Request = require("request-promise");
let omdbApi = require("omdb-api-pt");
let keys = require("./keys.js");
let fs = require("fs-extra");

let spotify = new Spotify(keys.spotify);
let twitter = new Twitter(keys.twitter);
let omdb = new omdbApi({
    apiKey: process.env.OMDB_KEY,
    baseUrl: "http://www.omdbapi.com/" //+ input + "&r=json&plot=short&apikey=" + apikey,
})

let sn = {
    screen_name: 'whutturfacts'
};
let userSearchArray = [];

let arg = process.argv[2];
let userSearch = function () {
    for (let i = 3; i < process.argv.length; i++) {
        userSearchArray.push(process.argv[i]);
    }
    let title = userSearchArray.join(' ');
    return title;
}

let searchTerm = userSearch();

let command = function () {
    switch (arg) {
        case ('my-tweets'):
            twitter.get("statuses/user_timeline", sn, function (error, tweets, response) {
                for (let i = 0; i < 20; i++) {
                    console.log("When he dropped knowledge: " + JSON.stringify(tweets[i].created_at, null, 2)); //tweet "created_at" property
                    console.log("The wisdom imparted upon us: " + JSON.stringify(tweets[i].text, null, 2)); //tweet "text" property
                }
                //I don't have 20 tweets yet, so undefined is returned after data retrievable is exhausted
            });

            break;

        case ('spotify-this-song'):

            let spotifyLookup = function () {
                spotify.search({
                    type: 'track',
                    query: searchTerm,
                    limit: 1
                }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }
                    //maybe consider using backticks to format the console.log statement
                    for (let i = 0; i < 1; i++) {
                        console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
                        console.log("Name of the song: " + JSON.stringify(data.tracks.items[0].name, null, 2));
                        console.log("Preview URL: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
                        console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));

                    }
                });
            }();

            break;

        case ('movie-this'):
            // promise request for OMDB search 

            if (!searchTerm) {
                searchTerm = "Mr. Nobody"
            }
            let searchOMDB = omdb.byId({
                    title: searchTerm
                }).then(res => console.log(res))
                .catch(err => console.error(err));

            break;

        case ('do-what-it-says'):
            fs.readFile('random.txt', 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                let splitter = data.split(',');
                let arg = splitter[0];
                let fileSearchTerm = splitter[1];

                //command();                              
                //if the above does not work -- the nuclear option available below :(
                if (arg === "spotify-this-song") {
                    spotify.search({
                        type: 'track',
                        query: fileSearchTerm,
                        limit: 1
                    }, function (err, data) {
                        if (err) {
                            return console.log('Error occurred: ' + err);
                        }
                        //maybe consider using backticks to format the console.log statement
                        for (let i = 0; i < 1; i++) {
                            console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
                            console.log("Name of the song: " + JSON.stringify(data.tracks.items[0].name, null, 2));
                            console.log("Preview URL: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
                            console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));

                        }
                    });
                } else {
                    let searchOMDB = omdb.byId({
                            title: searchTerm
                        }).then(res => console.log(res))
                        .catch(err => console.error(err));
                }
            })

            break;
    }
}
command();