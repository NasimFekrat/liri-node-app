require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

var art = process.argv[3];
var command = process.argv[2];

/* command line:   node liri.js concert-this <artist/band name here>*/
var artistUrl = "https://rest.bandsintown.com/artists/" + art + "/events?app_id=codingbootcamp";
axios.get(artistUrl).then(
  function (response) {
    if (command === "concert-this") {
      console.log("Name of the venue: " + JSON.stringify(response.data[0].venue.name));
      console.log("Venue location: " + JSON.stringify(response.data[0].venue.city) + ", " + JSON.stringify(response.data[0].venue.region) + ", " + JSON.stringify(response.data[0].venue.country));
      var concertDate = response.data[0].datetime;
      console.log("Date of the Event in MM/DD/YYYY format: " + moment(concertDate).format('L'));
    }
  }
);


/* command line:   node liri.js spotify-this-song '<song name here>*/
var spotify = new Spotify(keys.spotify);
spotify
  .search({ type: "track", query:art , limit:1 })
  .then(function (result) {
    if (command === "spotify-this-song") {
      console.log("Artist: " + result.tracks.items[0].artists[0].name);
      console.log("The song's name: " + art);
      console.log("A preview link of the song from Spotify: " + JSON.stringify(result.tracks.items[0].artists[0].external_urls.spotify));
      console.log("The album that the song is from: " + JSON.stringify(result.tracks.items[0].album.name));
    }
  })
  .catch(function (err) {
    console.log(err);
  });

  /* command line:   node liri.js movie-this '<movie name here>*/