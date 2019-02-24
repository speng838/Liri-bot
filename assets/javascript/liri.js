
require('dotenv').config();
var axios = require("axios");
var fs = require("fs");
const moment = require('moment');
var Spotify = require("node-spotify-api");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);


var question = process.argv[2];
var variable = process.argv[3];
choices();

function choices(){

if (question == "concert-this"){
    question1();
}
else if(question == "spotify-this-song"){
    question2();
}
else if(question == "movie-this"){
    question3();
}
else if(question == "do-what-it-says"){
    question4();
}
else{
    console.log("Sorry, not a command. Please try again");
}
}

function question1(){
    
    queryURL = "https://rest.bandsintown.com/artists/" + variable + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(function(response){
        for(var i=0; i<response.data.length; i++){
        console.log("Venue name: " + response.data[i].venue.name);
        console.log("Venue location: " + response.data[i].venue.country);
        console.log("Date: " + moment(response.data[i].datetime, "YYYY-MM-DD T HH:mm:ss").format("MM/DD/YYYY"));
        }
    });

}

function question2(){
    
//https://www.npmjs.com/package/node-spotify-api

    spotify.search({ type: 'track', query: variable }, function(error, data) {
        if (error) {
          return console.log('Error occurred: ' + error);
        }
        for(var i = 0; i<data.tracks.items.length; i++){
            for(var j=0; j<data.tracks.items[i].album.artists.length; j++){
            console.log("Name of artist: " + data.tracks.items[i].album.artists[j].name);
            console.log("Preview of song: " + data.tracks.items[i].album.artists[j].external_urls.spotify);
            
            if(  data.tracks.items[i].album.artists[j].external_urls.spotify == ""){
                
                spotify.search({ type: 'track', query: "The Sign Ace of Base" }, function(error, data) {
                    if (error) {
                      return console.log('Error occurred: ' + error);
                    }
                    for(var i = 0; i<data.tracks.items.length; i++){
                        for(var j=0; j<data.tracks.items[i].album.artists.length; j++){
                            console.log("Preview of song: " + data.tracks.items[i].album.artists[j].external_urls.spotify);
                        }
                    }
                });
            }
            console.log("Name of album: " + data.tracks.items[i].album.name);
            console.log("Name of song: " + data.tracks.items[i].name);
            console.log(" ");
            }
        }     
        
    }); 
}

var queryURL;
function question3(){
    queryURL = "http://www.omdbapi.com/?t=" + variable + "&y=&plot=short&apikey=trilogy";
   
   if(variable == " " || variable == null ){
    queryURL = "http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy";
   };

    axios.get(queryURL).then(function(response){
        console.log("Title of the movie: " + response.data.Title);
        console.log("Year of the movie: " + response.data.Year);
        console.log("IMDB rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);

    });

}

function question4(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error){
            return console.log(error);
        }

        var output = data.split(",");

        question = output[0];
        variable = output[1];

        choices();

    });
}