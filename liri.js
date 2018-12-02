require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var art = process.argv[3];
var command = process.argv[2];

/* command line:   node liri.js concert-this <artist/band name here>*/
function concert() {
  var artistUrl = "https://rest.bandsintown.com/artists/" + art + "/events?app_id=codingbootcamp";
  axios.get(artistUrl).then(
    function (response) {
      console.log(" ********************************************************************");
      console.log("   Name of the venue: " + JSON.stringify(response.data[0].venue.name));
      console.log("");
      console.log("   Venue location: " + JSON.stringify(response.data[0].venue.city) + ", " + JSON.stringify(response.data[0].venue.region) + ", " + JSON.stringify(response.data[0].venue.country));
      console.log("");
      var concertDate = response.data[0].datetime;
      console.log("   Date of the Event in MM/DD/YYYY format: " + moment(concertDate).format('L'));
      console.log(" ********************************************************************");
    }
  );
}


/* command line:   node liri.js spotify-this-song '<song name here>*/
function spotifying() {
  var spotify = new Spotify(keys.spotify);
  spotify
    .search({ type: "track", query: art, limit: 1 })
    .then(function (result) {
      console.log(" ********************************************************************");
      console.log("   Artist: " + result.tracks.items[0].artists[0].name);
      console.log("");
      console.log("   The song's name: " + JSON.stringify(result.tracks.items[0].name));
      console.log("");
      console.log("   A preview link of the song from Spotify: " + JSON.stringify(result.tracks.items[0].artists[0].external_urls.spotify));
      console.log("");
      console.log("   The album that the song is from: " + JSON.stringify(result.tracks.items[0].album.name));
      console.log(" ********************************************************************");
    })
    .catch(function (err) {
      console.log(err);
    });
}

/* command line:   node liri.js movie-this '<movie name here>*/
function movie() {
  var movieUrl = "http://www.omdbapi.com/?t=" + art + "&y=&plot=short&apikey=trilogy";
  axios.get(movieUrl).then(
    function (response) {
      console.log(" ********************************************************************");
      console.log("   Title of the movie: " + JSON.stringify(response.data.Title));
      console.log("");
      console.log("   Year the movie came out: " + JSON.stringify(response.data.Released));
      console.log("");
      console.log("   IMDB Rating of the movie: " + response.data.imdbRating);
      console.log("");
      console.log("   Rotten Tomatoes Rating of the movie: " + JSON.stringify(response.data.Ratings[1].Value));
      console.log("");
      console.log("   Country where the movie was produced: " + JSON.stringify(response.data.Country));
      console.log("");
      console.log("   Language of the movie: " + JSON.stringify(response.data.Language));
      console.log("");
      console.log("   Plot of the movie: " + JSON.stringify(response.data.Plot));
      console.log("");
      console.log("   Actors in the movie: " + JSON.stringify(response.data.Actors));
      console.log(" ********************************************************************");
    }
  );
}


/* command line:   node liri.js do-what-it-says*/

if (command === "concert-this") {
  concert();
} else if (command === "spotify-this-song") {
  spotifying();
} else if (command === "movie-this") {
  movie();
} else if (command === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    if (art === dataArr[0]) {
      art = dataArr[1];
      spotifying();
    }else if(art === dataArr[2]){
      art = dataArr[3];
      movie();
    }else if(art === dataArr[4]){
      art = dataArr[5]
      concert();
    }
  });
}